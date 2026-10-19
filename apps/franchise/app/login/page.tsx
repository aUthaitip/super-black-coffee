"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        router.push("/store");
      } else {
        setError(res.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#80503a] text-white font-black text-2xl shadow-lg ring-4 ring-[#80503a]/20">
            SB
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            เข้าสู่ระบบแฟรนไชส์
          </h1>
          <p className="text-xs text-slate-500">
            Super Black Coffee - ระบบสั่งซื้อวัตถุดิบและอุปกรณ์ B2B
          </p>
        </div>

        {/* Card Form */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">
              ลงชื่อเข้าใช้
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              ใช้อีเมลและรหัสผ่านที่ลงทะเบียนไว้กับบริษัท
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 block">
                  อีเมล (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="branch@superblack.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 text-xs h-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 block">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 text-xs h-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#80503a] hover:bg-[#623d2e] h-10 text-sm font-semibold shadow-xs"
              >
                {loading ? "กำลังตรวจสอบข้อมูล..." : "เข้าสู่ระบบ (Login)"}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center space-y-2 text-xs text-slate-500">
              <div>
                ยังไม่มีบัญชีสาขาแฟรนไชส์?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#80503a] hover:underline"
                >
                  ลงทะเบียนสาขาใหม่ (Register)
                </Link>
              </div>
              <div className="pt-1 text-[11px] text-slate-400">
                สำหรับเจ้าหน้าที่บริษัท:{" "}
                <Link href="/admin" className="text-amber-700 hover:underline font-medium">
                  เข้าสู่ระบบแอดมินสำนักงานใหญ่ (Admin)
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
