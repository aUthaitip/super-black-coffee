import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <PageLoader
        title="ระบบจัดการส่วนกลาง (Admin บริษัท)"
        subtitle="กำลังโหลดข้อมูลแดชบอร์ดและคำสั่งซื้อ..."
        theme="coffee"
      />
    </div>
  );
}
