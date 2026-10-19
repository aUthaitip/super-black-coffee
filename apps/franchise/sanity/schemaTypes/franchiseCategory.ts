import { defineField, defineType } from "sanity";

export const franchiseCategory = defineType({
  name: "category",
  title: "หมวดหมู่สินค้า (Category)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ชื่อหมวดหมู่",
      type: "string",
      placeholder: "เช่น เมล็ดกาแฟ, ไซรัปและซอส, อุปกรณ์เครื่องชง",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "รหัสอ้างอิง (Slug)",
      type: "slug",
      description: "กดปุ่ม 'Generate' เพื่อสร้างรหัสอัตโนมัติจากชื่อหมวดหมู่ หรือพิมพ์เอง เช่น coffee_beans",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "รูปภาพ / ไอคอนหมวดหมู่",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "รายละเอียดหมวดหมู่",
      type: "text",
      rows: 2,
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
      title: "title",
      slug: "slug.current",
      media: "image",
    },
    prepare({ title, slug, media }) {
      return {
        title,
        subtitle: slug ? `Slug: ${slug}` : "ยังไม่ได้ระบุ Slug",
        media,
      };
    },
  },
});
