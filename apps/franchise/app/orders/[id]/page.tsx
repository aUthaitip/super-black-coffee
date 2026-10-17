"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useStore } from "@/lib/store-context";
import { OrderStatus } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Printer,
  Truck,
  Building2,
  Clock,
  CheckCircle,
  FileCheck,
  AlertCircle,
  PackageCheck,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { getOrderById, confirmOrderPayment } = useStore();
  const order = getOrderById(resolvedParams.id);
  const [showSlipModal, setShowSlipModal] = useState(false);

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">ไม่พบคำสั่งซื้อนี้</h2>
        <Link href="/orders">
          <Button variant="outline" className="mt-4">
            กลับหน้ารายการ
          </Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    {
      title: "ส่งคำสั่งซื้อ & สลิปแล้ว",
      desc: "ระบบส่งสลิปและใบสั่งซื้อไปยังแอดมิน",
      done: true,
      time: order.createdAt,
    },
    {
      title: "แอดมินตรวจสลิป & ยืนยันการจัดซื้อ",
      desc:
        order.status === "pending_review"
          ? "แอดมินกำลังตรวจสอบความถูกต้องของสลิป"
          : order.confirmedAt
          ? `ยืนยันแล้วเมื่อ ${order.confirmedAt} (${order.confirmedBy || "แอดมิน"})`
          : "ยืนยันการจัดซื้อเรียบร้อย",
      done: order.status !== "pending_review",
      time: order.status !== "pending_review" ? "ยืนยันจัดซื้อแล้ว" : "รอแอดมินตรวจสอบ",
    },
    {
      title: "คลังแพ็กและจัดส่ง",
      desc: order.trackingNumber
        ? `${order.deliveryCarrier} : ${order.trackingNumber}`
        : "เตรียมจัดส่งสินค้า",
      done: order.status === "shipped" || order.status === "delivered",
      time: order.trackingNumber || "รอจัดส่ง",
    },
    {
      title: "สาขาได้รับสินค้า",
      desc: "ตรวจรับสินค้าพร้อมใบเสร็จรับเงิน",
      done: order.status === "delivered",
      time: order.status === "delivered" ? "เรียบร้อย" : "-",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Action Bar (Hide when printing) */}
      <div className="flex items-center justify-between print:hidden">
        <Link href="/orders">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> ประวัติคำสั่งซื้อ
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          {order.paymentSlipUrl && (
            <Button
              onClick={() => setShowSlipModal(true)}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs text-slate-700"
            >
              <FileCheck className="h-4 w-4 text-emerald-600" /> ดูสลิปที่ส่งให้แอดมิน
            </Button>
          )}
          <Button onClick={handlePrint} variant="outline" size="sm" className="gap-1">
            <Printer className="h-4 w-4" /> พิมพ์ใบเสร็จ / ใบส่งของ
          </Button>
        </div>
      </div>

      {/* Slip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-emerald-600" /> หลักฐานสลิปโอนเงินที่ส่งไปยังแอดมิน
              </h3>
              <button
                onClick={() => setShowSlipModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center p-2">
              <img
                src={order.paymentSlipUrl}
                alt="Payment Slip"
                className="max-h-80 w-auto rounded-lg object-contain shadow-xs"
              />
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>คำสั่งซื้อ: <span className="font-mono font-bold text-slate-800">{order.orderNumber}</span></p>
              <p>ยอดที่โอน: <span className="font-bold text-[#80503a]">฿{order.grandTotal.toLocaleString()}</span></p>
            </div>
            <Button
              onClick={() => setShowSlipModal(false)}
              className="w-full text-xs bg-slate-900 hover:bg-slate-800"
            >
              ปิดหน้าต่าง
            </Button>
          </div>
        </div>
      )}

      {/* Status Timeline Tracking Card (Hide when printing) */}
      <Card className="print:hidden border-slate-200 shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              สถานะคำสั่งซื้อ:
            </span>
            {order.status === "pending_review" && (
              <Badge variant="warning">🟡 รอแอดมินตรวจสอบสลิป</Badge>
            )}
            {order.status === "approved_processing" && (
              <Badge variant="info">🔵 แอดมินยืนยันการจัดซื้อแล้ว / กำลังแพ็กของ</Badge>
            )}
            {order.status === "shipped" && (
              <Badge variant="success">🚚 กำลังจัดส่ง ({order.trackingNumber})</Badge>
            )}
            {order.status === "delivered" && (
              <Badge variant="secondary">🟢 ได้รับสินค้าเรียบร้อยแล้ว</Badge>
            )}
          </div>
          <span className="text-xs font-mono text-slate-400">
            {order.orderNumber}
          </span>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {steps.map((st, index) => (
              <div key={index} className="relative space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      st.done
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {st.done ? "✓" : index + 1}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      st.done ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {st.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 pl-8">{st.desc}</p>
                <div className="text-[10px] text-slate-400 pl-8">{st.time}</div>
              </div>
            ))}
          </div>

          {order.salesNotes && (
            <div className="mt-5 p-3 rounded-lg bg-amber-50 border border-amber-200/60 text-xs text-amber-900">
              <span className="font-bold">โน้ตจากฝ่ายขาย/แอดมิน: </span>
              {order.salesNotes}
            </div>
          )}

          {/* Admin Simulation Simulator */}
          {order.status === "pending_review" && (
            <div className="mt-5 p-4 rounded-xl bg-slate-900 text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
                <span>🛠️ โหมดทดสอบสำหรับแอดมิน (Admin Simulator):</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                  สลิปและใบเสร็จส่งถึงแอดมินแล้ว
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                คลิกปุ่มด้านล่างเพื่อจำลองว่า "แอดมินได้รับสลิป ตรวจสอบยอดเงินโอนถูกต้อง และกดยืนยันการจัดซื้อทันที"
              </p>
              <Button
                onClick={() => confirmOrderPayment(order.id, "แอดมินฝ่ายบัญชีและการขาย")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold h-9 gap-1.5"
              >
                <CheckCircle className="h-4 w-4" /> แอดมินตรวจสอบสลิปถูกต้อง & ยืนยันการจัดซื้อทันที
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Official Receipt / Tax Invoice Component (Printable) */}
      <div className="bg-white p-8 sm:p-10 rounded-xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-[#80503a] text-white flex items-center justify-center font-black text-sm">
                SB
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                SUPER BLACK COFFEE CO., LTD.
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              บริษัท ซูเปอร์ แบล็ค คอฟฟี่ จำกัด (สำนักงานใหญ่)<br />
              เลขประจำตัวผู้เสียภาษี: 0105565012345<br />
              123/45 ถนนสาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120<br />
              โทร: 02-123-4567 | อีเมล: sales@superblackcoffee.com
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-800 tracking-wider uppercase">
              ใบเสร็จสั่งของ / ใบส่งสินค้า (B2B)
            </span>
            <div className="text-sm font-mono font-bold text-slate-900">
              เลขที่: {order.orderNumber}
            </div>
            <div className="text-xs text-slate-500">
              วันที่สั่ง: {order.createdAt}
            </div>
            <div className="text-xs text-slate-500">
              เงื่อนไขการชำระ: โอนชำระเงินสด / แนบสลิป (Cash Transfer)
            </div>
            {order.confirmedAt && (
              <div className="text-xs text-emerald-700 font-semibold pt-0.5">
                ✓ แอดมินยืนยันยอดจัดซื้อแล้ว ({order.confirmedAt})
              </div>
            )}
          </div>
        </div>

        {/* Customer & Branch Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider block">
              ข้อมูลสาขาแฟรนไชส์ (ผู้สั่งซื้อ):
            </span>
            <p className="font-semibold text-slate-900 text-sm">
              {order.branchName} ({order.branchCode})
            </p>
            <p className="text-slate-600">ผู้สั่ง: {order.contactName}</p>
            <p className="text-slate-600">เบอร์โทรติดต่อ: {order.phone}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider block">
              สถานที่จัดส่งสินค้า (ที่อยู่ครบถ้วน):
            </span>
            <p className="text-slate-700 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              {order.shippingAddress}
            </p>
            {order.trackingNumber && (
              <p className="text-emerald-700 font-semibold pt-1">
                ขนส่ง: {order.deliveryCarrier} (Tracking: {order.trackingNumber})
              </p>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="py-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
                <th className="pb-3 w-10">ลำดับ</th>
                <th className="pb-3">รหัสสินค้า / รายการ</th>
                <th className="pb-3 text-right">จำนวน</th>
                <th className="pb-3 text-right">ราคาต่อหน่วย</th>
                <th className="pb-3 text-right">จำนวนเงิน (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 text-slate-400">{index + 1}</td>
                  <td className="py-3">
                    <span className="font-mono text-[10px] text-slate-400 block">
                      {item.sku}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {item.productName}
                    </span>
                  </td>
                  <td className="py-3 text-right text-slate-700 font-medium">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 text-right text-slate-700">
                    ฿{item.price.toLocaleString()}
                  </td>
                  <td className="py-3 text-right font-bold text-slate-900">
                    ฿{item.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="text-xs text-slate-400 max-w-xs space-y-1">
            <p className="font-semibold text-slate-600">ข้อกำหนดและเงื่อนไข:</p>
            <p>
              กรุณาตรวจนับสินค้าให้ถูกต้องครบถ้วนตามใบส่งของนี้ทันทีที่ได้รับ หากสินค้าชำรุดเสียหาย โปรดแจ้งฝ่ายขายภายใน 24 ชม.
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>ราคารวมทั้งสิ้น (Subtotal):</span>
              <span>฿{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ภาษีมูลค่าเพิ่ม 7% (VAT):</span>
              <span>฿{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ค่าขนส่ง (Shipping):</span>
              <span>
                {order.shippingFee === 0 ? "ฟรี" : `฿${order.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
              <span>ยอดเงินสุทธิ:</span>
              <span className="text-base text-[#80503a]">
                ฿{order.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Signatures for Receipt */}
        <div className="grid grid-cols-2 gap-8 pt-16 text-center text-xs text-slate-500">
          <div className="space-y-10">
            <div className="border-b border-slate-300 w-48 mx-auto" />
            <div>
              <p className="font-semibold text-slate-800">ผู้สั่งซื้อ / ผู้รับสินค้า</p>
              <p className="text-[10px] text-slate-400">วันที่: ......./......./.......</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="border-b border-slate-300 w-48 mx-auto" />
            <div>
              <p className="font-semibold text-slate-800">
                ผู้จัดส่ง / ฝ่ายขาย บจก. ซูเปอร์ แบล็ค คอฟฟี่
              </p>
              <p className="text-[10px] text-slate-400">
                {order.confirmedBy ? `ผู้ตรวจรับรอง: ${order.confirmedBy}` : "วันที่: ......./......./......."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
