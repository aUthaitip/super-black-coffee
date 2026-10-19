import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: "asc" },
      include: { category: true },
    });

    const mapped = products.map((p) => ({
      id: p.id,
      sku: p.sku,
      name: p.name,
      category: p.category?.slug || p.categorySlug,
      categoryName: p.category?.name || p.categoryName,
      unit: p.unit,
      price: p.price,
      marketPrice: p.marketPrice,
      image: p.image,
      stockQuantity: p.stockQuantity,
      isAvailable: p.isAvailable && p.stockQuantity > 0,
      description: p.description || "",
      minOrder: p.minOrder || 1,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
