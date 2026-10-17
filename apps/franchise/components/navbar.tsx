"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import {
  Coffee,
  ShoppingBag,
  Clock,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, cart, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { href: "/store", label: "สั่งซื้อวัตถุดิบ/สินค้า", icon: Coffee },
    { href: "/orders", label: "ประวัติคำสั่งซื้อ & ติดตาม", icon: Clock },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href={user ? "/store" : "/"} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#80503a] text-white font-black text-xl shadow-inner">
              SB
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg">
                SUPER BLACK
              </span>
              <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-900 uppercase">
                B2B Store
              </span>
            </div>
          </Link>

          {/* Desktop Nav for logged-in franchise */}
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-slate-100 text-[#80503a] font-semibold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 border-r border-slate-200 pr-4">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60">
                  <Building2 className="h-4 w-4 text-[#80503a]" />
                  <div>
                    <div className="font-semibold text-slate-800">{user.branchName}</div>
                    <div className="text-[10px] text-slate-400">ผู้ดูแล: {user.fullName}</div>
                  </div>
                </div>
              </div>

              {/* Cart Button */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                <ShoppingBag className="h-4 w-4 text-[#80503a]" />
                <span className="hidden sm:inline">ตะกร้า</span>
                {totalCartCount > 0 && (
                  <Badge variant="default" className="h-5 px-1.5 text-xs bg-[#80503a]">
                    {totalCartCount}
                  </Badge>
                )}
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                title="ออกจากระบบ"
                className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-xs gap-1.5">
                  <LogIn className="h-3.5 w-3.5" />
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="default" size="sm" className="text-xs bg-[#80503a] hover:bg-[#623d2e] gap-1.5">
                  <UserPlus className="h-3.5 w-3.5" />
                  ลงทะเบียนสาขาใหม่
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && user && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm mb-3">
            <div className="font-semibold text-slate-800">{user.branchName}</div>
            <div className="text-xs text-slate-500">ผู้ดูแล: {user.fullName}</div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-100 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-[#80503a]" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
