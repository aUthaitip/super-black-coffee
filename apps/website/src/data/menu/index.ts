export interface MenuItem {
  id: string;
  name: {
    th: string;
    en: string;
  };
  price: number;
  category: "popular" | "coffee" | "tea" | "chocolate-milk" | "blended" | "soda";
  image: string;
  isPopular?: boolean;
}

export interface MenuCategory {
  id: "popular" | "coffee" | "tea" | "chocolate-milk" | "blended" | "soda";
  label: {
    th: string;
    en: string;
  };
}

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "popular", label: { th: "เมนูยอดนิยม", en: "Popular" } },
  { id: "coffee", label: { th: "เมนูกาแฟ", en: "Coffee" } },
  { id: "tea", label: { th: "เมนูชา", en: "Tea" } },
  { id: "chocolate-milk", label: { th: "เมนูช็อกโกแลตและนม", en: "Chocolate & Milk" } },
  { id: "blended", label: { th: "เมนูปั่น", en: "Frappe & Blended" } },
  { id: "soda", label: { th: "เมนูโซดา", en: "Sparkling Soda" } },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- เมนูยอดนิยม / Signature ---
  {
    id: "m-01",
    name: { th: "ซูเปอร์แบล็กดาร์กเย็น", en: "Super Black Dark Iced" },
    price: 65,
    category: "popular",
    image: "/menu/catalog/เมน-กาแฟเยน-super-black-darl-coco.webp",
    isPopular: true,
  },
  {
    id: "m-02",
    name: { th: "อเมริกาโน่ส้มเย็น", en: "Iced Orange Americano" },
    price: 70,
    category: "popular",
    image: "/menu/catalog/เมน-กาแฟเยน-อเมรกาโนสม.webp",
    isPopular: true,
  },
  {
    id: "m-03",
    name: { th: "ชาไทยเย็นปั่น", en: "Thai Tea Frappe" },
    price: 65,
    category: "popular",
    image: "/menu/catalog/เมน-ปน-ชาไทยปน.webp",
    isPopular: true,
  },
  {
    id: "m-04",
    name: { th: "อโวคาโดนมสดปั่น", en: "Fresh Avocado Milk Frappe" },
    price: 85,
    category: "popular",
    image: "/menu/catalog/อโวคาโด-อโวคาโดปนนมสด.webp",
    isPopular: true,
  },
  {
    id: "m-05",
    name: { th: "มัทฉะลาเต้เย็น", en: "Iced Matcha Latte" },
    price: 75,
    category: "popular",
    image: "/menu/catalog/เมน-ชา-มทฉะสตรอวเบอรร.webp",
    isPopular: true,
  },
  {
    id: "m-06",
    name: { th: "สตรอว์เบอร์รีปั่น", en: "Strawberry Smoothie" },
    price: 60,
    category: "popular",
    image: "/menu/catalog/เมน-ปน-สตรอวเบอรร-ปน.webp",
    isPopular: true,
  },

  // --- กาแฟ (Coffee) ---
  {
    id: "c-01",
    name: { th: "เอสเปรสโซเย็น", en: "Iced Espresso" },
    price: 60,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-เอสเปรสโซ.webp",
  },
  {
    id: "c-02",
    name: { th: "อเมริกาโน่เย็น", en: "Iced Americano" },
    price: 55,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-อเมรกาโน.webp",
  },
  {
    id: "c-03",
    name: { th: "ลาเต้เย็น", en: "Iced Latte" },
    price: 65,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-ลาเต.webp",
  },
  {
    id: "c-04",
    name: { th: "คาปูชิโนเย็น", en: "Iced Cappuccino" },
    price: 65,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-คาปชโน.webp",
  },
  {
    id: "c-05",
    name: { th: "มอคค่าเย็น", en: "Iced Mocha" },
    price: 70,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-มอคคา.webp",
  },
  {
    id: "c-06",
    name: { th: "คาราเมล มัคคิอาโตเย็น", en: "Iced Caramel Macchiato" },
    price: 75,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-คาราเมลมทคอาโต.webp",
  },
  {
    id: "c-07",
    name: { th: "อเมริกาโน่มะพร้าวเย็น", en: "Iced Coconut Americano" },
    price: 75,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-อเมรกาโนมะพราว.webp",
  },
  {
    id: "c-08",
    name: { th: "อเมริกาโน่ยูซุเย็น", en: "Iced Yuzu Americano" },
    price: 75,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-อเมรกาโนยส.webp",
  },
  {
    id: "c-09",
    name: { th: "อเมริกาโน่น้ำผึ้งมะนาว", en: "Honey Lemon Americano" },
    price: 70,
    category: "coffee",
    image: "/menu/catalog/เมน-กาแฟเยน-อเมรกาโนนำผงมะนาว.webp",
  },

  // --- เมนูชา (Tea) ---
  {
    id: "t-01",
    name: { th: "ชาไทยเย็นต้นตำรับ", en: "Traditional Thai Tea" },
    price: 55,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-ชาไทยสตรอวเบอรร.webp",
  },
  {
    id: "t-02",
    name: { th: "ชาเขียวมัทฉะลาเต้", en: "Matcha Green Tea Latte" },
    price: 70,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-เพยวมทฉะ.webp",
  },
  {
    id: "t-03",
    name: { th: "ชามะนาวเย็น", en: "Iced Lemon Tea" },
    price: 55,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-ชามะนาว-1.webp",
  },
  {
    id: "t-04",
    name: { th: "ชาพีชหอมหวาน", en: "Aromatic Peach Tea" },
    price: 60,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-ชาพช.webp",
  },
  {
    id: "t-05",
    name: { th: "มัทฉะมะพร้าวน้ำหอม", en: "Matcha Aromatic Coconut" },
    price: 80,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-มทฉะมะพราว.webp",
  },
  {
    id: "t-06",
    name: { th: "ชาเขียวน้ำผึ้งมะนาว", en: "Honey Lemon Green Tea" },
    price: 60,
    category: "tea",
    image: "/menu/catalog/เมน-ชา-ชาเขยวนำผงมะนาว.webp",
  },

  // --- เมนูช็อกโกแลตและนม (Chocolate & Milk) ---
  {
    id: "cm-01",
    name: { th: "โกโก้เข้มข้นเย็น", en: "Signature Iced Cocoa" },
    price: 60,
    category: "chocolate-milk",
    image: "/menu/catalog/เมน-ชา-โกโกเยน.webp",
  },
  {
    id: "cm-02",
    name: { th: "ช็อกโกแลตมินต์เย็น", en: "Iced Mint Chocolate" },
    price: 70,
    category: "chocolate-milk",
    image: "/menu/catalog/เมน-ชา-ชอกโกแลตมนต.webp",
  },
  {
    id: "cm-03",
    name: { th: "นมสดคาราเมลเย็น", en: "Caramel Fresh Milk" },
    price: 60,
    category: "chocolate-milk",
    image: "/menu/catalog/เมน-ชา-โกโกนมสดคาราเมล.webp",
  },
  {
    id: "cm-04",
    name: { th: "นมชมพูพรีเมียม", en: "Pink Sweet Milk" },
    price: 50,
    category: "chocolate-milk",
    image: "/menu/catalog/เมน-ชา-นมชมพ.webp",
  },
  {
    id: "cm-05",
    name: { th: "มะพร้าวนมสดเย็น", en: "Coconut Fresh Milk" },
    price: 65,
    category: "chocolate-milk",
    image: "/menu/catalog/เมน-ชา-มะพราวนมสด.webp",
  },

  // --- เมนูปั่น (Frappe & Blended) ---
  {
    id: "b-01",
    name: { th: "น้ำผึ้งมะนาวปั่น", en: "Honey Lemon Slush" },
    price: 75,
    category: "blended",
    image: "/menu/catalog/เมน-ปน-เสาวรสปน.webp",
  },
  {
    id: "b-02",
    name: { th: "ส้ม สมูทตี้ปั่น", en: "Orange Smoothie" },
    price: 60,
    category: "blended",
    image: "/menu/catalog/เมน-ปน-เสาวรสปน.webp",
  },
  {
    id: "b-03",
    name: { th: "สตรอว์เบอร์รี สมูทตี้ปั่น", en: "Strawberry Smoothie" },
    price: 60,
    category: "blended",
    image: "/menu/catalog/เมน-ปน-สตรอวเบอรร-ปน.webp",
  },
  {
    id: "b-04",
    name: { th: "โอริโอนมสดปั่น", en: "Oreo Fresh Milk Frappe" },
    price: 75,
    category: "blended",
    image: "/menu/catalog/เมน-ปน-โอรโอนมสดปน.webp",
  },
  {
    id: "b-05",
    name: { th: "มะพร้าวนมสดปั่น", en: "Coconut Milk Frappe" },
    price: 70,
    category: "blended",
    image: "/menu/catalog/เมน-ปน-มะพราวนมสดปน.webp",
  },
  {
    id: "b-06",
    name: { th: "อโวคาโดโยเกิร์ตนมสดปั่น", en: "Avocado Yogurt Smoothie" },
    price: 90,
    category: "blended",
    image: "/menu/catalog/เมน-ไรทองวมล-อโวคาโดโยเกรตนมสด-ปน.webp",
  },

  // --- เมนูโซดา (Soda) ---
  {
    id: "s-01",
    name: { th: "เลมอนน้ำผึ้งโซดา", en: "Honey Lemon Soda" },
    price: 55,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-เลมอนนำผงโซดา.webp",
  },
  {
    id: "s-02",
    name: { th: "ส้มโซดา", en: "Orange Soda" },
    price: 50,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-สมโซดา.webp",
  },
  {
    id: "s-03",
    name: { th: "พีชโซดา", en: "Peach Soda" },
    price: 55,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-พชโซดา.webp",
  },
  {
    id: "s-04",
    name: { th: "บลูฮาวายโซดา", en: "Blue Hawaii Soda" },
    price: 50,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-บลฮาวายโซดา.webp",
  },
  {
    id: "s-05",
    name: { th: "เสาวรสโซดา", en: "Passion Fruit Soda" },
    price: 55,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-เสาวรสโซดา.webp",
  },
  {
    id: "s-06",
    name: { th: "ลิ้นจี่โซดา", en: "Lychee Soda" },
    price: 50,
    category: "soda",
    image: "/menu/catalog/เมน-โซดา-ลนจโซดา.webp",
  },
];
