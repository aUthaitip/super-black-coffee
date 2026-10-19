import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    const mapped = orders.map((o) => ({
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
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const orderNumber = "ORD-" + Date.now().toString().slice(-6);

    const created = await prisma.order.create({
      data: {
        orderNumber,
        branchId: data.branchId || null,
        branchCode: data.branchCode || "SBC-001",
        branchName: data.branchName || "สาขาแฟรนไชส์",
        contactName: data.contactName || "",
        phone: data.phone || "",
        shippingAddress: data.shippingAddress || "",
        subtotal: data.subtotal || 0,
        tax: data.tax || 0,
        shippingFee: data.shippingFee || 0,
        grandTotal: data.grandTotal || 0,
        status: "pending_review",
        paymentMethod: data.paymentMethod || "bank_transfer",
        paymentSlipUrl: data.paymentSlipUrl || "",
        paymentSlipName: data.paymentSlipName || null,
        transferTime: data.transferTime || null,
        salesNotes: data.salesNotes || null,
        items: {
          create: (data.items || []).map((item: any) => ({
            productId: item.productId || null,
            productName: item.productName,
            sku: item.sku,
            unit: item.unit,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status, confirmedBy, trackingNumber, deliveryCarrier } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing order id" }, { status: 400 });
    }

    const nowStr = new Date().toLocaleString("th-TH");
    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(confirmedBy ? { confirmedBy, confirmedAt: nowStr } : {}),
        ...(trackingNumber ? { trackingNumber } : {}),
        ...(deliveryCarrier ? { deliveryCarrier } : {}),
      },
      include: { items: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
