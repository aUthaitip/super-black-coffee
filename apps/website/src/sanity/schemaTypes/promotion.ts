import { defineField, defineType } from "sanity";

export const promotion = defineType({
  name: "promotion",
  title: "โปรโมชั่น & ป๊อปอัป (Promotions & Popups)",
  type: "document",
  fields: [
    defineField({
      name: "titleTh",
      title: "ชื่อโปรโมชั่น (ภาษาไทย)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "ชื่อโปรโมชั่น (ภาษาอังกฤษ)",
      type: "string",
    }),
    defineField({
      name: "bannerImage",
      title: "รูปภาพแบนเนอร์ / โปสเตอร์โปรโมชั่น",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isPopup",
      title: "แสดงเป็น Seasonal Popup หน้าแรก (Pop-up Dialog)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "เปิดใช้งาน (Active)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "linkUrl",
      title: "ลิงก์เมื่อกดแบนเนอร์ (ถ้ามี)",
      type: "string",
    }),
  ],
});
