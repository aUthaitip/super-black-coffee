import { defineQuery } from "next-sanity";
import { sanityClient, urlFor } from "./sanity";
import type { Product } from "./types";

const productsQuery = defineQuery(`*[_type == "franchiseProduct"] | order(order asc, _createdAt desc){
  "id": _id, sku, name, unit, price, marketPrice, image, description,
  stockQuantity, isAvailable, minOrder,
  "category": coalesce(category->slug.current, category, ""),
  "categoryName": coalesce(category->title, categoryName, "ทั่วไป")
}`);

type SanityProduct = Omit<Product, "image"> & {
  image?: Parameters<typeof urlFor>[0];
};

export async function getSanityProducts(): Promise<Product[]> {
  const products = await sanityClient.fetch<SanityProduct[]>(
    productsQuery, {}, { perspective: "published", cache: "no-store" }
  );
  return products.map((product) => ({
    ...product,
    sku: product.sku.trim(),
    marketPrice: product.marketPrice ?? Math.round(product.price * 1.2),
    stockQuantity: product.stockQuantity ?? 100,
    isAvailable: product.isAvailable !== false && (product.stockQuantity ?? 100) > 0,
    minOrder: product.minOrder ?? 1,
    description: product.description ?? "",
    image: product.image ? urlFor(product.image).width(600).height(600).url() : "/images/placeholder.png",
  }));
}
