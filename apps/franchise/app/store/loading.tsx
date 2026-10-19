import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function StoreLoading() {
  return (
    <PageLoader
      title="คลังสินค้าแฟรนไชส์ B2B"
      subtitle="กำลังโหลดรายการสินค้าและสต็อกล่าสุด..."
      theme="coffee"
    />
  );
}
