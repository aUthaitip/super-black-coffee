export interface BranchPromotion {
  id: string;
  branchSlug: string;
  branchName: {
    th: string;
    en: string;
  };
  title: {
    th: string;
    en: string;
  };
  tag: {
    th: string;
    en: string;
  };
  image: string;
}

export interface PromotionBranchTab {
  slug: string;
  name: {
    th: string;
    en: string;
  };
}

export const PROMOTION_BRANCH_TABS: PromotionBranchTab[] = [
  { slug: "ayutthaya", name: { th: "อยุธยา", en: "Ayutthaya" } },
  { slug: "phitsanulok", name: { th: "พิษณุโลก", en: "Phitsanulok" } },
];

export const BRANCH_PROMOTIONS: BranchPromotion[] = [
  // Ayutthaya promotions
  {
    id: "ayu-lychee-tea",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "ชาลิ้นจี่", en: "Lychee Tea Buy 1 Get 1" },
    image: "/promotions/ayutthaya/ชาลิ้นจั่.webp",
  },
  {
    id: "ayu-passion-fruit",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "ชาเสาวรส ซื้อ 1 แถม 1", en: "Passion Fruit Tea Buy 1 Get 1" },
    image: "/promotions/ayutthaya/ชาเสาวรส ซื้อ 1 แถม 1.webp",
  },
  {
    id: "ayu-blueberry-honey-soda",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "บลูเบอร์รี่น้ำผึ้งโซดา ซื้อ 1 แถม 1", en: "Blueberry Honey Soda Buy 1 Get 1" },
    image: "/promotions/ayutthaya/บลูเบอร์รี่น้ำผึ้งโซดา ซื้อ 1 แถม 1.webp",
  },
  {
    id: "ayu-lychee-milk",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "โปรโมชั่นลิ้นจี่นมสดสุดสดชื่น", en: "Fresh Lychee Milk Special Promo" },
    image: "/promotions/ayutthaya/โปรโมชันลิ้นจี่นมสดสุดสดชื่น.webp",
  },
  {
    id: "ayu-blueberry-milk",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "โปสเตอร์บลูเบอร์รี่นมสดสุดสดชื่น", en: "Fresh Blueberry Milk Special" },
    image: "/promotions/ayutthaya/โปสเตอร์บลูเบอร์รี่นมสดสุดสดชื่น.webp",
  },
  {
    id: "ayu-lychee-honey-soda",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "ลิ้นจี่น้ำผึ้งโซดา ซื้อ 1 แถม 1", en: "Lychee Honey Soda Buy 1 Get 1" },
    image: "/promotions/ayutthaya/ลิ้นจี่น้ำผึ้งโซดา ซื้อ 1 แถม 1.webp",
  },
  {
    id: "ayu-americano-lychee",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "อเมริกาโน่ลิ้นจี่ โปรสุดสดชื่น", en: "Americano Lychee Special" },
    image: "/promotions/ayutthaya/อเมริกาโน่ลิ้นจี่ โปรสุดสดชื่น.webp",
  },
  {
    id: "ayu-mango-milk",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "โปสเตอร์มะม่วงนมสด ซื้อ 1 แถม 1", en: "Mango Milk Buy 1 Get 1" },
    image: "/promotions/ayutthaya/โปสเตอร์มะม่วงนมสด ซื้อ 1 แถม 1.webp",
  },
  {
    id: "ayu-strawberry-milk",
    branchSlug: "ayutthaya",
    branchName: { th: "อยุธยา", en: "Ayutthaya" },
    tag: { th: "เฉพาะสาขาอยุธยา", en: "Ayutthaya Branch Only" },
    title: { th: "โปสเตอร์สตรอว์เบอร์รี่นมสด ซื้อ 1 แถม 1", en: "Strawberry Milk Buy 1 Get 1" },
    image: "/promotions/ayutthaya/โปสเตอร์สตรอว์เบอร์รี่นมสด ซื้อ 1 แถม 1.webp",
  },

  // Phitsanulok promotions
  {
    id: "phit-lychee-tea",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "ชาลิ้นจี่", en: "Lychee Tea Buy 1 Get 1" },
    image: "/promotions/phitsanulok/ชาลิ้นจั่.webp",
  },
  {
    id: "phit-passion-fruit",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "ชาเสาวรส ซื้อ 1 แถม 1", en: "Passion Fruit Tea Buy 1 Get 1" },
    image: "/promotions/phitsanulok/ชาเสาวรส ซื้อ 1 แถม 1.webp",
  },
  {
    id: "phit-blueberry-honey-soda",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "บลูเบอร์รี่น้ำผึ้งโซดา ซื้อ 1 แถม 1", en: "Blueberry Honey Soda Buy 1 Get 1" },
    image: "/promotions/phitsanulok/บลูเบอร์รี่น้ำผึ้งโซดา ซื้อ 1 แถม 1.webp",
  },
  {
    id: "phit-schweppes-americano",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "โปรโมชันอเมริกาโน่ชเว็ปสุดคุ้ม", en: "Americano Schweppes Special" },
    image: "/promotions/phitsanulok/โปรโมชันอเมริกาโน่ชเว็ปสุดคุ้ม.webp",
  },
  {
    id: "phit-schweppes-grape-cocoa",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "โปสเตอร์ชเว็ปองุ่นโกโก้สุดสดชื่น", en: "Schweppes Grape Cocoa Refreshing" },
    image: "/promotions/phitsanulok/โปสเตอร์ชเว็ปองุ่นโกโก้สุดสดชื่น.webp",
  },
  {
    id: "phit-lychee-milk",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "โปรโมชันลิ้นจี่นมสดสุดสดชื่น", en: "Fresh Lychee Milk Special Promo" },
    image: "/promotions/phitsanulok/โปรโมชันลิ้นจี่นมสดสุดสดชื่น.webp",
  },
  {
    id: "phit-blueberry-milk",
    branchSlug: "phitsanulok",
    branchName: { th: "พิษณุโลก", en: "Phitsanulok" },
    tag: { th: "เฉพาะสาขาพิษณุโลก", en: "Phitsanulok Branch Only" },
    title: { th: "โปสเตอร์บลูเบอร์รี่นมสดสุดสดชื่น", en: "Fresh Blueberry Milk Special" },
    image: "/promotions/phitsanulok/โปสเตอร์บลูเบอร์รี่นมสดสุดสดชื่น.webp",
  },
];
