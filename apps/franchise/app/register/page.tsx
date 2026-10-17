"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { FranchiseUser } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Store,
  Mail,
  Lock,
  Phone,
  User,
  AlertCircle,
  FileCheck,
  Upload,
  CheckCircle2,
  KeyRound,
  RefreshCw,
  Send,
  Building,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, approveBranch, login } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Steps: 'form' -> 'otp' -> 'pending_email'
  const [step, setStep] = useState<"form" | "otp" | "pending_email">("form");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branchName, setBranchName] = useState("");
  const [phone, setPhone] = useState("");
  const [contractFile, setContractFile] = useState<File | null>(null);
  const [contractFileName, setContractFileName] = useState("");

  // OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("892145");
  const [otpError, setOtpError] = useState("");

  // Pending User info
  const [pendingUser, setPendingUser] = useState<FranchiseUser | null>(null);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setContractFile(file);
      setContractFileName(file.name);
      setFormError("");
    }
  };

  // Submit Form -> Go to OTP
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("กรุณากรอกชื่อ-นามสกุล");
      return;
    }
    if (!email.trim()) {
      setFormError("กรุณากรอกอีเมล");
      return;
    }
    if (!password) {
      setFormError("กรุณากรอกรหัสผ่าน");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    if (!branchName.trim()) {
      setFormError("กรุณากรอกชื่อสาขาแฟรนไชส์");
      return;
    }
    // Strict contract file check: ถ้าไม่มีอัพโหลดจะเข้าใช้ไม่ได้
    if (!contractFile) {
      setFormError("จำเป็นต้องอัปโหลด 'ใบสัญญาซื้อขายแฟรนไชส์' เพื่อส่งให้บริษัทตรวจก่อนเข้าใช้งาน (หากไม่มีจะไม่สามารถลงทะเบียนได้)");
      return;
    }
    if (!phone.trim()) {
      setFormError("กรุณากรอกเบอร์โทรศัพท์");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      setLoading(false);
      setStep("otp");
    }, 500);
  };

  // Handle OTP Inputs
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError("");

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Submit OTP -> Send email notification to company & move to 'pending_email'
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      setOtpError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    if (enteredOtp !== generatedOtp && enteredOtp !== "123456") {
      setOtpError("รหัส OTP ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register({
        fullName,
        email,
        password,
        branchName,
        phone,
        contractFileUrl: contractFileName || "franchise_contract.pdf",
      });

      setLoading(false);
      if (res.success && res.user) {
        setPendingUser(res.user);
        setStep("pending_email");
      } else {
        setOtpError(res.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      }
    }, 800);
  };

  // Simulation: Test Company Approval button
  const handleSimulateCompanyApproval = () => {
    if (!pendingUser) return;
    approveBranch(pendingUser.id);
    login(pendingUser.email);
    router.push("/store");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      {/* Brand Header */}
      <div className="text-center mb-6 space-y-2">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#80503a] text-white font-black text-2xl shadow-md">
          SB
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          ลงทะเบียนสาขาแฟรนไชส์
        </h1>
        <p className="text-xs text-slate-500">
          Super Black Coffee - เอกสารสัญญา & การยืนยันสิทธิ์สาขา
        </p>
      </div>

      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        {step === "form" && (
          <>
            <CardHeader className="space-y-1 pb-4 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                กรอกข้อมูลผู้ถือสิทธิ์แฟรนไชส์
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                ข้อมูลและใบสัญญาจะถูกส่งไปยังอีเมลบริษัทเพื่อตรวจสอบก่อนอนุมัติสิทธิ์เข้าใช้งาน
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="flex items-start gap-2.5 p-3 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* 1. ชื่อ-นามสกุล */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    ชื่อ-นามสกุล (ผู้ถือสัญญา) *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="เช่น สมชาย ใจดีมั่นคง"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                {/* 2. อีเมล */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    อีเมล (Email) *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="branch.somchai@superblack.co"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                {/* 3. รหัส & คอนเฟิร์มรหัส */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      รหัสผ่าน (Password) *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-9 text-xs h-9"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      ยืนยันรหัสผ่าน (Confirm Password) *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-9 text-xs h-9"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 4. ชื่อสาขา */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    ชื่อสาขาแฟรนไชส์ *
                  </label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="เช่น สาขา เซ็นทรัล ลาดพร้าว หรือ สาขา บางนา กม.4"
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                {/* 5. เบอร์โทร */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    เบอร์โทรศัพท์ติดต่อ *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <Input
                      type="tel"
                      placeholder="เช่น 089-123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9 text-xs h-9"
                      required
                    />
                  </div>
                </div>

                {/* 6. ใบสัญญาซื้อขายแฟรนไชส์ (บังคับแนบไฟล์) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs font-semibold text-slate-800 block">
                      ใบสัญญาซื้อขายแฟรนไชส์ (Franchise Agreement) *
                    </label>
                    <span className="text-[11px] text-red-600 font-medium">
                      * บังคับอัปโหลด
                    </span>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                      contractFileName
                        ? "border-emerald-500 bg-emerald-50/40"
                        : "border-slate-300 hover:border-[#80503a] hover:bg-slate-50"
                    }`}
                  >
                    {contractFileName ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-800">
                        <FileCheck className="h-5 w-5 text-emerald-600" />
                        <span className="text-xs font-semibold truncate max-w-xs">
                          {contractFileName}
                        </span>
                        <span className="text-[10px] text-emerald-600 underline ml-2">
                          เปลี่ยนไฟล์
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-[#80503a]">
                          <Upload className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-semibold text-slate-800">
                          คลิกเพื่ออัปโหลดใบสัญญาแฟรนไชส์
                        </p>
                        <p className="text-[11px] text-slate-400">
                          รองรับไฟล์ PDF, JPG, PNG ขนาดไม่เกิน 15 MB
                        </p>
                        <p className="text-[10px] text-amber-800 font-medium">
                          ⚠️ ถ้าไม่มีการอัปโหลดใบสัญญา จะไม่สามารถเข้าใช้งานระบบสั่งของได้
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#80503a] hover:bg-[#623d2e] h-10 text-sm font-semibold shadow-xs"
                  >
                    {loading ? "กำลังประมวลผล..." : "ลงทะเบียน & ขอรับรหัส OTP →"}
                  </Button>
                </div>
              </form>

              <div className="mt-5 pt-3 border-t border-slate-100 text-center text-xs text-slate-500">
                มีบัญชีสาขาอยู่แล้ว?{" "}
                <Link
                  href="/"
                  className="font-semibold text-[#80503a] hover:underline"
                >
                  เข้าสู่ระบบ (Login)
                </Link>
              </div>
            </CardContent>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {step === "otp" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-[#80503a]">
                <KeyRound className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                ยืนยันรหัส OTP (One-Time Password)
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                ระบบได้ส่งรหัส OTP 6 หลัก ไปยังเบอร์โทรศัพท์{" "}
                <span className="font-semibold text-slate-800">{phone}</span> และอีเมล{" "}
                <span className="font-semibold text-slate-800">{email}</span>
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-center space-y-1">
              <div className="text-[11px] text-amber-800">
                💡 รหัส OTP จำลองสำหรับทดสอบระบบคือ:
              </div>
              <div className="font-mono text-xl font-bold tracking-widest text-[#80503a]">
                {generatedOtp}
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {otpError && (
                <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl font-bold border-2 rounded-xl focus:border-[#80503a] focus:ring-2 focus:ring-[#80503a]/20 outline-none transition-all bg-white text-slate-900 border-slate-200"
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/3 text-xs"
                  onClick={() => setStep("form")}
                >
                  แก้ไขข้อมูล
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-[#80503a] hover:bg-[#623d2e] text-sm font-semibold shadow-xs"
                >
                  {loading ? "กำลังตรวจสอบ OTP..." : "ยืนยันรหัส & ส่งใบสัญญา"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Sent to Company Email & Waiting Approval Screen */}
        {step === "pending_email" && pendingUser && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Clock className="h-9 w-9 animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                ส่งใบสัญญาไปยังอีเมลบริษัทแล้ว!
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                ระบบได้ส่งข้อมูลการลงทะเบียนและไฟล์แนบ{" "}
                <span className="font-semibold text-slate-800">
                  [{pendingUser.contractFileUrl}]
                </span>{" "}
                ไปยังอีเมลบริษัท{" "}
                <span className="font-bold text-[#80503a]">
                  legal-franchise@superblackcoffee.com
                </span>{" "}
                เพื่อตรวจสอบความถูกต้องของสัญญาซื้อขายแฟรนไชส์เรียบร้อยแล้ว
              </p>
            </div>

            {/* Notification Card */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-semibold">
                <ShieldAlert className="h-4 w-4 text-amber-700" />
                <span>สถานะ: รอการอนุมัติสัญญา (Pending Contract Approval)</span>
              </div>
              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex justify-between">
                  <span>สาขาที่ยื่นขอ:</span>
                  <span className="font-medium text-slate-900">{pendingUser.branchName}</span>
                </div>
                <div className="flex justify-between">
                  <span>ผู้ถือสัญญา:</span>
                  <span className="font-medium text-slate-900">{pendingUser.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>อีเมลสาขา:</span>
                  <span className="font-medium text-slate-900">{pendingUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>เวลาที่ยื่นเรื่อง:</span>
                  <span className="font-medium text-slate-900">{pendingUser.submittedAt}</span>
                </div>
              </div>
              <p className="text-[11px] text-amber-800 pt-1 border-t border-amber-200/60">
                ⚠️ เจ้าหน้าที่ฝ่ายสัญญาของ Super Black Coffee จะตรวจเอกสารสัญญาภายใน 24 ชม. และแจ้งผลการอนุมัติสิทธิ์เข้าใช้งานกลับไปยังอีเมลของท่าน
              </p>
            </div>

            {/* Sandbox Simulation Tool */}
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">
                  🛠️ เครื่องมือทดสอบระบบ (Company Admin Simulator):
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                  โหมดทดสอบ
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                คลิกปุ่มด้านล่างเพื่อจำลองว่า "เจ้าหน้าที่บริษัทตรวจสัญญาผ่าน และกดอนุมัติสิทธิ์ให้สาขาเรียบร้อย"
              </p>
              <Button
                onClick={handleSimulateCompanyApproval}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9"
              >
                ✓ จำลองบริษัทอนุมัติสัญญา & เข้าสู่หน้าสั่งของทันที
              </Button>
            </div>

            <div className="pt-2 text-center">
              <Link href="/">
                <Button variant="outline" className="w-full text-xs">
                  กลับสู่หน้าหลัก / เข้าสู่ระบบ
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
