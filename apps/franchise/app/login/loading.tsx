import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function LoginLoading() {
  return (
    <PageLoader
      title="เข้าสู่ระบบแฟรนไชส์"
      subtitle="กำลังเตรียมหน้าลงชื่อเข้าใช้..."
      theme="coffee"
    />
  );
}
