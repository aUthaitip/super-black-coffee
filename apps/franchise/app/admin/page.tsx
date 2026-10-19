"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LogoutConfirmModal } from "@/components/ui/logout-confirm-modal";
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertCircle,
  ShoppingBag,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Truck,
  ExternalLink,
  LogOut,
  FileText,
  Search,
  Eye,
  Check,
  PackageCheck,
  RefreshCw,
  Trash2,
  Download,
} from "lucide-react";

export default function AdminPage() {
  const {
    adminUser,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    orders,
    confirmOrderPayment,
    updateOrderStatus,
    registeredBranches,
    approveBranch,
    rejectBranch,
    clearAllData,
    refreshData,
  } = useStore();

  // Auto-refresh data every 5 seconds when admin dashboard is open
  React.useEffect(() => {
    if (!isAdminLoggedIn) return;
    refreshData();
    const interval = setInterval(() => {
      refreshData();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAdminLoggedIn]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Login Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<"orders" | "branches">("orders");

  // Orders Filter & Modal
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [orderSearch, setOrderSearch] = useState<string>("");
  const [selectedSlipUrl, setSelectedSlipUrl] = useState<string | null>(null);

  // Tracking Dispatch Modal State
  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState<string>("Flash Express B2B Bulk");
  const [trackingInput, setTrackingInput] = useState<string>("");

  // Branch Filter
  const [branchFilter, setBranchFilter] = useState<string>("all");

  // Inspect Branch Contract Modal State
  const [inspectingBranch, setInspectingBranch] = useState<any | null>(null);

  // Admin Logout Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = adminLogin(email, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || "อีเมลหรือรหัสผ่านผู้ดูแลระบบไม่ถูกต้อง");
      }
    }, 350);
  };

  const handleDispatchOrder = (orderId: string) => {
    if (!trackingInput.trim()) {
      alert("กรุณากรอกหมายเลขพัสดุ (Tracking Number)");
      return;
    }
    updateOrderStatus(orderId, "shipped", trackingInput.trim(), carrierInput.trim());
    setShippingOrderId(null);
    setTrackingInput("");
  };

  // -------------------------------------------------------------
  // VIEW 1: ADMIN LOGIN PAGE (WHITE & ORANGE THEME)
  // -------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50/60 via-white to-orange-50/40 text-slate-900 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Brand */}
          <div className="text-center space-y-3">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white font-black text-2xl shadow-lg shadow-orange-600/20 ring-4 ring-orange-100">
              <ShieldCheck className="h-9 w-9" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                ระบบจัดการส่วนกลาง (Admin บริษัท)
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Super Black Coffee Co., Ltd. - สำนักงานใหญ่
              </p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-orange-100 bg-white text-slate-900 shadow-xl shadow-orange-950/5 rounded-2xl">
            <CardHeader className="space-y-1 pb-4 border-b border-slate-100">
              <CardTitle className="text-base font-semibold text-slate-900">
                ลงชื่อเข้าใช้ระบบแอดมิน
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                เข้าถึงระบบอนุมัติสาขาแฟรนไชส์ ตรวจสอบสลิปคำสั่งซื้อ และจัดการคลัง
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-5">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 text-xs rounded-lg bg-red-50 text-red-700 border border-red-200">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 block">
                    อีเมลแอดมินบริษัท (Admin Email)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="Admin@rbc.co.th"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-9 text-xs h-10 bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 block">
                    รหัสผ่าน (Password)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 text-xs h-10 bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white h-10 text-sm font-semibold shadow-md shadow-orange-600/20 transition-colors"
                >
                  {loading ? "กำลังตรวจสอบสิทธิ์..." : "เข้าสู่ระบบแอดมินบริษัท"}
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                ต้องการเข้าสู่หน้าร้านสำหรับแฟรนไชส์?{" "}
                <Link href="/" className="font-semibold text-orange-600 hover:underline">
                  เข้าสู่หน้าสาขา (Franchise Portal)
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ADMIN LOGGED-IN DASHBOARD (WHITE & ORANGE THEME)
  // -------------------------------------------------------------
  const pendingOrders = orders.filter((o) => o.status === "pending_review");
  const pendingBranches = registeredBranches.filter((b) => b.approvalStatus === "pending_approval");
  const totalRevenue = orders.reduce((sum, o) => sum + o.grandTotal, 0);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderFilter === "all" || o.status === orderFilter;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.branchName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.contactName.toLowerCase().includes(orderSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredBranches = registeredBranches.filter((b) => {
    if (branchFilter === "all") return true;
    return b.approvalStatus === branchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur px-3 xs:px-4 sm:px-6 4k:px-12 py-3 sm:py-3.5 4k:py-6 shadow-xs">
        <div className="max-w-7xl 4k:max-w-[2400px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-8 w-8 xs:h-9 xs:w-9 4k:h-12 4k:w-12 items-center justify-center rounded-xl bg-[#80503a] text-white font-black text-base xs:text-lg 4k:text-2xl shadow-sm shrink-0">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-tight text-sm xs:text-base sm:text-lg 4k:text-2xl">
                  SUPER BLACK COFFEE
                </span>
              </div>
              <p className="text-[10px] xs:text-[11px] 4k:text-sm text-slate-500 hidden sm:block">
                ระบบจัดการส่วนกลางสำหรับสำนักงานใหญ่ | อนุมัติสลิป & สาขาแฟรนไชส์
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5">
            {/* Refresh Data button */}
            <button
              onClick={handleManualRefresh}
              title="รีเฟรชข้อมูลล่าสุด"
              className="flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs 4k:text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 4k:h-4 4k:w-4 text-slate-500 ${isRefreshing ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">รีเฟรช</span>
            </button>

            {/* Sanity Studio Direct Link */}
            <Link
              href="/studio"
              className="flex items-center gap-1.5 px-2.5 xs:px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-xs 4k:text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 4k:h-4 4k:w-4 text-slate-500" />
              <span className="hidden xs:inline">Sanity Studio (จัดการสต็อก)</span>
              <span className="xs:hidden">Studio</span>
            </Link>

            {/* Admin Info & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs 4k:text-sm font-semibold text-slate-800 font-mono">{adminUser?.email}</div>
                <div className="text-[10px] 4k:text-xs text-emerald-600 font-medium">● กำลังปฏิบัติงาน (Online)</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogoutModal(true)}
                className="text-xs 4k:text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 gap-1.5 p-2 sm:px-3"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">ออกจากระบบ</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl 4k:max-w-[2400px] mx-auto w-full px-3 xs:px-4 sm:px-6 4k:px-12 py-4 sm:py-6 4k:py-10 space-y-5 sm:space-y-6 4k:space-y-8">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 4k:grid-cols-4 gap-3 sm:gap-4 4k:gap-6">
          <Card className="bg-white border-slate-200 text-slate-900 shadow-xs hover:border-amber-200 transition-colors">
            <CardContent className="p-4 4k:p-6 flex items-center justify-between">
              <div>
                <p className="text-xs 4k:text-sm text-slate-500 font-medium">รอตรวจสอบสลิปโอนเงิน</p>
                <h3 className="text-xl xs:text-2xl 4k:text-3xl font-bold text-amber-700 mt-1">
                  {pendingOrders.length} รายการ
                </h3>
                <p className="text-[11px] 4k:text-xs text-slate-400 mt-0.5">ต้องตรวจและกดยืนยัน</p>
              </div>
              <div className="h-10 w-10 4k:h-14 4k:w-14 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 4k:h-7 4k:w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 text-slate-900 shadow-xs hover:border-amber-200 transition-colors">
            <CardContent className="p-4 4k:p-6 flex items-center justify-between">
              <div>
                <p className="text-xs 4k:text-sm text-slate-500 font-medium">สาขาใหม่รออนุมัติสัญญา</p>
                <h3 className="text-xl xs:text-2xl 4k:text-3xl font-bold text-amber-700 mt-1">
                  {pendingBranches.length} สาขา
                </h3>
                <p className="text-[11px] 4k:text-xs text-slate-400 mt-0.5">แนบสัญญาซื้อขายรอตรวจ</p>
              </div>
              <div className="h-10 w-10 4k:h-14 4k:w-14 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                <Building2 className="h-5 w-5 4k:h-7 4k:w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 text-slate-900 shadow-xs hover:border-slate-300 transition-colors">
            <CardContent className="p-4 4k:p-6 flex items-center justify-between">
              <div>
                <p className="text-xs 4k:text-sm text-slate-500 font-medium">คำสั่งซื้อสะสมทั้งหมด</p>
                <h3 className="text-xl xs:text-2xl 4k:text-3xl font-bold text-slate-900 mt-1">{orders.length} ออเดอร์</h3>
                <p className="text-[11px] 4k:text-xs text-slate-400 mt-0.5">จากทุกสาขาแฟรนไชส์</p>
              </div>
              <div className="h-10 w-10 4k:h-14 4k:w-14 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                <ShoppingBag className="h-5 w-5 4k:h-7 4k:w-7" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 text-slate-900 shadow-xs hover:border-emerald-200 transition-colors">
            <CardContent className="p-4 4k:p-6 flex items-center justify-between">
              <div>
                <p className="text-xs 4k:text-sm text-slate-500 font-medium">ยอดคำสั่งซื้อรวม (B2B)</p>
                <h3 className="text-xl xs:text-2xl 4k:text-3xl font-bold text-emerald-600 mt-1">
                  ฿{totalRevenue.toLocaleString()}
                </h3>
                <p className="text-[11px] 4k:text-xs text-slate-400 mt-0.5">มูลค่าการสั่งซื้อทั้งหมด</p>
              </div>
              <div className="h-10 w-10 4k:h-14 4k:w-14 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
                <PackageCheck className="h-5 w-5 4k:h-7 4k:w-7" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 space-x-1 xs:space-x-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2.5 sm:pb-3 px-2.5 xs:px-4 text-xs xs:text-sm 4k:text-base font-semibold flex items-center gap-1.5 xs:gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "orders"
                ? "border-amber-700 text-amber-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />
            <span>จัดการคำสั่งซื้อ & ตรวจสลิป</span>
            {pendingOrders.length > 0 && (
              <Badge className="bg-amber-700 text-white text-[10px] 4k:text-xs h-5 px-1.5 shrink-0">
                {pendingOrders.length}
              </Badge>
            )}
          </button>

          <button
            onClick={() => setActiveTab("branches")}
            className={`pb-2.5 sm:pb-3 px-2.5 xs:px-4 text-xs xs:text-sm 4k:text-base font-semibold flex items-center gap-1.5 xs:gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "branches"
                ? "border-amber-700 text-amber-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            <span>ตรวจสอบและอนุมัติสาขาแฟรนไชส์</span>
            {pendingBranches.length > 0 && (
              <Badge className="bg-amber-700 text-white text-[10px] 4k:text-xs h-5 px-1.5 shrink-0">
                {pendingBranches.length}
              </Badge>
            )}
          </button>
        </div>

        {/* -------------------------------------------------------- */}
        {/* TAB 1: ORDERS MANAGEMENT */}
        {/* -------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex overflow-x-auto pb-1 gap-2">
                {[
                  { id: "all", label: "ทั้งหมด" },
                  { id: "pending_review", label: `รอตรวจสอบสลิป (${pendingOrders.length})` },
                  { id: "approved_processing", label: "เตรียมจัดส่ง" },
                  { id: "shipped", label: "จัดส่งแล้ว" },
                  { id: "delivered", label: "สำเร็จ" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setOrderFilter(f.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      orderFilter === f.id
                        ? "bg-amber-700 text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="ค้นหาเลขออเดอร์, สาขา, ผู้สั่ง..."
                  className="pl-9 text-xs h-9 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-sm shadow-xs">
                ไม่พบคำสั่งซื้อในสถานะนี้
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => {
                  const isPending = order.status === "pending_review";
                  const isProcessing = order.status === "approved_processing";
                  const isShipped = order.status === "shipped";
                  const isDelivered = order.status === "delivered";

                  return (
                    <Card
                      key={order.id}
                      className="bg-white border-slate-200 text-slate-900 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
                    >
                      <CardContent className="p-4 sm:p-5 space-y-4">
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm font-bold text-amber-800">
                                {order.orderNumber}
                              </span>
                              {isPending && (
                                <Badge className="bg-amber-50 text-amber-800 border-amber-200 text-[10px]">
                                  รอตรวจสอบสลิป
                                </Badge>
                              )}
                              {isProcessing && (
                                <Badge className="bg-sky-50 text-sky-700 border-sky-200 text-[10px]">
                                  ยืนยันชำระแล้ว - กำลังแพ็ก
                                </Badge>
                              )}
                              {isShipped && (
                                <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                                  จัดส่งแล้ว
                                </Badge>
                              )}
                              {isDelivered && (
                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                  จัดส่งสำเร็จ
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              สาขา: <strong className="text-slate-800">{order.branchName}</strong>{" "}
                              ({order.branchCode}) • ผู้สั่ง: {order.contactName} ({order.phone})
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-slate-900">
                              ฿{order.grandTotal.toLocaleString()}
                            </div>
                            <div className="text-[11px] text-slate-400">{order.createdAt}</div>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100">
                          <div className="text-slate-600 font-semibold mb-1">รายการสินค้า:</div>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-700">
                              <span>
                                • {item.productName}{" "}
                                <span className="text-slate-400">x{item.quantity} {item.unit}</span>
                              </span>
                              <span className="font-mono font-medium">฿{item.total.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Address & Notes */}
                        <div className="text-xs text-slate-600 space-y-1">
                          <div>
                            <span className="text-slate-400 font-medium">สถานที่จัดส่ง: </span>
                            {order.shippingAddress}
                          </div>
                          {order.trackingNumber && (
                            <div className="text-emerald-700 font-medium">
                              <span>ขนส่ง: {order.deliveryCarrier || "Flash Express B2B"} | </span>
                              <span>เลขพัสดุ: <strong className="font-mono">{order.trackingNumber}</strong></span>
                            </div>
                          )}
                          {order.salesNotes && (
                            <div className="text-slate-400 italic">
                              บันทึก: {order.salesNotes}
                            </div>
                          )}
                        </div>

                        {/* Action Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                          {/* Slip Preview Button */}
                          {order.paymentSlipUrl ? (
                            <button
                              type="button"
                              onClick={() => setSelectedSlipUrl(order.paymentSlipUrl)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-xs font-medium text-amber-800 border border-amber-200 transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-amber-700" />
                              <span>ดูหลักฐานสลิปโอนเงิน</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">ไม่มีไฟล์สลิป</span>
                          )}

                          {/* Order Action Buttons */}
                          <div className="flex items-center gap-2">
                            {isPending && (
                              <Button
                                size="sm"
                                onClick={() => confirmOrderPayment(order.id, adminUser?.name || "Admin RBC")}
                                className="bg-amber-700 hover:bg-amber-800 text-white text-xs gap-1.5 shadow-xs"
                              >
                                <Check className="h-3.5 w-3.5" />
                                <span>อนุมัติยอดโอนเงิน & ส่งคลังแพ็ก</span>
                              </Button>
                            )}

                            {isProcessing && (
                              <Button
                                size="sm"
                                onClick={() => setShippingOrderId(order.id)}
                                className="bg-slate-900 hover:bg-slate-800 text-white text-xs gap-1.5 shadow-xs"
                              >
                                <Truck className="h-3.5 w-3.5" />
                                <span>บันทึกเลขพัสดุ & ส่งสินค้า</span>
                              </Button>
                            )}

                            {isShipped && (
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs gap-1.5 border border-emerald-200"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span>ทำเครื่องหมายว่าจัดส่งสำเร็จแล้ว</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------- */}
        {/* TAB 2: FRANCHISE BRANCH APPLICATIONS */}
        {/* -------------------------------------------------------- */}
        {activeTab === "branches" && (
          <div className="space-y-4">
            {/* Filter buttons */}
            <div className="flex gap-1.5 xs:gap-2 pb-1 overflow-x-auto scrollbar-none">
              {[
                { id: "all", label: "สาขาทั้งหมด" },
                { id: "pending_approval", label: `รอตรวจสอบสัญญา (${pendingBranches.length})` },
                { id: "approved", label: "อนุมัติแล้ว" },
                { id: "rejected", label: "ปฏิเสธ" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setBranchFilter(f.id)}
                  className={`px-3 xs:px-3.5 py-1.5 rounded-lg text-xs 4k:text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                    branchFilter === f.id
                      ? "bg-amber-700 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Branch Cards */}
            {filteredBranches.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-400 text-sm shadow-xs">
                ไม่พบข้อมูลสาขาในสถานะนี้
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4k:grid-cols-4 gap-4 sm:gap-5">
                {filteredBranches.map((branch) => {
                const isPending = branch.approvalStatus === "pending_approval";
                const isApproved = branch.approvalStatus === "approved";
                const isRejected = branch.approvalStatus === "rejected";

                return (
                  <Card
                    key={branch.id}
                    className="bg-white border-slate-200 text-slate-900 shadow-xs flex flex-col justify-between"
                  >
                    <CardContent className="p-5 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-slate-900 text-base">
                              {branch.branchName}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            ผู้ถือสิทธิ์: <strong className="text-slate-800">{branch.fullName}</strong>
                          </p>
                        </div>

                        {isPending && (
                          <Badge className="bg-white text-black border-red-400 hover:bg-red-400 text-[10px]">
                            รอตรวจสอบสัญญา
                          </Badge>
                        )}
                      </div>

                      <div className="bg-slate-50 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100">
                        <div className="flex justify-between">
                          <span className="text-slate-400">อีเมลสาขา:</span>
                          <span className="text-slate-800 font-mono font-medium">{branch.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">เบอร์โทรศัพท์:</span>
                          <span className="text-slate-800">{branch.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">วันที่ยื่นเรื่อง:</span>
                          <span className="text-slate-600">{branch.submittedAt || "ไม่ระบุ"}</span>
                        </div>
                        {branch.address && (
                          <div className="pt-1 text-slate-600 border-t border-slate-200/60">
                            <span className="text-slate-400">ที่ตั้งสาขา: </span>
                            {branch.address}
                          </div>
                        )}
                      </div>

                      {/* Contract file row & inspect button */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-500 truncate max-w-[200px]">
                          <FileText className="h-4 w-4 text-amber-700 shrink-0" />
                          <span>ไฟล์สัญญา: </span>
                          <span className="font-mono text-slate-800 font-medium truncate">
                            {branch.contractFileUrl?.startsWith("data:")
                              ? "เอกสารแนบสัญญา.pdf/img"
                              : branch.contractFileUrl || "ยังไม่ได้แนบ"}
                          </span>
                        </div>

                        {branch.contractFileUrl && (
                          <button
                            type="button"
                            onClick={() => setInspectingBranch(branch)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-red-400 text-xs font-semibold text-black border border-red-400 transition-colors shadow-xs"
                          >
                            <span>ตรวจสอบข้อมูล & สัญญา</span>
                          </button>
                        )}
                      </div>

                      {isApproved && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4" /> ได้รับสิทธิ์สั่งสินค้าแฟรนไชส์แล้ว
                          </div>
                        </div>
                      )}
                      {isRejected && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                          <div className="text-xs text-red-600 font-medium flex items-center gap-1">
                            <XCircle className="h-4 w-4" /> ปฏิเสธคำขอเปิดสาขา
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL: VIEW PAYMENT SLIP */}
      {selectedSlipUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedSlipUrl(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Eye className="h-4 w-4 text-amber-700" />
                หลักฐานสลิปการโอนเงิน (Payment Slip)
              </h4>
              <button
                onClick={() => setSelectedSlipUrl(null)}
                className="text-slate-500 hover:text-slate-800 text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ✕ ปิด
              </button>
            </div>
            <div className="p-4 flex justify-center bg-slate-50">
              <img
                src={selectedSlipUrl}
                alt="สลิปโอนเงิน"
                className="max-h-[70vh] rounded-lg object-contain border border-slate-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DISPATCH ORDER (INPUT TRACKING) */}
      {shippingOrderId && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShippingOrderId(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Truck className="h-5 w-5 text-amber-700" />
                กรอกเลขพัสดุจัดส่งสินค้า
              </h4>
              <button
                onClick={() => setShippingOrderId(null)}
                className="text-slate-500 hover:text-slate-800 text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium block">ผู้ให้บริการขนส่ง:</label>
                <Input
                  value={carrierInput}
                  onChange={(e) => setCarrierInput(e.target.value)}
                  placeholder="เช่น Flash Express B2B Bulk, Kerry, SCG Logistics"
                  className="bg-slate-50 border-slate-200 text-xs h-9 text-slate-900 focus-visible:ring-amber-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-600 font-medium block">หมายเลขพัสดุ (Tracking Number):</label>
                <Input
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="เช่น TH0198273645X"
                  className="bg-slate-50 border-slate-200 text-xs h-9 text-slate-900 font-mono focus-visible:ring-amber-600"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShippingOrderId(null)}
                className="text-xs text-slate-500"
              >
                ยกเลิก
              </Button>
              <Button
                size="sm"
                onClick={() => handleDispatchOrder(shippingOrderId)}
                className="bg-amber-700 hover:bg-amber-800 text-white text-xs gap-1.5 shadow-sm"
              >
                <Truck className="h-4 w-4" />
                บันทึกและแจ้งจัดส่ง
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Admin Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={adminLogout}
        title="ยืนยันการออกจากระบบผู้ดูแลระบบ"
        description="คุณต้องการออกจากระบบจัดการส่วนกลาง (Admin บริษัท) ใช่หรือไม่?"
        theme="coffee"
      />

      {/* MODAL: INSPECT BRANCH CONTRACT & APPROVE */}
      {inspectingBranch && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 xs:p-4 sm:p-6 4k:p-12 overflow-y-auto"
          onClick={() => setInspectingBranch(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl max-w-2xl 4k:max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh] 4k:max-h-[85vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-3.5 xs:p-4 sm:p-5 4k:p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2 xs:gap-2.5">
                <div className="flex h-8 w-8 xs:h-9 xs:w-9 4k:h-12 4k:w-12 items-center justify-center rounded-xl bg-white border border-slate-300 text-slate-800 shadow-xs shrink-0">
                  <FileText className="h-4 w-4 xs:h-5 xs:w-5 4k:h-7 4k:w-7 text-amber-700" />
                </div>
                <div>
                  <h4 className="text-sm xs:text-base 4k:text-xl font-bold text-slate-900 flex items-center gap-2">
                    ตรวจสอบข้อมูลสาขา & ใบสัญญา
                  </h4>
                  <p className="text-[11px] xs:text-xs 4k:text-sm text-slate-500 truncate max-w-[200px] xs:max-w-xs sm:max-w-md">
                    {inspectingBranch.branchName} • ผู้ถือสิทธิ์: {inspectingBranch.fullName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInspectingBranch(null)}
                className="text-slate-400 hover:text-slate-700 text-sm h-8 w-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Content: Branch details & Contract file preview */}
            <div className="p-3.5 xs:p-4 sm:p-5 4k:p-7 space-y-3.5 sm:space-y-4 overflow-y-auto flex-1">
              {/* Branch Information Card */}
              <div className="bg-slate-50 rounded-xl p-3 xs:p-4 4k:p-6 text-xs 4k:text-sm space-y-2 border border-slate-200/70">
                <div className="font-bold text-slate-800 text-xs 4k:text-sm border-b border-slate-200 pb-1.5 flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-amber-700" />
                  <span>ข้อมูลผู้ขอเปิดสาขา</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
                  <div>
                    <span className="text-slate-400">ชื่อ-นามสกุล: </span>
                    <strong className="text-slate-900">{inspectingBranch.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">ชื่อสาขา: </span>
                    <strong className="text-slate-900">{inspectingBranch.branchName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">อีเมล: </span>
                    <span className="font-mono text-slate-800">{inspectingBranch.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">เบอร์โทรศัพท์: </span>
                    <span className="font-mono text-slate-800">{inspectingBranch.phone}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-400">วันที่ยื่นเรื่อง: </span>
                    <span className="text-slate-700">{inspectingBranch.submittedAt || "ไม่ระบุ"}</span>
                  </div>
                  {inspectingBranch.address && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-400">ที่ตั้งสาขา: </span>
                      <span className="text-slate-800">{inspectingBranch.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contract Preview & Download Action */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs 4k:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-amber-700" />
                    <span>เอกสารแนบสัญญาซื้อขายแฟรนไชส์</span>
                  </span>

                  {inspectingBranch.contractFileUrl && (() => {
                    const url = inspectingBranch.contractFileUrl || "";
                    let ext = "pdf";
                    if (url.startsWith("data:image/png") || /\.png($|\?)/i.test(url)) ext = "png";
                    else if (url.startsWith("data:image/jpeg") || /\.jpe?g($|\?)/i.test(url)) ext = "jpg";
                    else if (url.startsWith("data:image/webp") || /\.webp($|\?)/i.test(url)) ext = "webp";

                    return (
                      <a
                        href={url}
                        download={`contract_${inspectingBranch.branchCode || "franchise"}.${ext}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-[11px] xs:text-xs 4k:text-sm font-semibold text-amber-800 border border-amber-200 transition-colors shadow-xs"
                      >
                        <Download className="h-3.5 w-3.5 text-amber-700" />
                        <span>ดาวน์โหลดเอกสารสัญญา ({ext.toUpperCase()})</span>
                      </a>
                    );
                  })()}
                </div>

                <div className="border border-slate-200 rounded-xl bg-slate-100/70 p-3 xs:p-4 4k:p-6 flex flex-col items-center justify-center min-h-[180px] xs:min-h-[220px]">
                  {(() => {
                    const url = inspectingBranch.contractFileUrl || "";
                    const isDataOrHttp = url.startsWith("data:") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/");
                    const isImage = isDataOrHttp && (url.startsWith("data:image/") || /\.(jpeg|jpg|png|webp|gif)($|\?)/i.test(url));
                    const isPdf = isDataOrHttp && (url.startsWith("data:application/pdf") || /\.pdf($|\?)/i.test(url));

                    // Determine correct extension for download
                    let downloadExt = "pdf";
                    if (url.startsWith("data:image/png") || /\.png($|\?)/i.test(url)) downloadExt = "png";
                    else if (url.startsWith("data:image/jpeg") || /\.jpe?g($|\?)/i.test(url)) downloadExt = "jpg";
                    else if (url.startsWith("data:image/webp") || /\.webp($|\?)/i.test(url)) downloadExt = "webp";

                    const downloadFilename = `contract_${inspectingBranch.branchCode || "franchise"}.${downloadExt}`;

                    if (isImage) {
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <img
                            src={url}
                            alt="เอกสารสัญญา"
                            className="max-h-[42vh] 4k:max-h-[55vh] rounded-lg object-contain border border-slate-200 shadow-sm w-auto"
                          />
                          <a
                            href={url}
                            download={downloadFilename}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>ดาวน์โหลดรูปภาพสัญญา ({downloadExt.toUpperCase()})</span>
                          </a>
                        </div>
                      );
                    }

                    if (isPdf) {
                      return (
                        <div className="w-full space-y-3 text-center">
                          <iframe
                            src={url}
                            className="w-full h-[40vh] 4k:h-[50vh] rounded-lg border border-slate-300 bg-white"
                            title="เอกสารสัญญา PDF"
                          />
                          <div>
                            <a
                              href={url}
                              download={downloadFilename}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>ดาวน์โหลดไฟล์สัญญา PDF</span>
                            </a>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div className="text-center space-y-2.5 xs:space-y-3 py-4 xs:py-6">
                        <div className="mx-auto flex h-12 w-12 xs:h-14 xs:w-14 4k:h-18 4k:w-18 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 border border-amber-200">
                          <FileText className="h-6 w-6 xs:h-7 xs:w-7 4k:h-9 4k:w-9" />
                        </div>
                        <div>
                          <p className="text-xs xs:text-sm 4k:text-base font-semibold text-slate-800 break-all px-2">
                            {url || "เอกสารสัญญา"}
                          </p>
                          <p className="text-[11px] xs:text-xs text-slate-400 mt-0.5">
                            {isDataOrHttp
                              ? "เอกสารแนบสัญญาซื้อขายแฟรนไชส์"
                              : "ไฟล์สัญญาแนบ (ชื่อไฟล์ที่ผู้สมัครลงทะเบียนไว้)"}
                          </p>
                        </div>
                        {isDataOrHttp && (
                          <a
                            href={url}
                            download={downloadFilename}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 xs:px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs 4k:text-sm font-semibold shadow-xs"
                          >
                            <Download className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
                            <span>ดาวน์โหลดไฟล์สัญญาเพื่อตรวจสอบ</span>
                          </a>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Footer with Approve / Reject buttons */}
            <div className="p-3 xs:p-4 4k:p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5 xs:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInspectingBranch(null)}
                className="text-xs 4k:text-sm text-slate-500 order-2 xs:order-1"
              >
                ปิดหน้าต่าง
              </Button>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 order-1 xs:order-2">
                {inspectingBranch.approvalStatus === "pending_approval" && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        rejectBranch(inspectingBranch.id);
                        setInspectingBranch(null);
                      }}
                      className="text-xs 4k:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 h-9"
                    >
                      <XCircle className="h-4 w-4 mr-1 shrink-0" /> ปฏิเสธคำขอ
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        approveBranch(inspectingBranch.id);
                        setInspectingBranch(null);
                      }}
                      className="bg-amber-700 hover:bg-amber-800 text-white text-xs 4k:text-sm font-semibold px-3 xs:px-4 h-9 shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1 shrink-0" /> อนุมัติสัญญาเปิดสาขาทันที
                    </Button>
                  </>
                )}
                {inspectingBranch.approvalStatus === "approved" && (
                  <span className="text-xs 4k:text-sm text-emerald-600 font-semibold flex items-center justify-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="h-4 w-4" /> อนุมัติสัญญาเปิดสาขาเรียบร้อยแล้ว
                  </span>
                )}
                {inspectingBranch.approvalStatus === "rejected" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      approveBranch(inspectingBranch.id);
                      setInspectingBranch(null);
                    }}
                    className="bg-amber-700 hover:bg-amber-800 text-white text-xs 4k:text-sm font-semibold shadow-sm h-9"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> เปลี่ยนเป็นอนุมัติสัญญา
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
