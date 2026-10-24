"use client";
import type { FranchiseUser } from "@/lib/types";
import { CheckCircle2, Download, FileText, Truck, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  slipUrl: string | null;
  onCloseSlip: () => void;
  shippingOrderId: string | null;
  onCloseShipping: () => void;
  carrier: string;
  onCarrierChange: (value: string) => void;
  tracking: string;
  onTrackingChange: (value: string) => void;
  onDispatch: (id: string) => void;
  branch: FranchiseUser | null;
  onCloseBranch: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  logoutOpen: boolean;
  onLogoutOpenChange: (open: boolean) => void;
  onLogout: () => void;
}
export function AdminDialogs(props: Props) {
  const branch = props.branch;
  const url = branch?.contractFileUrl || "";
  const isImage =
    url.startsWith("data:image/") ||
    /\.(jpeg|jpg|png|webp|gif)($|\?)/i.test(url);
  const isPdf =
    url.startsWith("data:application/pdf") || /\.pdf($|\?)/i.test(url);
  const canDownload = /^(https?:|data:|\/)/.test(url);
  const extension =
    url.startsWith("data:image/png") || /\.png($|\?)/i.test(url)
      ? "png"
      : url.startsWith("data:image/jpeg") || /\.jpe?g($|\?)/i.test(url)
        ? "jpg"
        : url.startsWith("data:image/webp") || /\.webp($|\?)/i.test(url)
          ? "webp"
          : "pdf";
  return (
    <>
      <Dialog
        open={!!props.slipUrl}
        onOpenChange={(open) => {
          if (!open) props.onCloseSlip();
        }}
      >
        <DialogContent className="admin-ui max-h-[90dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>หลักฐานสลิปการโอนเงิน</DialogTitle>
            <DialogDescription>
              ตรวจสอบยอดเงินและรายละเอียดการโอนก่อนยืนยันการชำระเงิน
            </DialogDescription>
          </DialogHeader>
          {props.slipUrl && (
            <img
              src={props.slipUrl}
              alt="สลิปโอนเงิน"
              className="max-h-[65dvh] w-full rounded-md object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!props.shippingOrderId}
        onOpenChange={(open) => {
          if (!open) props.onCloseShipping();
        }}
      >
        <DialogContent className="admin-ui">
          <DialogHeader>
            <DialogTitle>บันทึกการจัดส่ง</DialogTitle>
            <DialogDescription>
              ระบุผู้ให้บริการขนส่งและหมายเลขพัสดุของคำสั่งซื้อนี้
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              if (
                props.shippingOrderId &&
                props.carrier.trim() &&
                props.tracking.trim()
              )
                props.onDispatch(props.shippingOrderId);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="admin-carrier">
                  ผู้ให้บริการขนส่ง:
                </FieldLabel>
                <Input
                  id="admin-carrier"
                  value={props.carrier}
                  onChange={(event) =>
                    props.onCarrierChange(event.target.value)
                  }
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="admin-tracking">
                  หมายเลขพัสดุ (Tracking Number):
                </FieldLabel>
                <Input
                  id="admin-tracking"
                  value={props.tracking}
                  onChange={(event) =>
                    props.onTrackingChange(event.target.value)
                  }
                  placeholder="เช่น TH0198273645X"
                  required
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!props.carrier.trim() || !props.tracking.trim()}
              >
                <Truck data-icon="inline-start" />
                บันทึกและแจ้งจัดส่ง
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!branch}
        onOpenChange={(open) => {
          if (!open) props.onCloseBranch();
        }}
      >
        <DialogContent className="admin-ui max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>ตรวจสอบข้อมูลและสัญญาสาขา</DialogTitle>
            <DialogDescription>
              {branch?.branchName} · {branch?.fullName}
            </DialogDescription>
          </DialogHeader>
          {branch && (
            <>
              <dl className="grid grid-cols-1 gap-4 rounded-lg bg-muted/50 p-4 text-sm sm:grid-cols-2">
                {[
                  ["ผู้ถือสิทธิ์", branch.fullName],
                  ["อีเมล", branch.email],
                  ["เบอร์โทรศัพท์", branch.phone],
                  ["วันที่ยื่นเรื่อง", branch.submittedAt || "ไม่ระบุ"],
                  ["ที่อยู่", branch.address || "ไม่ระบุ"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-1 break-words font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-medium">เอกสารแนบสัญญาซื้อขายแฟรนไชส์</h3>
                {canDownload && (
                  <a
                    href={url}
                    download={`contract_${branch.branchCode || "franchise"}.${extension}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    <Download data-icon="inline-start" />
                    ดาวน์โหลด
                  </a>
                )}
              </div>
              {isImage ? (
                <img
                  src={url}
                  alt="เอกสารสัญญา"
                  className="max-h-[40dvh] w-full rounded-md object-contain"
                />
              ) : isPdf ? (
                <iframe
                  src={url}
                  title="เอกสารสัญญา PDF"
                  className="h-[40dvh] w-full rounded-md border border-border"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 rounded-md bg-muted p-6 text-center text-sm text-muted-foreground">
                  <FileText className="size-8" />
                  <p className="break-all">
                    {url || "ยังไม่ได้แนบเอกสารสัญญา"}
                  </p>
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">ปิดหน้าต่าง</Button>
                </DialogClose>
                {branch.approvalStatus === "pending_approval" && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      props.onReject(branch.id);
                      props.onCloseBranch();
                    }}
                  >
                    <XCircle data-icon="inline-start" />
                    ปฏิเสธคำขอ
                  </Button>
                )}
                {branch.approvalStatus !== "approved" ? (
                  <Button
                    onClick={() => {
                      props.onApprove(branch.id);
                      props.onCloseBranch();
                    }}
                  >
                    <CheckCircle2 data-icon="inline-start" />
                    {branch.approvalStatus === "rejected"
                      ? "เปลี่ยนเป็นอนุมัติสัญญา"
                      : "อนุมัติสัญญาเปิดสาขา"}
                  </Button>
                ) : (
                  <Badge variant="success">อนุมัติสัญญาเรียบร้อยแล้ว</Badge>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={props.logoutOpen} onOpenChange={props.onLogoutOpenChange}>
        <DialogContent className="admin-ui">
          <DialogHeader>
            <DialogTitle>ยืนยันการออกจากระบบผู้ดูแลระบบ</DialogTitle>
            <DialogDescription>
              คุณต้องการออกจากระบบจัดการส่วนกลางใช่หรือไม่?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button
              onClick={() => {
                props.onLogoutOpenChange(false);
                props.onLogout();
              }}
            >
              ยืนยันออกจากระบบ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
