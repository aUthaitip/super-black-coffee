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
      title: "สถานะเปิดขาย (เปิด = มีสินค้าพร้อมขาย / ปิด = สินค้าหมด)",
      description: "ถ้ากดปิด (Toggle Off) หน้าบ้านจะขึ้นว่า 'สินค้าหมด' และกดสั่งซื้อไม่ได้",
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
      title: "หมวดหมู่สินค้า",
      type: "string",
      options: {
        list: [
          { title: "เมล็ดกาแฟ (Coffee Beans)", value: "coffee_beans" },
          { title: "ไซรัปและซอส (Syrups & Sauces)", value: "syrups_sauces" },
          { title: "ชาและผงเครื่องดื่ม (Tea & Powders)", value: "tea_powder" },
          { title: "บรรจุภัณฑ์ & แก้ว (Packaging)", value: "packaging" },
          { title: "อุปกรณ์ & เครื่องชง (Equipment)", value: "equipment" },
        ],
      },
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
      isAvailable: "isAvailable",
      stockQuantity: "stockQuantity",
      price: "price",
      media: "image",
    },
    prepare({ title, sku, isAvailable, stockQuantity, price, media }) {
      const statusText = isAvailable !== false && (stockQuantity ?? 1) > 0 ? "🟢 มีสินค้า" : "🔴 หมด";
      return {
        title,
        subtitle: `[${sku}] ฿${price} | สต็อก: ${stockQuantity ?? 0} (${statusText})`,
        media,
      };
    },
  },
});
