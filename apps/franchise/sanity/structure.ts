import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("ระบบจัดการแฟรนไชส์")
    .items([
      // 1. หมวดหมู่สินค้า
      S.listItem()
        .id("categories")
        .title("📁 หมวดหมู่สินค้า (Categories)")
        .schemaType("category")
        .child(
          S.documentTypeList("category")
            .id("categories-list")
            .title("หมวดหมู่สินค้า")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // 2. สินค้าและวัตถุดิบ
      S.listItem()
        .id("products")
        .title("📦 สินค้าและวัตถุดิบ (Products)")
        .schemaType("franchiseProduct")
        .child(
          S.documentTypeList("franchiseProduct")
            .id("products-list")
            .title("รายการสินค้าทั้งหมด")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
    ]);
