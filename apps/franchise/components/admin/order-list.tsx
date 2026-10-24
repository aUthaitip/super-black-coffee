"use client";

import {
  Eye,
  MapPin,
  ShoppingBag,
  Truck,
  Check,
  CheckCircle2,
  SearchX,
} from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

export const orderStatuses: Record<
  OrderStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  pending_review: { label: "รอตรวจสอบสลิป", variant: "warning" },
  approved_processing: { label: "เตรียมจัดส่ง", variant: "info" },
  shipped: { label: "จัดส่งแล้ว", variant: "success" },
  delivered: { label: "จัดส่งสำเร็จ", variant: "success" },
  cancelled: { label: "ยกเลิก", variant: "secondary" },
};
export const money = (value: number) =>
  `฿${value.toLocaleString("th-TH", { maximumFractionDigits: 2 })}`;

export function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset?: () => void;
}) {
  return (
    <Empty className="min-h-64">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX />
        </EmptyMedia>
        <EmptyTitle role="heading" aria-level={3}>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {onReset && (
        <EmptyContent>
          <Button variant="outline" onClick={onReset}>
            ล้างตัวกรอง
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
interface Props {
  orders: Order[];
  onViewSlip: (url: string) => void;
  onConfirm: (id: string) => void;
  onShip: (id: string) => void;
  onDeliver: (id: string) => void;
}
export function OrderList({
  orders,
  onViewSlip,
  onConfirm,
  onShip,
  onDeliver,
}: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {orders.map((order) => {
        const status = orderStatuses[order.status];
        return (
          <AccordionItem
            value={order.id}
            key={order.id}
            className="admin-order px-4 sm:px-6"
          >
            <AccordionTrigger className="admin-order-summary items-center py-5">
              <span className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto_auto] lg:gap-6">
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="break-all font-medium">
                    {order.orderNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {order.branchName} ({order.branchCode})
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {order.contactName} · {order.phone}
                  </span>
                </span>
                <span className="hidden text-xs text-muted-foreground lg:block">
                  {order.createdAt}
                  <span className="mt-1 block">
                    {order.items.length} รายการสินค้า
                  </span>
                </span>
                <span className="flex flex-col items-end gap-2 lg:contents">
                  <span className="font-medium tabular-nums">
                    {money(order.grandTotal)}
                  </span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="admin-order-detail pb-5">
              <div className="grid gap-5 rounded-lg bg-muted/50 p-4 xl:grid-cols-[1.2fr_1fr]">
                <div className="flex min-w-0 flex-col gap-3">
                  <h4 className="flex items-center gap-2 font-medium">
                    <ShoppingBag className="size-4" />
                    รายการสินค้า
                  </h4>
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.sku}-${index}`}
                      className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="break-words font-medium">
                          {item.productName}
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          SKU {item.sku}
                        </p>
                      </div>
                      <span className="text-muted-foreground">
                        × {item.quantity} {item.unit}
                      </span>
                      <span className="font-medium tabular-nums">
                        {money(item.total)}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <p className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>สินค้า {money(order.subtotal)}</span>
                    <span>ภาษี {money(order.tax)}</span>
                    <span>จัดส่ง {money(order.shippingFee)}</span>
                  </p>
                </div>
                <div className="flex min-w-0 flex-col gap-3">
                  <h4 className="flex items-center gap-2 font-medium">
                    <MapPin className="size-4" />
                    ที่อยู่จัดส่ง
                  </h4>
                  <p className="break-words text-sm text-muted-foreground">
                    {order.shippingAddress || "ไม่ได้ระบุที่อยู่"}
                  </p>
                  <p className="text-xs text-muted-foreground lg:hidden">
                    {order.createdAt}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm">
                      {order.deliveryCarrier}
                      <br />
                      <span className="font-medium">
                        {order.trackingNumber}
                      </span>
                    </p>
                  )}
                  {order.salesNotes && (
                    <p className="text-xs text-muted-foreground">
                      หมายเหตุ: {order.salesNotes}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 xl:col-span-2">
                  {order.paymentSlipUrl ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewSlip(order.paymentSlipUrl)}
                    >
                      <Eye data-icon="inline-start" />
                      ดูสลิปโอนเงิน
                    </Button>
                  ) : (
                    <span className="mr-auto text-xs text-muted-foreground">
                      ยังไม่มีหลักฐานการโอน
                    </span>
                  )}
                  {order.status === "pending_review" && (
                    <Button size="sm" onClick={() => onConfirm(order.id)}>
                      <Check data-icon="inline-start" />
                      ยืนยันการชำระเงิน
                    </Button>
                  )}
                  {order.status === "approved_processing" && (
                    <Button size="sm" onClick={() => onShip(order.id)}>
                      <Truck data-icon="inline-start" />
                      บันทึกการจัดส่ง
                    </Button>
                  )}
                  {order.status === "shipped" && (
                    <Button size="sm" onClick={() => onDeliver(order.id)}>
                      <CheckCircle2 data-icon="inline-start" />
                      ยืนยันจัดส่งสำเร็จ
                    </Button>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
