export const LAYOUT_DATA = {
  brand: {
    name: "SUPER BLACK COFFEE",
    tagline: {
      th: "กาแฟดีในทุกจังหวะของคุณ",
      en: "Great Coffee, Every Moment.",
    },
    engTagline: "Great Coffee, Every Moment.",
    description: {
      th: "แบรนด์กาแฟออร์แกนิกสัญชาติไทยที่มุ่งมั่นส่งมอบรสชาติกาแฟดำเข้มลึกและประสบการณ์กาแฟคุณภาพสู่ทุกจังหวะชีวิต",
      en: "A Thai organic coffee brand dedicated to delivering rich black coffee and quality coffee experiences for every moment of life.",
    },
  },

  navLinks: [
    {
      href: "/",
      label: { th: "หน้าหลัก", en: "Home" },
    },
    // {
    //   href: "/about",
    //   label: { th: "เกี่ยวกับเรา", en: "About" },
    // },
    {
      href: "/menu",
      label: { th: "เมนู", en: "Menu" },
    },
    {
      href: "/franchise",
      label: { th: "ร่วมธุรกิจ", en: "Partnership" },
      children: [
        {
          href: "/franchise",
          label: { th: "สนใจร่วมธุรกิจเฟรนไช", en: "Franchise Opportunity" },
        },
        {
          href: "/branches",
          label: { th: "สาขาที่เปิดทำการ", en: "Active Branches" },
        },
        {
          href: "/about",
          label: { th: "เกี่ยวกับเรา", en: "About Us" },
        },
      ],
    },
    {
      href: "/blog",
      label: { th: "บทความและข่าวสาร", en: "Blog & News" },
    },
    {
      href: "/#contact",
      label: { th: "ติดต่อเรา", en: "Contact" },
    },
  ],

  portalLink: {
    href: process.env.NEXT_PUBLIC_FRANCHISE_URL || "http://localhost:3002",
    label: { th: "เข้าสู่ระบบ", en: "Sign In" },
  },

  findBranchButton: {
    href: "/branches",
    label: { th: "ค้นหาสาขา", en: "Find a Branch" },
  },

  footer: {
    quickLinksTitle: { th: "ลิงก์ด่วน", en: "Quick Links" },
    supportTitle: { th: "ช่วยเหลือ & สอบถาม", en: "Support & Inquiries" },
    followUsTitle: { th: "ติดตามเรา", en: "Follow Us" },
    hoursTitle: { th: "เวลาทำการสำนักงานใหญ่", en: "Headquarters Office Hours" },
    hoursDetail: {
      th: "จันทร์ - ศุกร์: 09:00 - 18:00 น.",
      en: "Monday - Friday: 09:00 - 18:00",
    },
    privacy: { th: "นโยบายความเป็นส่วนตัว", en: "Privacy Policy" },
    terms: { th: "ข้อกำหนดและเงื่อนไข", en: "Terms & Conditions" },
    rights: { th: "สงวนลิขสิทธิ์", en: "All Rights Reserved" },
    demoNotice: {
      th: "เว็บไซต์นี้จัดทำขึ้นเพื่อการสาธิตระบบ UI (Demo Only)",
      en: "This website is a demonstration UI prototype (Demo Only)",
    },
    backToTop: { th: "กลับขึ้นด้านบน", en: "Back to Top" },
    contactEmail: "superblackcoffee18@gmail.com",
    franchiseEmail: "superblackcoffee18@gmail.com",
  },
};
