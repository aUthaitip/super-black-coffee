import type { CartItem, Product } from "./types";

const CART_PREFIX = "sbc_franchise_cart:v1:";
export const cartStorageKey = (userId: string) =>
  `${CART_PREFIX}${encodeURIComponent(userId)}`;

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Record<string, unknown>;
  return (
    [
      "id",
      "sku",
      "name",
      "category",
      "categoryName",
      "unit",
      "image",
      "description",
    ].every((key) => typeof product[key] === "string") &&
    ["price", "marketPrice", "stockQuantity"].every(
      (key) =>
        typeof product[key] === "number" &&
        Number.isFinite(product[key]) &&
        product[key] >= 0,
    ) &&
    typeof product.isAvailable === "boolean"
  );
}

export function readStoredCart(key: string | null): CartItem[] {
  if (!key || typeof window === "undefined") return [];
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) || "null");
    if (
      !saved ||
      typeof saved !== "object" ||
      !("version" in saved) ||
      saved.version !== 1 ||
      !("items" in saved) ||
      !Array.isArray(saved.items)
    )
      return [];
    return saved.items.filter(
      (item): item is CartItem =>
        !!item &&
        typeof item === "object" &&
        isProduct(item.product) &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeStoredCart(key: string, items: CartItem[]) {
  try {
    if (items.length)
      localStorage.setItem(key, JSON.stringify({ version: 1, items }));
    else localStorage.removeItem(key);
  } catch {
    // Keep the current cart usable when browser storage is unavailable or full.
  }
}
