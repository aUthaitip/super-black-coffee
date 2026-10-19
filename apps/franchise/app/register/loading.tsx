import React from "react";
import { PageLoader } from "@/components/ui/page-loader";

export default function RegisterLoading() {
  return (
    <PageLoader
      title="ลงทะเบียนสาขาแฟรนไชส์"
      subtitle="กำลังโหลดแบบฟอร์มสมัครแฟรนไชส์..."
      theme="coffee"
    />
  );
}
