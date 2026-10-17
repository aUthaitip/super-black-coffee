import { defineField, defineType } from "sanity";

export const branch = defineType({
  name: "branch",
  title: "ข้อมูลสาขา (Branch)",
  type: "document",
  fields: [
    defineField({
      name: "nameTh",
      title: "ชื่อสาขา (ภาษาไทย)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "ชื่อสาขา (ภาษาอังกฤษ)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug รหัสสาขา (เช่น 'ayutthaya-ev')",
      type: "slug",
      options: { source: "nameEn", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "addressTh",
      title: "ที่อยู่ (ภาษาไทย)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "addressEn",
      title: "ที่อยู่ (ภาษาอังกฤษ)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "openingHours",
      title: "เวลาเปิด-ปิด (เช่น 06:30 - 20:00 น.)",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "เบอร์โทรศัพท์ติดต่อ",
      type: "string",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "image",
      title: "รูปถ่ายหน้าร้าน / บรรยากาศ",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "features",
      title: "สิ่งอำนวยความสะดวก (เช่น มีที่ชาร์จ EV, ที่จอดรถ)",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});
