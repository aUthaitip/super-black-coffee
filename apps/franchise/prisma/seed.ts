import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Seed Admin
  const admin = await prisma.admin.upsert({
    where: { email: "admin@rbc.co.th" },
    update: {},
    create: {
      email: "admin@rbc.co.th",
      password: "rbc22026",
      name: "ผู้ดูแลระบบ บจก. Super Black Coffee (Head Office)",
      role: "company_admin",
    },
  });
  console.log("✅ Admin seeded:", admin.email);

  // 2. Seed Categories (for reference)
  const categories = [
    { slug: "coffee_beans", name: "เมล็ดกาแฟ", order: 1 },
    { slug: "syrups_sauces", name: "ไซรัปและซอส", order: 2 },
    { slug: "tea_powder", name: "ชาและผงเครื่องดื่ม", order: 3 },
    { slug: "packaging", name: "บรรจุภัณฑ์ & แก้ว", order: 4 },
    { slug: "equipment", name: "อุปกรณ์ & เครื่องชง", order: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, order: cat.order },
      create: cat,
    });
  }
  console.log("✅ Categories seeded:", categories.length);

  // Clean all products - will be managed exclusively via Sanity CMS!
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  console.log("✅ Products cleared: Products will be fetched from Sanity CMS");

  console.log("🎉 Seed finished successfully (Clean DB: Ready for Sanity CMS Products)!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
