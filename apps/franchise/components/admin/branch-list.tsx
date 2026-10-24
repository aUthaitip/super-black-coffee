"use client";
import { ArrowUpRight, Building2, FileText, Mail, Phone } from "lucide-react";
import type { FranchiseUser } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
const statuses: Record<
  FranchiseUser["approvalStatus"],
  { label: string; variant: BadgeProps["variant"] }
> = {
  pending_approval: { label: "รอตรวจสอบสัญญา", variant: "warning" },
  approved: { label: "อนุมัติแล้ว", variant: "success" },
  rejected: { label: "ไม่ผ่านการอนุมัติ", variant: "destructive" },
};
export function BranchList({
  branches,
  onInspect,
}: {
  branches: FranchiseUser[];
  onInspect: (branch: FranchiseUser) => void;
}) {
  return (
    <div className="grid gap-4 p-4 sm:p-6 xl:grid-cols-2">
      {branches.map((branch) => {
        const status = statuses[branch.approvalStatus];
        return (
          <Card key={branch.id} className="min-w-0">
            <CardHeader>
              <div className="mb-3 flex items-center justify-between gap-2">
                <Building2 className="size-5 text-muted-foreground" />
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <CardTitle>{branch.branchName}</CardTitle>
              <CardDescription>{branch.fullName}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <p className="flex items-center gap-2 break-all text-sm text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                {branch.email}
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4" />
                {branch.phone}
              </p>
            </CardContent>
            <CardFooter className="flex-wrap justify-between gap-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <FileText className="size-4" />
                {branch.contractFileUrl ? "แนบสัญญาแล้ว" : "ยังไม่แนบสัญญา"}
              </span>
              <Button
                variant="outline"
                size="sm"
                aria-label={`ตรวจสอบสาขา ${branch.branchName}`}
                onClick={() => onInspect(branch)}
              >
                ตรวจสอบ
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
