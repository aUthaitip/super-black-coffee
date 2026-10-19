import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function OrdersLoading() {
  return (
    <PageLoader
      title="ประวัติและสถานะคำสั่งซื้อ"
      subtitle="กำลังโหลดข้อมูลคำสั่งซื้อและการจัดส่ง..."
      theme="coffee"
    />
  );
}
