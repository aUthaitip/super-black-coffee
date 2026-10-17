import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "เมนูเครื่องดื่ม / สินค้า (Menu Item)",
  type: "document",
  fields: [
    defineField({
      name: "nameTh",
      title: "ชื่อเมนู (ภาษาไทย)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "ชื่อเมนู (ภาษาอังกฤษ)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "ราคา (บาท)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "category",
      title: "หมวดหมู่อาหาร/เครื่องดื่ม",
      type: "string",
      options: {
        list: [
          { title: "เมนูยอดนิยม (Popular)", value: "popular" },
          { title: "กาแฟ (Coffee)", value: "coffee" },
          { title: "ชา (Tea)", value: "tea" },
          { title: "ช็อกโกแลตและนม (Chocolate & Milk)", value: "chocolate-milk" },
          { title: "ปั่น (Frappe & Blended)", value: "blended" },
          { title: "โซดา (Soda)", value: "soda" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "รูปภาพเมนู",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPopular",
      title: "แสดงในหน้าแรก / เมนูแนะนำ (Featured / Popular)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "ลำดับการแสดงผล",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "nameTh",
      subtitle: "price",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `฿${subtitle}` : "",
        media,
      };
    },
  },
});
