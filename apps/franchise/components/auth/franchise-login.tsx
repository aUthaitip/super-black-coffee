"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LockKeyhole,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Package,
  Truck,
  ClipboardList,
} from "lucide-react";

export function FranchiseLogin() {
  const router = useRouter();
  const { login, isLoggedIn } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (isLoggedIn) router.replace("/store");
  }, [isLoggedIn, router]);
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) router.push("/store");
    else setError(result.error || "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง");
  }
  return (
    <div className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center py-6 sm:py-10">
      <div className="text-center space-y-3 mb-7">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary text-white text-2xl font-medium ring-4 ring-coffee-100">
          SB
        </div>
        <p className="text-[11px] tracking-[0.2em] text-primary">
          SUPER BLACK COFFEE
        </p>
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
          เข้าสู่ระบบแฟรนไชส์
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          วัตถุดิบ อุปกรณ์ และทุกอย่างสำหรับสาขาของคุณ
        </p>
      </div>
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="p-6 sm:p-7 pb-5">
          <CardTitle className="text-lg">ยินดีต้อนรับกลับ</CardTitle>
          <CardDescription className="text-xs leading-relaxed">
            ใช้อีเมลและรหัสผ่านที่ลงทะเบียนไว้กับบริษัท
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-7 pb-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive">
                <AlertCircle />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="branch-email">อีเมลสาขา</Label>
              <InputGroup className="h-11">
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id="branch-email"
                  type="email"
                  autoComplete="username"
                  placeholder="branch@superblack.co"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch-password">รหัสผ่าน</Label>
              <InputGroup className="h-11">
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupInput
                  id="branch-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="กรอกรหัสผ่านของคุณ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    size="icon-xs"
                    aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Button type="submit" className="w-full h-11">
              เข้าสู่ระบบ
              <ArrowRight />
            </Button>
          </form>
          <div className="mt-6 border-t pt-5 text-center text-xs text-muted-foreground space-y-2">
            <p>ยังไม่มีบัญชีสาขาแฟรนไชส์?</p>
            <Link
              href="/register"
              className="inline-block text-primary hover:underline underline-offset-4"
            >
              ลงทะเบียนสาขาใหม่ →
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] text-muted-foreground">
        {[
          { Icon: Package, label: "สั่งวัตถุดิบ" },
          { Icon: Truck, label: "ติดตามการจัดส่ง" },
          { Icon: ClipboardList, label: "ดูประวัติคำสั่งซื้อ" },
        ].map(({ Icon, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <Icon className="size-3.5" />
            {label}
          </span>
        ))}
      </div>
      <Link
        href="/admin"
        className="mt-6 text-[11px] text-muted-foreground hover:text-primary underline underline-offset-4"
      >
        สำหรับเจ้าหน้าที่สำนักงานใหญ่
      </Link>
    </div>
  );
}
