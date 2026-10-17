"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Check,
  ShoppingBag,
  Sparkles,
  PackageCheck,
  Truck,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export default function StoreCatalogPage() {
  const router = useRouter();
  const { products, addToCart, cart, user, isLoggedIn, toggleProductAvailability, updateProductStock } = useStore();

  React.useEffect(() => {
    if (!isLoggedIn || !user || user.approvalStatus !== "approved") {
      router.push("/");
    }
  }, [isLoggedIn, user, router]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});

  // Deliberate initial loading animation to showcase loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  };

  const categories = [
    { id: "all", label: "สินค้าทั้งหมด" },
    { id: "coffee_beans", label: "เมล็ดกาแฟ" },
    { id: "syrups_sauces", label: "ไซรัป & ซอส" },
    { id: "tea_powder", label: "ชา & ผงเครื่องดื่ม" },
    { id: "packaging", label: "บรรจุภัณฑ์ & แก้ว" },
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      selectedCategory === "all" || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any, qty = 1) => {
    addToCart(product, qty);
    setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-6 md:p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            สั่งวัตถุดิบ & แพ็กเกจจิ้ง {user ? `สำหรับ ${user.branchName}` : ""}
          </h1>
          <p className="text-sm text-stone-300">
            ราคาส่งพิเศษเฉพาะผู้ถือสิทธิ์แฟรนไชส์ Super Black Coffee จัดส่งตรงจากคลังกลาง
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-amber-400" />
              <span>ส่งฟรีเมื่อสั่งครบ 5,000 บาท</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PackageCheck className="h-4 w-4 text-amber-400" />
              <span>ตัดรอบส่ง 14:00 น. ทุกวันทำการ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>รับประกันคุณภาพเมล็ดคั่วใหม่</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex overflow-x-auto pb-1 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#80503a] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อสินค้า, รหัส SKU..."
            className="pl-9 h-10 bg-white"
          />
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs animate-pulse"
            >
              <div className="aspect-4/3 w-full bg-slate-200" />
              <div className="p-4 space-y-3">
                <div className="h-3 w-16 bg-slate-200 rounded" />
                <div className="h-4 w-4/5 bg-slate-200 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="h-5 w-20 bg-slate-200 rounded" />
                  <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.product.id === product.id);
            const isAdded = addedItemMap[product.id];
            const isOutOfStock = !product.isAvailable || product.stockQuantity <= 0;

            return (
              <Card
                key={product.id}
                className={`flex flex-col overflow-hidden border-slate-200 transition-all hover:shadow-md group bg-white ${
                  isOutOfStock ? "opacity-75 grayscale-[20%]" : "hover:border-slate-300"
                }`}
              >
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur text-[11px]">
                      {product.categoryName}
                    </Badge>
                  </div>
                  {/* Out of stock banner */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md tracking-wide uppercase">
                        สินค้าหมด (Out of Stock)
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">{product.sku}</span>
                      {isOutOfStock ? (
                        <span className="text-[10px] text-red-600 font-bold">หมด</span>
                      ) : (
                        <span className="text-[10px] text-emerald-700 font-semibold">พร้อมส่ง</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mt-0.5 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xs text-slate-400">ราคาส่งสาขา</span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-bold text-[#80503a]">
                            ฿{product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            ฿{product.marketPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        / {product.unit}
                      </span>
                    </div>

                    <div>
                      {isOutOfStock ? (
                        <Button
                          disabled
                          className="w-full text-xs font-semibold bg-slate-200 text-slate-500 cursor-not-allowed border-0"
                        >
                          ✕ สินค้าหมดชั่วคราว
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddToCart(product, 1)}
                          className={`w-full text-xs font-semibold ${
                            isAdded
                              ? "bg-emerald-600 hover:bg-emerald-700"
                              : "bg-[#80503a] hover:bg-[#623d2e]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="h-4 w-4 mr-1" /> เพิ่มแล้ว ({cartItem?.quantity})
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-4 w-4 mr-1" /> เพิ่มลงตะกร้า
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Floating Checkout bar on mobile */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
          <Link href="/cart">
            <div className="flex items-center justify-between rounded-xl bg-[#80503a] p-3 text-white shadow-xl">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm font-semibold">
                  {cart.reduce((s, i) => s + i.quantity, 0)} รายการในตะกร้า
                </span>
              </div>
              <div className="text-sm font-bold">
                ฿
                {cart
                  .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
                  .toLocaleString()}{" "}
                →
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Sanity CMS Product Manager Simulator Tool */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
              S
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-950 flex items-center gap-2">
                Sanity Studio Simulator (จำลองการจัดการสินค้าหลังบ้าน)
              </h4>
              <p className="text-[11px] text-slate-500">
                จำลองปุ่ม "เปิด/ปิดขาย (isAvailable)" และ "ใส่จำนวนสต็อก (stockQuantity)" ที่แอดมินตั้งค่าใน Sanity Studio
              </p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full w-fit">
            Sanity Schema: franchiseProduct
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((p) => {
            const isOutOfStock = !p.isAvailable || p.stockQuantity <= 0;
            return (
              <div
                key={p.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-slate-800 truncate" title={p.name}>
                    {p.name}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block">สต็อกใน Sanity:</span>
                    <input
                      type="number"
                      min={0}
                      value={p.stockQuantity}
                      onChange={(e) => updateProductStock(p.id, Number(e.target.value) || 0)}
                      className="w-16 h-7 rounded border border-slate-200 bg-white px-1.5 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">ปุ่มเปิด/ปิดขาย:</span>
                    <button
                      onClick={() => toggleProductAvailability(p.id)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                        p.isAvailable && p.stockQuantity > 0
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-red-600 text-white hover:bg-red-700"
                      }`}
                    >
                      {p.isAvailable && p.stockQuantity > 0 ? "🟢 เปิด (มีของ)" : "🔴 ปิด (หมด)"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
