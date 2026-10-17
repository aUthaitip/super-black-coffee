"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { OrderStatus } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle,
  Truck,
  FileText,
  AlertCircle,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

export default function OrderListPage() {
  const { orders } = useStore();

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" /> รอเซลล์ตรวจสอบ
          </Badge>
        );
      case "approved_processing":
        return (
          <Badge variant="info" className="gap-1">
            <CheckCircle className="h-3 w-3" /> เซลล์อนุมัติแล้ว / กำลังแพ็ก
          </Badge>
        );
      case "shipped":
        return (
          <Badge variant="success" className="gap-1">
            <Truck className="h-3 w-3" /> กำลังจัดส่ง
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="secondary" className="gap-1">
            <CheckCircle className="h-3 w-3" /> จัดส่งสำเร็จ
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" /> ยกเลิกคำสั่งซื้อ
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            ประวัติคำสั่งซื้อ & สถานะการจัดส่ง
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ติดตามสถานะการตรวจสอบยอดโดยเซลล์ และดาวน์โหลดใบเสร็จ / ใบส่งสินค้า
          </p>
        </div>
        <Link href="/">
          <Button className="bg-[#80503a] hover:bg-[#623d2e] text-xs">
            <ShoppingBag className="h-4 w-4 mr-1" /> สั่งสินค้าใหม่
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="hover:border-slate-300 transition-all hover:shadow-xs overflow-hidden"
          >
            <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {order.orderNumber}
                  </span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-xs text-slate-400">
                  วันที่สั่งซื้อ: {order.createdAt}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">ยอดรวมสุทธิ</div>
                  <div className="text-lg font-bold text-[#80503a]">
                    ฿{order.grandTotal.toLocaleString()}
                  </div>
                </div>
                <Link href={`/orders/${order.id}`}>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4 text-[#80503a]" />
                    <span>ดูใบเสร็จ / รายละเอียด</span>
                    <ChevronRight className="h-4 w-4 ml-0.5" />
                  </Button>
                </Link>
              </div>
            </div>

            <CardContent className="p-5 text-xs text-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    รายการสินค้า ({order.items.length} รายการ):
                  </span>
                  <ul className="space-y-0.5 text-slate-500">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="truncate">
                        • {item.productName} ({item.quantity} {item.unit})
                      </li>
                    ))}
                    {order.items.length > 2 && (
                      <li className="text-slate-400 italic">
                        และอีก {order.items.length - 2} รายการ...
                      </li>
                    )}
                  </ul>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    การชำระเงิน:
                  </span>
                  <p>โอนเงินเข้าบัญชีบริษัท (สลิปแนบแล้ว)</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-700 block mb-1">
                    ข้อมูลการจัดส่ง / โน้ตจากเซลล์:
                  </span>
                  {order.trackingNumber ? (
                    <div className="text-emerald-700 font-medium">
                      🚚 {order.deliveryCarrier} : {order.trackingNumber}
                    </div>
                  ) : (
                    <p className="text-slate-400">{order.salesNotes}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
