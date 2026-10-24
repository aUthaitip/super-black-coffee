"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Truck,
  Building2,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Upload,
  FileCheck,
  AlertCircle,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export default function CartCheckoutPage() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    createOrder,
    user,
    updateUserAddress,
  } = useStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Address fields (สาขาต้องเพิ่มที่อยู่การจัดส่งให้ครบถ้วน)
  const [addressDetails, setAddressDetails] = useState({
    streetAddress: user?.address || "",
    subdistrict: "ปทุมวัน",
    district: "ปทุมวัน",
    province: "กรุงเทพมหานคร",
    postalCode: "10330",
  });

  // Slip upload state
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipFileName, setSlipFileName] = useState("");
  const [slipPreviewUrl, setSlipPreviewUrl] = useState<string | null>(null);

  const [shippingNotes, setShippingNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedTotal, setCompletedTotal] = useState(0);
  const [orderSuccessId, setOrderSuccessId] = useState<string | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.07 * 100) / 100;
  const shippingFee = subtotal >= 5000 ? 0 : 250;
  const grandTotal = subtotal + tax + shippingFee;

  const handleSlipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSlipFile(file);
      setSlipFileName(file.name);
      setErrorMessage("");

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSlipPreviewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    if (!user) {
      router.push("/");
      return;
    }

    setErrorMessage("");

    // 1. ตรวจสอบที่อยู่การจัดส่งให้ครบถ้วน
    const fullShippingAddress =
      `${addressDetails.streetAddress} แขวง/ตำบล ${addressDetails.subdistrict} เขต/อำเภอ ${addressDetails.district} จังหวัด ${addressDetails.province} ${addressDetails.postalCode}`.trim();
    if (
      !addressDetails.streetAddress.trim() ||
      !addressDetails.postalCode.trim()
    ) {
      setErrorMessage(
        "กรุณากรอกที่อยู่จัดส่งหน้าร้านให้ครบถ้วน (เลขที่ อาคาร ถนน แขวง เขต รหัสไปรษณีย์)",
      );
      return;
    }

    // 2. ตรวจสอบสลิปการโอนเงิน (บังคับแนบสลิป)
    if (!slipFile && !slipFileName) {
      setErrorMessage(
        "กรุณาแนบภาพสลิปหลักฐานการโอนเงิน เพื่อส่งให้แอดมินตรวจสอบยอดจัดซื้อ",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Save updated address
      updateUserAddress(fullShippingAddress);

      const newOrder = await createOrder({
        paymentSlipUrl:
          slipPreviewUrl ||
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        paymentSlipName: slipFileName || "transfer_slip.jpg",
        shippingAddress: fullShippingAddress,
        shippingNotes,
      });

      setCompletedTotal(newOrder.grandTotal);
      setOrderSuccessId(newOrder.id);
    } catch (e: any) {
      console.error(e);
      setErrorMessage(
        e?.message ||
          "เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccessId) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-2xl font-medium text-slate-900">
              ส่งคำสั่งซื้อ & สลิปโอนเงินไปยังแอดมินแล้ว!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              สลิปการโอนและใบเสร็จคำสั่งซื้อได้ถูกส่งต่อไปยัง{" "}
              <span className="font-medium text-slate-800">
                แอดมินสำนักงานใหญ่
              </span>{" "}
              เรียบร้อยแล้ว เมื่อแอดมินตรวจสอบยอดเงิน จะกดยืนยันการจัดซื้อทันที
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-left text-xs space-y-2 border border-slate-200/80">
            <div className="flex justify-between">
              <span className="text-slate-500">สถานะคำสั่งซื้อ:</span>
              <span className="font-medium text-amber-700 flex items-center gap-1">
                <Clock className="h-3 w-3" /> รอแอดมินตรวจสอบสลิปโอนเงิน
                (Pending Review)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ยอดเงินที่โอน:</span>
              <span className="font-medium text-slate-900 text-sm">
                ฿{completedTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">หลักฐานสลิป:</span>
              <span className="font-mono text-emerald-700 font-medium">
                {slipFileName || "transfer_slip.jpg"}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200/60">
              <span className="text-slate-500">ส่งไปยัง:</span>
              <span className="font-medium text-slate-800">
                ฝ่ายขายและบัญชี บจก. ซูเปอร์ แบล็ค คอฟฟี่
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1 bg-[#80503a] hover:bg-[#623d2e]"
              onClick={() => router.push(`/orders/${orderSuccessId}`)}
            >
              ดูใบเสร็จ & การยืนยันของแอดมิน
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/store")}
            >
              กลับหน้ารายการสินค้า
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <Truck className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-medium text-slate-800">
          ไม่มีสินค้าในตะกร้า
        </h2>
        <p className="text-sm text-slate-500">
          คุณยังไม่ได้เลือกวัตถุดิบหรือสินค้าสำหรับสาขา
          กรุณาเลือกสินค้าที่ต้องการสั่ง
        </p>
        <Link href="/store" className={buttonVariants({ className: "mt-2" })}>
          <ArrowLeft className="h-4 w-4 mr-2" /> ไปเลือกสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/store"
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "gap-1",
            })}
          >
            <ArrowLeft className="h-4 w-4" /> เลือกสินค้าเพิ่ม
          </Link>
          <h1 className="text-xl font-medium text-slate-900">
            ตะกร้าสั่งซื้อสินค้าแฟรนไชส์
          </h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
          onClick={clearCart}
        >
          ล้างตะกร้า
        </Button>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Items & Shipping Address Form */}
        <div className="lg:col-span-7 space-y-4">
          {/* Cart Item List */}
          <Card>
            <CardHeader className="py-4 px-6 border-b border-slate-100">
              <CardTitle className="text-base font-medium text-slate-800">
                รายการสินค้าที่สั่ง ({cart.length} ชนิด)
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-slate-100 p-0">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-5 flex flex-col xl:flex-row gap-4 xl:items-center justify-between"
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-16 w-16 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-slate-400">
                        {item.product.sku}
                      </div>
                      <h4 className="text-sm font-medium text-slate-900 break-words">
                        {item.product.name}
                      </h4>
                      <div className="text-xs text-[#80503a] font-medium mt-0.5">
                        ฿{item.product.price.toLocaleString()} /{" "}
                        {item.product.unit}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 shrink-0">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`ลดจำนวน ${item.product.name}`}
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity <= (item.product.minOrder || 1)
                              ? 0
                              : item.quantity - 1,
                          )
                        }
                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 text-xs"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-xs font-medium text-slate-800">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`เพิ่มจำนวน ${item.product.name}`}
                        disabled={item.quantity >= item.product.stockQuantity}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-100 text-xs"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right w-20">
                      <div className="text-sm font-medium text-slate-900">
                        ฿{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`ลบ ${item.product.name}`}
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Complete Shipping Address Form */}
          <Card>
            <CardHeader className="py-4 px-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#80503a]" />
                  ที่อยู่สำหรับจัดส่งสินค้าหน้าร้าน (ระบุให้ครบถ้วน) *
                </CardTitle>
                <span className="text-[11px] text-red-600 font-medium">
                  * บังคับ
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 block mb-1 font-medium">
                    ชื่อสาขา:
                  </label>
                  <p className="font-medium text-slate-900 text-sm bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    {user?.branchName}
                  </p>
                </div>
                <div>
                  <label className="text-slate-600 block mb-1 font-medium">
                    ผู้รับของ / เบอร์โทร:
                  </label>
                  <p className="font-medium text-slate-900 text-sm bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                    {user?.fullName} ({user?.phone})
                  </p>
                </div>
              </div>

              {/* Street / Building Address */}
              <div className="space-y-1">
                <label className="text-slate-700 block font-medium">
                  เลขที่ตั้งสาขา, อาคาร, ชั้น, ซอย, ถนน *
                </label>
                <textarea
                  rows={2}
                  value={addressDetails.streetAddress}
                  onChange={(e) =>
                    setAddressDetails({
                      ...addressDetails,
                      streetAddress: e.target.value,
                    })
                  }
                  placeholder="เช่น 388 อาคารสยามสแควร์วัน ชั้น 2 ห้อง 204 ถนนพระราม 1"
                  className="w-full rounded-md border border-slate-200 bg-white p-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80503a]"
                  required
                />
              </div>

              {/* Sub-district, District, Province, Postal Code */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="space-y-1">
                  <label className="text-slate-600 block font-medium">
                    แขวง / ตำบล *
                  </label>
                  <Input
                    value={addressDetails.subdistrict}
                    onChange={(e) =>
                      setAddressDetails({
                        ...addressDetails,
                        subdistrict: e.target.value,
                      })
                    }
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 block font-medium">
                    เขต / อำเภอ *
                  </label>
                  <Input
                    value={addressDetails.district}
                    onChange={(e) =>
                      setAddressDetails({
                        ...addressDetails,
                        district: e.target.value,
                      })
                    }
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 block font-medium">
                    จังหวัด *
                  </label>
                  <Input
                    value={addressDetails.province}
                    onChange={(e) =>
                      setAddressDetails({
                        ...addressDetails,
                        province: e.target.value,
                      })
                    }
                    className="h-8 text-xs"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-600 block font-medium">
                    รหัสไปรษณีย์ *
                  </label>
                  <Input
                    value={addressDetails.postalCode}
                    onChange={(e) =>
                      setAddressDetails({
                        ...addressDetails,
                        postalCode: e.target.value,
                      })
                    }
                    className="h-8 text-xs font-mono font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="text-slate-600 block mb-1 font-medium">
                  หมายเหตุเพิ่มเติมถึงฝ่ายจัดส่ง / แอดมิน:
                </label>
                <Input
                  value={shippingNotes}
                  onChange={(e) => setShippingNotes(e.target.value)}
                  placeholder="เช่น มาส่งช่วงก่อนร้านเปิด 09:30 น., ให้โทรหาผู้จัดการสาขา..."
                  className="text-xs h-8"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Bank Transfer & Slip Attachment */}
        <div className="lg:col-span-5 space-y-4">
          {/* Company Bank Account & Slip Upload */}
          <Card>
            <CardHeader className="py-4 px-6 border-b border-slate-100">
              <CardTitle className="text-base font-medium text-slate-800 flex items-center gap-2">
                <QrCode className="h-4 w-4 text-[#80503a]" />
                โอนเงินเข้าบัญชีบริษัท & แนบสลิป
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {/* Bank Account Info */}
              <div className="p-4 rounded-xl border border-[#80503a] bg-amber-50/40 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-emerald-600 text-white flex items-center justify-center font-medium text-xs">
                    K
                  </div>
                  <span className="text-xs font-medium text-slate-900">
                    ธนาคารกสิกรไทย (KBANK)
                  </span>
                </div>
                <div className="text-xs text-slate-700 space-y-0.5 pl-8">
                  <p>
                    ชื่อบัญชี:{" "}
                    <span className="font-medium">
                      บจก. ซูเปอร์ แบล็ค คอฟฟี่
                    </span>
                  </p>
                  <p className="font-mono font-medium text-[#80503a] text-sm tracking-wider">
                    เลขที่บัญชี: 012-3-45678-9
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ยอดที่ต้องโอน:{" "}
                    <span className="font-medium text-slate-900">
                      ฿{grandTotal.toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>

              {/* Upload Slip Box (Mandatory) */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-medium text-slate-800">
                    แนบสลิปหลักฐานการโอนเงิน *
                  </label>
                  <span className="text-[11px] text-red-600 font-medium">
                    * ส่งให้แอดมินตรวจ
                  </span>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleSlipChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                    slipFileName
                      ? "border-emerald-500 bg-emerald-50/40"
                      : "border-slate-300 hover:border-[#80503a] hover:bg-slate-50"
                  }`}
                >
                  {slipFileName ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2 text-emerald-800">
                        <FileCheck className="h-5 w-5 text-emerald-600" />
                        <span className="text-xs font-medium truncate max-w-xs">
                          {slipFileName}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-600 underline">
                        คลิกเพื่อเปลี่ยนรูปสลิป
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-[#80503a]">
                        <Upload className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-medium text-slate-800">
                        คลิกเพื่อแนบสลิปการโอนเงิน (Slip)
                      </p>
                      <p className="text-[10px] text-slate-400">
                        รองรับไฟล์ JPG, PNG, PDF ขนาดไม่เกิน 10 MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Breakdown */}
          <Card>
            <CardHeader className="py-4 px-6 border-b border-slate-100">
              <CardTitle className="text-base font-medium text-slate-800">
                สรุปยอดคำสั่งซื้อ
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>ราคาสินค้ารวม (Subtotal)</span>
                <span>฿{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ภาษีมูลค่าเพิ่ม VAT 7%</span>
                <span>฿{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 items-center">
                <span>ค่าจัดส่งสินค้า B2B</span>
                {shippingFee === 0 ? (
                  <span className="text-xs font-medium text-emerald-600">
                    ส่งฟรี (ครบ 5,000 บ.)
                  </span>
                ) : (
                  <span>฿{shippingFee}</span>
                )}
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                <span className="font-medium text-slate-900 text-base">
                  ยอดรวมสุทธิ
                </span>
                <div className="text-right">
                  <div className="text-2xl font-medium text-[#80503a]">
                    ฿{grandTotal.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    รวมภาษีมูลค่าเพิ่มแล้ว
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full h-12 text-sm sm:text-base font-medium bg-[#80503a] hover:bg-[#623d2e] shadow-md gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? (
                    "กำลังส่งข้อมูลสลิปและออเดอร์ไปยังแอดมิน..."
                  ) : (
                    <>ส่งสลิป & ยืนยันคำสั่งซื้อไปยังแอดมิน</>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>แอดมินจะตรวจสลิปและกดยืนยันการจัดซื้อทันที</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
