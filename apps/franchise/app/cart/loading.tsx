import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function CartLoading() {
  return (
    <PageLoader
      title="ตะกร้าสั่งซื้อสินค้าแฟรนไชส์"
      subtitle="กำลังเตรียมข้อมูลการจัดส่งและสรุปยอด..."
      theme="coffee"
    />
  );
}
