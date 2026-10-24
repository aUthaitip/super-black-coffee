"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import {
  Coffee,
  ShoppingBag,
  Clock,
  LogOut,
  Menu,
  X,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, cart, logout } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const links = [
    { href: "/store", label: "สั่งสินค้า", icon: Coffee },
    { href: "/orders", label: "ประวัติคำสั่งซื้อ", icon: Clock },
  ];
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href={user ? "/store" : "/"}
            className="flex items-center gap-2.5"
            aria-label="Super Black Coffee หน้าหลัก"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white text-lg font-medium">
              SB
            </span>
            <span className="leading-tight">
              <span className="block text-xs sm:text-sm tracking-wide font-medium">
                SUPER BLACK
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-[0.2em] text-muted-foreground mt-1">
                FRANCHISE
              </span>
            </span>
          </Link>
          {user && (
            <nav aria-label="เมนูหลัก" className="hidden md:flex gap-1">
              {links.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    pathname === href && "bg-coffee-50 text-primary",
                  )}
                >
                  <Icon />
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden xl:flex items-center gap-2 text-xs text-muted-foreground mr-3">
                <Building2 className="size-4" />
                <span className="max-w-40 truncate">{user.branchName}</span>
              </span>
              <Link
                href="/cart"
                aria-label={`ตะกร้า ${count} ชิ้น`}
                className={buttonVariants({
                  variant: "outline",
                  className: "gap-2 px-3 bg-white",
                })}
              >
                <ShoppingBag />
                <span className="hidden sm:inline">ตะกร้า</span>
                {count > 0 && (
                  <Badge className="px-1.5 min-w-5 justify-center">
                    {count}
                  </Badge>
                )}
              </Link>
              <Button
                size="icon"
                variant="ghost"
                aria-label="ออกจากระบบ"
                className="hidden md:inline-flex text-muted-foreground"
                onClick={() => setLogoutOpen(true)}
              >
                <LogOut />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                aria-label={menuOpen ? "ปิดเมนู" : "เปิดเมนู"}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "hidden sm:inline-flex",
                })}
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "bg-white",
                })}
              >
                สมัครสาขาใหม่
              </Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && user && (
        <nav
          id="mobile-navigation"
          aria-label="เมนูมือถือ"
          className="md:hidden border-t p-4 space-y-2"
        >
          <p className="text-sm text-muted-foreground px-3 pb-2">
            {user.branchName}
          </p>
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={buttonVariants({
                variant: "ghost",
                className: "w-full justify-start",
              })}
            >
              <Icon />
              {label}
            </Link>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive"
            onClick={() => {
              setMenuOpen(false);
              setLogoutOpen(true);
            }}
          >
            <LogOut />
            ออกจากระบบ
          </Button>
        </nav>
      )}
      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-medium">ออกจากระบบ</DialogTitle>
            <DialogDescription>
              ตะกร้าของสาขาจะถูกเก็บไว้บนเบราว์เซอร์นี้
              คุณกลับมาสั่งซื้อต่อได้เมื่อเข้าสู่ระบบอีกครั้ง
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">อยู่ในระบบต่อ</Button>
            </DialogClose>
            <Button
              onClick={() => {
                logout();
                setLogoutOpen(false);
                router.push("/");
              }}
            >
              ออกจากระบบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
