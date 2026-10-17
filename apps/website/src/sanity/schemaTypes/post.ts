import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "บทความ / ข่าวสาร (Blog Post)",
  type: "document",
  fields: [
    defineField({
      name: "titleTh",
      title: "หัวข้อบทความ (ภาษาไทย)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "หัวข้อบทความ (ภาษาอังกฤษ)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (URL เช่น 'summer-coffee-launch')",
      type: "slug",
      options: {
        source: (doc) => (doc?.titleEn as string) || (doc?.titleTh as string) || "",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerptTh",
      title: "คำเกริ่นย่อ (ภาษาไทย)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "excerptEn",
      title: "คำเกริ่นย่อ (ภาษาอังกฤษ)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "รูปภาพหน้าปก",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "หมวดหมู่",
      type: "string",
      options: {
        list: [
          { title: "กาแฟและสูตรเครื่องดื่ม (Coffee & Craft)", value: "Coffee & Craft" },
          { title: "ธุรกิจและแฟรนไชส์ (Business & Franchise)", value: "Business & Franchise" },
          { title: "เรื่องเล่าและประสบการณ์ (Story & Lifestyle)", value: "Story & Lifestyle" },
        ],
      },
    }),
    defineField({
      name: "publishedAt",
      title: "วันที่เผยแพร่",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "contentTh",
      title: "เนื้อหาบทความ (ภาษาไทย - Rich Text)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "คำอธิบายภาพ (Alt Text)",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "contentEn",
      title: "เนื้อหาบทความ (ภาษาอังกฤษ - Rich Text)",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "คำอธิบายภาพ (Alt Text)",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "titleTh",
      subtitle: "titleEn",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "ไม่มีชื่อภาษาไทย",
        subtitle: subtitle || "",
        media,
      };
    },
  },
});
