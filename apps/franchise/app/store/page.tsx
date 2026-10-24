"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowRight,
  AlertCircle,
  Search,
  ShoppingBag,
  Truck,
  Clock3,
  Plus,
  Minus,
  PackageSearch,
  Building2,
} from "lucide-react";

export default function StoreCatalogPage() {
  const router = useRouter();
  const {
    products,
    categories,
    addToCart,
    updateQuantity,
    cart,
    user,
    isLoggedIn,
    isProductsLoading,
    productsError,
  } = useStore();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!isLoggedIn) router.replace("/");
  }, [isLoggedIn, router]);
  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      `${p.name} ${p.sku}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  if (!isLoggedIn) return null;

  return (
    <div className="space-y-6 pb-20 sm:pb-4">
      <div className="overflow-hidden rounded-2xl border border-coffee-200 bg-coffee-100">
        <section className="flex flex-col justify-between gap-6 p-5 sm:p-8 lg:flex-row lg:items-center">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.18em] text-coffee-700">
              SUPER BLACK · FRANCHISE STORE
            </p>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug text-coffee-950">
              สั่งวัตถุดิบสำหรับสาขาของคุณ
            </h1>
            <p className="text-sm text-coffee-800">
              เลือกสินค้าและอุปกรณ์ พร้อมจัดส่งจากคลังกลาง
            </p>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-coffee-200 bg-white/65 px-3 py-2 text-xs text-coffee-800">
              <Building2 className="size-4" />
              {user?.branchName}
              <span className="text-coffee-300">/</span>
              {user?.branchCode}
            </div>
          </div>
          <Card className="hidden lg:block lg:w-72 shrink-0 border-coffee-200 bg-white shadow-sm">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="size-4 text-primary" />
                  ตะกร้าของคุณ
                </span>
                <Badge
                  variant="secondary"
                  className="border-coffee-200 bg-coffee-50 text-coffee-800"
                >
                  {count} ชิ้น
                </Badge>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground">ยอดสินค้า</span>
                <span className="text-2xl tabular-nums">
                  ฿{subtotal.toLocaleString()}
                </span>
              </div>
              <Link
                href="/cart"
                className={buttonVariants({
                  variant: "default",
                  className: "w-full justify-between",
                })}
              >
                ดูตะกร้า
                <ArrowRight />
              </Link>
            </CardContent>
          </Card>
        </section>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-coffee-700 bg-coffee-800 px-5 py-4 text-xs text-coffee-50 sm:px-8">
          <span className="flex items-center gap-2">
            <Truck className="size-4 text-coffee-300" />
            ส่งฟรีเมื่อยอดสินค้าครบ 5,000 บาท
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="size-4 text-coffee-300" />
            ตัดรอบส่ง 14:00 น. ทุกวันทำการ
          </span>
          {subtotal > 0 && subtotal < 5000 && (
            <span className="rounded-md bg-white/10 px-2.5 py-1.5 text-coffee-100 sm:ml-auto">
              อีก ฿{(5000 - subtotal).toLocaleString()} รับสิทธิ์ส่งฟรี
            </span>
          )}
        </div>
      </div>

      <section className="space-y-5" aria-label="รายการสินค้า">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-medium">เลือกสินค้าสำหรับสาขา</h2>
            <span className="text-xs text-muted-foreground">
              {isProductsLoading ? "กำลังโหลด…" : `${filtered.length} รายการ`}
            </span>
          </div>
          <InputGroup className="sm:w-80 h-11 bg-white">
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupInput
              aria-label="ค้นหาสินค้า"
              placeholder="ค้นหาชื่อสินค้า หรือรหัส SKU"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </div>
        <Tabs value={category} onValueChange={setCategory} className="gap-5">
          <div className="overflow-x-auto pb-1">
            <TabsList
              aria-label="หมวดหมู่สินค้า"
              className="h-11! gap-1 bg-transparent p-0"
            >
              {[
                { id: "all", title: "สินค้าทั้งหมด", slug: "all" },
                ...categories,
              ].map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.slug || c.id}
                  className="px-4 h-10 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-white border-border"
                >
                  {c.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value={category} className="space-y-4">
            {productsError ? (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertDescription>{productsError}</AlertDescription>
              </Alert>
            ) : isProductsLoading ? (
              <div
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                role="status"
                aria-label="กำลังโหลดสินค้า"
              >
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-4 space-y-4 animate-pulse"
                  >
                    <div className="aspect-4/3 bg-muted rounded-lg" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-10 bg-muted rounded" />
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <Card className="border-dashed shadow-none">
                <CardContent className="py-16 text-center space-y-3">
                  <PackageSearch className="size-9 mx-auto text-primary" />
                  <h3 className="font-medium">
                    {products.length
                      ? "ไม่พบสินค้าที่ค้นหา"
                      : "ยังไม่มีสินค้าพร้อมจำหน่าย"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {products.length
                      ? "ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่น"
                      : "รายการสินค้าจะปรากฏเมื่อพร้อมเปิดให้สั่งซื้อ"}
                  </p>
                  {products.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setCategory("all");
                      }}
                    >
                      ดูสินค้าทั้งหมด
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((product) => {
                  const item = cart.find((i) => i.product.id === product.id);
                  const min = Math.max(1, product.minOrder || 1);
                  const unavailable =
                    !product.isAvailable || product.stockQuantity < min;
                  return (
                    <Card
                      key={product.id}
                      data-product-id={product.id}
                      className="group flex flex-col overflow-hidden bg-white shadow-none transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className={`h-full w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-105 ${unavailable ? "opacity-60" : ""}`}
                        />
                        <Badge
                          variant="secondary"
                          className="absolute top-3 left-3 bg-white text-xs shadow-sm"
                        >
                          {product.categoryName}
                        </Badge>
                        {item && (
                          <Badge className="absolute bottom-3 right-3">
                            ในตะกร้า {item.quantity} ชิ้น
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 flex flex-1 flex-col gap-3">
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span className="text-muted-foreground break-all">
                            {product.sku}
                          </span>
                          <span
                            className={`shrink-0 ${unavailable ? "text-muted-foreground" : "text-emerald-700"}`}
                          >
                            {unavailable ? "สินค้าหมด" : "● พร้อมส่ง"}
                          </span>
                        </div>
                        <div className="space-y-1 flex-1">
                          <h3 className="font-medium text-sm leading-relaxed">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t flex justify-between items-end gap-2">
                          <div>
                            <p className="text-[11px] text-muted-foreground">
                              ราคาสำหรับสาขา
                            </p>
                            <span className="text-xl text-primary tabular-nums">
                              ฿{product.price.toLocaleString()}
                            </span>
                            {product.marketPrice > product.price && (
                              <span className="ml-2 text-xs text-muted-foreground line-through">
                                ฿{product.marketPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            / {product.unit}
                          </span>
                        </div>
                        {min > 1 && (
                          <p className="text-xs text-muted-foreground">
                            สั่งขั้นต่ำ {min} {product.unit}
                          </p>
                        )}
                        {unavailable ? (
                          <Button
                            disabled
                            variant="secondary"
                            className="w-full"
                          >
                            สินค้าหมดชั่วคราว
                          </Button>
                        ) : item ? (
                          <div className="flex h-10 items-center justify-between rounded-lg border border-coffee-200 bg-coffee-50">
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label={`ลดจำนวน ${product.name}`}
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  item.quantity <= min ? 0 : item.quantity - 1,
                                )
                              }
                            >
                              <Minus />
                            </Button>
                            <span
                              className="text-sm tabular-nums"
                              aria-live="polite"
                            >
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              disabled={item.quantity >= product.stockQuantity}
                              aria-label={`เพิ่มจำนวน ${product.name}`}
                              onClick={() =>
                                updateQuantity(product.id, item.quantity + 1)
                              }
                            >
                              <Plus />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            className="w-full"
                            onClick={() => addToCart(product, min)}
                            aria-label={`เพิ่มลงตะกร้า ${product.name}`}
                          >
                            <Plus />
                            เพิ่มลงตะกร้า
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
      {count > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-4 inset-x-4 z-30 flex items-center justify-between rounded-xl bg-primary p-4 text-white shadow-lg sm:hidden"
        >
          <span className="flex items-center gap-2 text-sm">
            <ShoppingBag className="size-4" />
            ดูตะกร้า ({count})
          </span>
          <span className="flex items-center gap-2 text-sm">
            ฿{subtotal.toLocaleString()}
            <ArrowRight className="size-4" />
          </span>
        </Link>
      )}
    </div>
  );
}
