import { defineField, defineType } from "sanity";

export const franchiseProduct = defineType({
  name: "franchiseProduct",
  title: "สินค้าและวัตถุดิบแฟรนไชส์ (Franchise B2B Product)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "ชื่อสินค้า / วัตถุดิบ",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sku",
      title: "รหัสสินค้า (SKU)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isAvailable",
      title: "สถานะเปิดขาย / ปิดขาย (สวิตช์เปิด-ปิดสินค้าหมด)",
      description: "🟢 เปิด = มีสินค้าพร้อมขาย | 🔴 ปิด = สินค้าหมด (หน้าร้านจะขึ้นป้าย 'สินค้าหมด' ทันทีและกดสั่งซื้อไม่ได้)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "stockQuantity",
      title: "จำนวนสต็อกคงเหลือ (Stock Quantity)",
      description: "ใส่ตัวเลขสต็อกสินค้า เช่น 150, 0 (ถ้าใส่ 0 ระบบจะถือว่าสินค้าหมดอัตโนมัติเช่นกัน)",
      type: "number",
      validation: (rule) => rule.min(0),
      initialValue: 100,
    }),
    defineField({
      name: "price",
      title: "ราคาส่งแฟรนไชส์ (บาท)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "marketPrice",
      title: "ราคาปกติ / ราคาตลาด (บาท) [สำหรับแสดงขีดฆ่า]",
      type: "number",
    }),
    defineField({
      name: "unit",
      title: "หน่วยนับ",
      description: "เช่น ถุง (500g), ขวด (750ml), ถุง (1kg), ลัง (1,000 ชุด)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "หมวดหมู่สินค้า (Category)",
      description: "เลือกหมวดหมู่สินค้า (สามารถกดคลิกสร้างหมวดหมู่ใหม่ได้ทันทีจากตรงนี้)",
      type: "reference",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "รูปภาพสินค้า",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "รายละเอียดสินค้า",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "ลำดับการแสดงผล",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      sku: "sku",
      categoryTitle: "category.title",
      isAvailable: "isAvailable",
      stockQuantity: "stockQuantity",
      price: "price",
      media: "image",
    },
    prepare({ title, sku, categoryTitle, isAvailable, stockQuantity, price, media }) {
      const isOutOfStock = isAvailable === false || (stockQuantity ?? 0) <= 0;
      const statusBadge = isOutOfStock ? "🔴 สินค้าหมด (ปิดขาย)" : "🟢 พร้อมส่ง";
      const catText = categoryTitle ? `[${categoryTitle}] ` : "";
      return {
        title,
        subtitle: `${statusBadge} | ${catText}[${sku}] ฿${price} (คงเหลือ: ${stockQuantity ?? 0})`,
        media,
      };
    },
  },
});
