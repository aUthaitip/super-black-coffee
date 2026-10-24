"use client";
import React, { useState, useEffectEvent } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import type { FranchiseUser } from "@/lib/types";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { OrderList, EmptyState, money } from "@/components/admin/order-list";
import { BranchList } from "@/components/admin/branch-list";
import { AdminDialogs } from "@/components/admin/admin-dialogs";
import { cn } from "@/lib/utils";
import {
  Lock,
  Mail,
  AlertCircle,
  ShoppingBag,
  Building2,
  ExternalLink,
  LogOut,
  Search,
  RefreshCw,
  ArrowUpRight,
  ArrowLeft,
  Package,
  ChevronRight,
  UserRound,
  Clock,
  Wallet,
} from "lucide-react";
import "./admin.css";

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
    refreshData,
  } = useStore();

  const refresh = useEffectEvent(() => refreshData());
  React.useEffect(() => {
    if (!isAdminLoggedIn) return;
    void refresh();
    const interval = setInterval(() => {
      void refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAdminLoggedIn]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string | null>(null);
  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshData();
      setLastRefresh(
        new Date().toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "branches">("orders");
  const [orderFilter, setOrderFilter] = useState("all");
  const [orderSearch, setOrderSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [selectedSlipUrl, setSelectedSlipUrl] = useState<string | null>(null);
  const [shippingOrderId, setShippingOrderId] = useState<string | null>(null);
  const [carrierInput, setCarrierInput] = useState("Flash Express B2B Bulk");
  const [trackingInput, setTrackingInput] = useState("");
  const [inspectingBranch, setInspectingBranch] =
    useState<FranchiseUser | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLoginSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const result = adminLogin(email, password);
    setLoading(false);
    if (!result.success)
      setError(result.error || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  };
  const handleDispatchOrder = (id: string) => {
    if (!trackingInput.trim()) {
      return;
    }
    updateOrderStatus(id, "shipped", trackingInput.trim(), carrierInput.trim());
    setShippingOrderId(null);
    setTrackingInput("");
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="admin-ui grid min-h-dvh bg-background font-medium lg:grid-cols-2">
        <aside className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary-foreground text-xl font-medium text-primary">
              SB
            </span>
            <span className="tracking-widest">
              SUPER BLACK
              <small className="mt-1 block text-xs tracking-[.3em]">
                COFFEE
              </small>
            </span>
          </Link>
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl font-medium leading-relaxed">
              ดูแลทุกสาขา
              <br />
              ให้เติบโตไปด้วยกัน
            </h1>
            <p className="text-primary-foreground/70">
              พื้นที่จัดการคำสั่งซื้อ การชำระเงิน
              <br />
              และสาขาแฟรนไชส์ Super Black Coffee
            </p>
          </div>
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Super Black Coffee Co., Ltd.
          </p>
        </aside>
        <main className="flex flex-col gap-8 p-6 sm:p-10">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "self-start",
            )}
          >
            <ArrowLeft data-icon="inline-start" />
            กลับสู่หน้าร้านแฟรนไชส์
          </Link>
          <div className="m-auto w-full max-w-md py-8">
            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted">
                  <Lock className="size-5" />
                </div>
                <CardTitle>เข้าสู่ระบบผู้ดูแล</CardTitle>
                <CardDescription>
                  ยินดีต้อนรับกลับ เข้าสู่ระบบเพื่อจัดการงานของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleLoginSubmit}
                  className="flex flex-col gap-6"
                >
                  {error && (
                    <Alert variant="destructive" className="admin-login-error">
                      <AlertCircle />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <FieldGroup>
                    <Field data-invalid={!!error}>
                      <FieldLabel htmlFor="admin-email">
                        อีเมลผู้ดูแลระบบ
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <Mail />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="admin-email"
                          type="email"
                          autoComplete="username"
                          placeholder="admin@rbc.co.th"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                          aria-invalid={!!error}
                        />
                      </InputGroup>
                    </Field>
                    <Field data-invalid={!!error}>
                      <FieldLabel htmlFor="admin-password">รหัสผ่าน</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <Lock />
                        </InputGroupAddon>
                        <InputGroupInput
                          id="admin-password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="กรอกรหัสผ่านของคุณ"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                          aria-invalid={!!error}
                        />
                      </InputGroup>
                    </Field>
                  </FieldGroup>
                  <Button disabled={loading} type="submit">
                    {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    <ArrowUpRight data-icon="inline-end" />
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="justify-center">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Lock className="size-3" />
                  สำหรับผู้ดูแลสำนักงานใหญ่เท่านั้น
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  const pendingOrders = orders.filter(
    (order) => order.status === "pending_review",
  );
  const pendingBranches = registeredBranches.filter(
    (branch) => branch.approvalStatus === "pending_approval",
  );
  const totalRevenue = orders.reduce((sum, order) => sum + order.grandTotal, 0);
  const orderTerm = orderSearch.trim().toLowerCase();
  const branchTerm = branchSearch.trim().toLowerCase();
  const filteredOrders = orders.filter(
    (order) =>
      (orderFilter === "all" || order.status === orderFilter) &&
      [
        order.orderNumber,
        order.branchName,
        order.contactName,
        order.branchCode,
      ].some((value) => value.toLowerCase().includes(orderTerm)),
  );
  const filteredBranches = registeredBranches.filter(
    (branch) =>
      (branchFilter === "all" || branch.approvalStatus === branchFilter) &&
      [
        branch.branchName,
        branch.fullName,
        branch.email,
        branch.branchCode || "",
      ].some((value) => value.toLowerCase().includes(branchTerm)),
  );
  const orderFilters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "pending_review", label: "รอตรวจสอบ" },
    { id: "approved_processing", label: "เตรียมจัดส่ง" },
    { id: "shipped", label: "จัดส่งแล้ว" },
    { id: "delivered", label: "สำเร็จ" },
    { id: "cancelled", label: "ยกเลิก" },
  ];
  const branchFilters = [
    { id: "all", label: "ทั้งหมด" },
    { id: "pending_approval", label: "รอตรวจสอบสัญญา" },
    { id: "approved", label: "อนุมัติแล้ว" },
    { id: "rejected", label: "ไม่ผ่านการอนุมัติ" },
  ];

  const isOrders = activeTab === "orders";
  const filters = isOrders ? orderFilters : branchFilters;
  const currentFilter = isOrders ? orderFilter : branchFilter;
  const resultCount = isOrders
    ? filteredOrders.length
    : filteredBranches.length;
  const totalCount = isOrders ? orders.length : registeredBranches.length;
  const resetFilters = () => {
    if (isOrders) {
      setOrderFilter("all");
      setOrderSearch("");
    } else {
      setBranchFilter("all");
      setBranchSearch("");
    }
  };
  const metrics = [
    {
      label: "รอตรวจสอบสลิป",
      value: pendingOrders.length,
      unit: "รายการ",
      icon: Clock,
      description: "ตรวจสอบการชำระเงิน",
      action: () => {
        setActiveTab("orders");
        setOrderFilter("pending_review");
        setOrderSearch("");
      },
    },
    {
      label: "สาขารออนุมัติ",
      value: pendingBranches.length,
      unit: "สาขา",
      icon: Building2,
      description: "ตรวจสอบคำขอเปิดสาขา",
      action: () => {
        setActiveTab("branches");
        setBranchFilter("pending_approval");
        setBranchSearch("");
      },
    },
    {
      label: "คำสั่งซื้อทั้งหมด",
      value: orders.length,
      unit: "ออเดอร์",
      icon: ShoppingBag,
      description: "จากทุกสาขาแฟรนไชส์",
    },
    {
      label: "มูลค่าคำสั่งซื้อ",
      value: money(totalRevenue),
      unit: "",
      icon: Wallet,
      description: "มูลค่าการสั่งซื้อทั้งหมด",
    },
  ];
  return (
    <div className="admin-ui min-h-dvh bg-background text-foreground font-medium">
      <aside className="border-b border-border bg-card p-4 md:fixed md:inset-y-0 md:left-0 md:flex md:w-60 md:flex-col md:border-r md:border-b-0 md:p-5">
        <Link href="/admin" className="flex items-center gap-3 px-2 py-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-lg text-primary-foreground">
            SB
          </span>
          <span className="text-sm tracking-wider">
            SUPER BLACK
            <small className="mt-1 block text-[10px] tracking-[.25em] text-muted-foreground">
              COFFEE · ADMIN
            </small>
          </span>
        </Link>
        <p className="my-6 hidden px-3 text-xs text-muted-foreground md:block">
          สำนักงานใหญ่
        </p>
        <nav
          aria-label="เมนูผู้ดูแลระบบ"
          className="mt-4 flex gap-2 overflow-x-auto md:mt-0 md:flex-col"
        >
          <Button
            variant={isOrders ? "secondary" : "ghost"}
            className="justify-start"
            aria-current={isOrders ? "page" : undefined}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingBag data-icon="inline-start" />
            คำสั่งซื้อ
            {pendingOrders.length > 0 && (
              <Badge variant="outline" className="ml-auto">
                {pendingOrders.length}
              </Badge>
            )}
          </Button>
          <Button
            variant={!isOrders ? "secondary" : "ghost"}
            className="justify-start"
            aria-current={!isOrders ? "page" : undefined}
            onClick={() => setActiveTab("branches")}
          >
            <Building2 data-icon="inline-start" />
            สาขาแฟรนไชส์
            {pendingBranches.length > 0 && (
              <Badge variant="outline" className="ml-auto">
                {pendingBranches.length}
              </Badge>
            )}
          </Button>
          <Separator className="my-3 hidden md:block" />
          <Link
            href="/studio"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start",
            )}
          >
            <Package data-icon="inline-start" />
            จัดการสินค้า
            <ExternalLink data-icon="inline-end" className="ml-auto" />
          </Link>
        </nav>
        <div className="mt-auto hidden flex-col gap-2 pt-8 md:flex">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start",
            )}
          >
            <ExternalLink data-icon="inline-start" />
            หน้าร้านแฟรนไชส์
          </Link>
          <Separator />
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut data-icon="inline-start" />
            ออกจากระบบ
          </Button>
          <p className="px-3 pt-2 text-xs text-muted-foreground">
            Super Black Coffee · Admin
          </p>
        </div>
      </aside>
      <div className="min-w-0 md:ml-60">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-card px-4 sm:px-8">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            ระบบจัดการแฟรนไชส์
            <ChevronRight className="size-4" />
            <span className="text-foreground">
              {isOrders ? "คำสั่งซื้อ" : "สาขาแฟรนไชส์"}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:ml-auto">
            <span
              className="admin-refresh-time hidden text-xs text-muted-foreground lg:block"
              role="status"
            >
              {lastRefresh ? `อัปเดต ${lastRefresh} น.` : "อัปเดตอัตโนมัติ"}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              aria-label="รีเฟรชข้อมูล"
            >
              <RefreshCw
                data-icon="inline-start"
                className={cn(isRefreshing && "animate-spin")}
              />
              รีเฟรช
            </Button>
            <div
              className="hidden items-center gap-2 sm:flex"
              title={adminUser?.email}
            >
              <Avatar>
                <AvatarFallback>
                  <UserRound className="size-4" />
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">ผู้ดูแลระบบ</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut data-icon="inline-start" />
            ออกจากระบบ
          </Button>
        </header>
        <main className="mx-auto flex max-w-[1600px] flex-col gap-7 p-4 py-7 sm:p-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
              ภาพรวมการจัดการ
            </h1>
            <p className="text-sm text-muted-foreground">
              ตรวจสอบคำสั่งซื้อ การชำระเงิน และคำขอเปิดสาขา
            </p>
          </div>
          <section
            aria-label="สรุปข้อมูล"
            className="grid grid-cols-2 gap-3 xl:grid-cols-4"
          >
            {metrics.map((metric) => (
              <Card key={metric.label} className="min-w-0">
                <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardDescription>{metric.label}</CardDescription>
                    <metric.icon className="hidden size-4 shrink-0 text-muted-foreground sm:block" />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-1 sm:p-5 sm:pt-1">
                  <p className="flex flex-wrap items-baseline gap-2 text-2xl font-medium tabular-nums sm:text-3xl">
                    {metric.value}
                    <span className="text-xs text-muted-foreground">
                      {metric.unit}
                    </span>
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 sm:p-5 sm:pt-0">
                  {metric.action ? (
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto justify-start whitespace-normal p-0"
                      onClick={metric.action}
                    >
                      {metric.description}
                      <ArrowUpRight data-icon="inline-end" />
                    </Button>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </section>
          <Card className="min-w-0">
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-1">
                  <CardTitle>
                    {isOrders ? "คำสั่งซื้อ" : "สาขาแฟรนไชส์"}
                  </CardTitle>
                  <CardDescription>
                    {isOrders
                      ? "ตรวจสอบการชำระเงินและติดตามการจัดส่ง"
                      : "ตรวจสอบข้อมูลและอนุมัติคำขอเปิดสาขา"}
                  </CardDescription>
                </div>
                <InputGroup className="lg:max-w-sm">
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label={isOrders ? "ค้นหาคำสั่งซื้อ" : "ค้นหาสาขา"}
                    placeholder={
                      isOrders
                        ? "ค้นหาออเดอร์ สาขา หรือผู้สั่ง"
                        : "ค้นหาสาขา ชื่อ หรืออีเมล"
                    }
                    value={isOrders ? orderSearch : branchSearch}
                    onChange={(event) =>
                      isOrders
                        ? setOrderSearch(event.target.value)
                        : setBranchSearch(event.target.value)
                    }
                  />
                </InputGroup>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                key={activeTab}
                value={currentFilter}
                onValueChange={isOrders ? setOrderFilter : setBranchFilter}
                className="gap-0"
              >
                <div className="overflow-x-auto px-4 pb-3 sm:px-6">
                  <TabsList aria-label="กรองตามสถานะ">
                    {filters.map((filter) => {
                      const count = isOrders
                        ? orders.filter(
                            (order) =>
                              filter.id === "all" || order.status === filter.id,
                          ).length
                        : registeredBranches.filter(
                            (branch) =>
                              filter.id === "all" ||
                              branch.approvalStatus === filter.id,
                          ).length;
                      return (
                        <TabsTrigger key={filter.id} value={filter.id}>
                          {filter.label}
                          <span className="text-xs tabular-nums">{count}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
                <Separator />
                {filters.map((filter) => (
                  <TabsContent value={filter.id} key={filter.id}>
                    {resultCount ? (
                      isOrders ? (
                        <OrderList
                          orders={filteredOrders}
                          onViewSlip={setSelectedSlipUrl}
                          onConfirm={(id) =>
                            confirmOrderPayment(id, adminUser?.name || "Admin")
                          }
                          onShip={(id) => {
                            setTrackingInput("");
                            setShippingOrderId(id);
                          }}
                          onDeliver={(id) => updateOrderStatus(id, "delivered")}
                        />
                      ) : (
                        <BranchList
                          branches={filteredBranches}
                          onInspect={setInspectingBranch}
                        />
                      )
                    ) : (
                      <EmptyState
                        title={isOrders ? "ไม่พบคำสั่งซื้อ" : "ไม่พบสาขา"}
                        description={
                          totalCount
                            ? "ลองเปลี่ยนสถานะหรือคำค้นหาเพื่อดูรายการอื่น"
                            : isOrders
                              ? "คำสั่งซื้อจากสาขาจะแสดงที่นี่เมื่อมีการสั่งสินค้า"
                              : "คำขอเปิดสาขาใหม่จะแสดงที่นี่"
                        }
                        onReset={totalCount ? resetFilters : undefined}
                      />
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <Separator />
            <CardFooter className="px-6 py-4">
              <p className="text-xs text-muted-foreground" aria-live="polite">
                แสดง {resultCount} จาก {totalCount}{" "}
                {isOrders ? "ออเดอร์" : "สาขา"}
              </p>
            </CardFooter>
          </Card>
          <footer className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Super Black Coffee</span>
            <span>ระบบจัดการส่วนกลาง · สำนักงานใหญ่</span>
          </footer>
        </main>
      </div>
      <AdminDialogs
        slipUrl={selectedSlipUrl}
        onCloseSlip={() => setSelectedSlipUrl(null)}
        shippingOrderId={shippingOrderId}
        onCloseShipping={() => setShippingOrderId(null)}
        carrier={carrierInput}
        onCarrierChange={setCarrierInput}
        tracking={trackingInput}
        onTrackingChange={setTrackingInput}
        onDispatch={handleDispatchOrder}
        branch={inspectingBranch}
        onCloseBranch={() => setInspectingBranch(null)}
        onApprove={approveBranch}
        onReject={rejectBranch}
        logoutOpen={showLogoutModal}
        onLogoutOpenChange={setShowLogoutModal}
        onLogout={adminLogout}
      />
    </div>
  );
}
