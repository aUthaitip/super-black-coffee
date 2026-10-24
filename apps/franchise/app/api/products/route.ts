import { NextResponse } from "next/server";
import { getSanityProducts } from "@/lib/sanity-products";

export async function GET() {
  try {
    return NextResponse.json(await getSanityProducts());
  } catch (error) {
    console.error("Failed to fetch Sanity products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
