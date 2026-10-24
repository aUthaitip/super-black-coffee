
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSanityProducts } from "@/lib/sanity-products";

const isText = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

const optionalText = (v: unknown): string | null =>
  isText(v) ? v.trim() : null;

const toNumber = (v: unknown): number =>
  v === null || v === undefined || v === ""
    ? NaN
    : Number(v);

function apiError(error: unknown, action: string) {
  console.error(`[ORDER_${action}_ERROR]`, error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const status =
      error.code === "P2002" ? 409 :
      error.code === "P2003" ? 400 :
      error.code === "P2025" ? 404 : 500;

    return NextResponse.json(
      {
        error: `Database error: ${error.code}`,
        ...(process.env.NODE_ENV === "development"
          ? { details: error.meta }
          : {}),
      },
      { status }
    );
  }

  return NextResponse.json(
    {
      error: `ไม่สามารถ${action}คำสั่งซื้อได้`,
      ...(process.env.NODE_ENV === "development"
        ? {
            details:
              error instanceof Error ? error.message : String(error),
          }
        : {}),
    },
    { status: 500 }
  );
}

// ========================================
// GET: ดึงคำสั่งซื้อ
// ========================================
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json(
      orders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber,
        branchId: o.branchId || "",
        branchCode: o.branchCode,
        branchName: o.branchName,
        contactName: o.contactName,
        phone: o.phone,
        shippingAddress: o.shippingAddress,
        subtotal: o.subtotal,
        tax: o.tax,
        shippingFee: o.shippingFee,
        grandTotal: o.grandTotal,
        status: o.status,
        paymentMethod: o.paymentMethod,
        paymentSlipUrl: o.paymentSlipUrl,
        paymentSlipName: o.paymentSlipName || "",
        transferTime: o.transferTime || "",
        confirmedAt: o.confirmedAt || undefined,
        confirmedBy: o.confirmedBy || undefined,
        trackingNumber: o.trackingNumber || undefined,
        deliveryCarrier: o.deliveryCarrier || undefined,
        salesNotes: o.salesNotes || undefined,
        createdAt: o.createdAt.toLocaleString("th-TH", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        items: o.items.map((item) => ({
          productId: item.productId || "",
          productName: item.productName,
          sku: item.sku,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
        })),
      }))
    );
  } catch (error) {
    return apiError(error, "GET");
  }
}

// ========================================
// POST: สร้างคำสั่งซื้อ
// ========================================
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data || !Array.isArray(data.items) || !data.items.length) {
      return NextResponse.json(
        { error: "กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ" },
        { status: 400 }
      );
    }

    // 1. ตรวจสอบสาขาใน PostgreSQL
    const requestedBranchId = optionalText(data.branchId);
    const requestedBranchCode = optionalText(data.branchCode);

    let branch = requestedBranchId
      ? await prisma.branch.findUnique({
          where: { id: requestedBranchId },
        })
      : null;

    // หาก ID เดิมไม่ตรง ให้ลองค้นหาด้วย Branch Code
    if (!branch && requestedBranchCode) {
      branch = await prisma.branch.findUnique({
        where: { branchCode: requestedBranchCode },
      });
    }

    // ไม่อนุญาตให้สร้าง Order ที่อ้างอิงสาขาที่ไม่มีจริง
    if (!branch && (requestedBranchId || requestedBranchCode)) {
      return NextResponse.json(
        {
          error: "ไม่พบสาขาในฐานข้อมูล กรุณาตรวจสอบข้อมูลสาขา",
          ...(process.env.NODE_ENV === "development"
            ? {
                debug: {
                  branchId: requestedBranchId,
                  branchCode: requestedBranchCode,
                },
              }
            : {}),
        },
        { status: 400 }
      );
    }

    // 2. ตรวจสอบสินค้าจาก SKU
    const skus = data.items.map((item: any) => item?.sku);

    if (skus.some((sku: unknown) => !isText(sku))) {
      return NextResponse.json(
        { error: "พบสินค้าที่ไม่มี SKU" },
        { status: 400 }
      );
    }

    const products = await getSanityProducts();

    const productMap = new Map(
      products.map((product) => [product.sku, product])
    );

    const orderItems = [];

    for (const item of data.items) {
      const sku = item.sku.trim();
      const product = productMap.get(sku);

      if (!product) {
        return NextResponse.json(
          {
            error: `ไม่พบสินค้า SKU: ${sku} ใน Sanity`,
          },
          { status: 400 }
        );
      }

      if (!product.isAvailable) {
        return NextResponse.json(
          {
            error: `สินค้า ${product.name} ยังไม่เปิดให้สั่งซื้อ`,
          },
          { status: 400 }
        );
      }

      const quantity = toNumber(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        return NextResponse.json(
          {
            error: `จำนวนสินค้า ${product.name} ไม่ถูกต้อง`,
          },
          { status: 400 }
        );
      }

      if (quantity < (product.minOrder ?? 1)) {
        return NextResponse.json(
          {
            error: `สินค้า ${product.name} ต้องสั่งขั้นต่ำ ${product.minOrder ?? 1} ชิ้น`,
          },
          { status: 400 }
        );
      }

      if (quantity > product.stockQuantity) {
        return NextResponse.json(
          {
            error: `สินค้า ${product.name} มีสต็อกไม่เพียงพอ`,
          },
          { status: 409 }
        );
      }

      // บันทึกชื่อและราคาจาก Sanity โดยไม่อ้างอิงสินค้าเดิมใน Prisma
      const price = product.price;

      orderItems.push({
        productId: null,
        productName: product.name,
        sku: product.sku,
        unit: product.unit,
        quantity,
        price,
        total: Math.round(price * quantity * 100) / 100,
      });
    }

    // 3. คำนวณราคาสินค้าจากข้อมูลจริง
    const subtotal =
      Math.round(
        orderItems.reduce((sum, item) => sum + item.total, 0) * 100
      ) / 100;

    // คงภาษีและค่าขนส่งจาก Request เดิมไว้
    // ต้องตรวจสอบกฎภาษี/ขนส่งฝั่ง Server ก่อนใช้ Production
    const tax = toNumber(data.tax ?? 0);
    const shippingFee = toNumber(data.shippingFee ?? 0);

    if (
      !Number.isFinite(tax) ||
      !Number.isFinite(shippingFee) ||
      tax < 0 ||
      shippingFee < 0
    ) {
      return NextResponse.json(
        { error: "ข้อมูลภาษีหรือค่าขนส่งไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const grandTotal =
      Math.round((subtotal + tax + shippingFee) * 100) / 100;

    // 4. สร้างเลขคำสั่งซื้อที่ไม่ซ้ำ
    const orderNumber = `ORD-${randomUUID()}`;

    // 5. บันทึก Order และ Items
    const created = await prisma.order.create({
      data: {
        orderNumber,

        // ใช้ ID ที่ตรวจสอบกับ Database แล้ว
        branchId: branch?.id ?? null,
        branchCode: branch?.branchCode ?? "SBC-001",
        branchName: branch?.branchName ?? "สาขาแฟรนไชส์",

        contactName: data.contactName || "",
        phone: data.phone || "",
        shippingAddress: data.shippingAddress || "",

        subtotal,
        tax,
        shippingFee,
        grandTotal,

        status: "pending_review",
        paymentMethod: data.paymentMethod || "bank_transfer",
        paymentSlipUrl: data.paymentSlipUrl || "",
        paymentSlipName: optionalText(data.paymentSlipName),
        transferTime: optionalText(data.transferTime),
        salesNotes: optionalText(data.salesNotes),

        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    console.log("[ORDER_CREATED]", {
      id: created.id,
      orderNumber: created.orderNumber,
      branchId: created.branchId,
      itemCount: created.items.length,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return apiError(error, "CREATE");
  }
}

// ========================================
// PATCH: อัปเดตคำสั่งซื้อ
// ========================================
export async function PATCH(request: Request) {
  try {
    const {
      id,
      status,
      confirmedBy,
      trackingNumber,
      deliveryCarrier,
    } = await request.json();

    if (!isText(id)) {
      return NextResponse.json(
        { error: "Missing order id" },
        { status: 400 }
      );
    }

    const nowStr = new Date().toLocaleString("th-TH");

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(confirmedBy
          ? { confirmedBy, confirmedAt: nowStr }
          : {}),
        ...(trackingNumber ? { trackingNumber } : {}),
        ...(deliveryCarrier ? { deliveryCarrier } : {}),
      },
      include: { items: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return apiError(error, "UPDATE");
  }
}
