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

export const MENU_ITEMS: MenuItem[] = [];
