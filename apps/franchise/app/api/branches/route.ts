import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(branches);
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    return NextResponse.json({ error: "Failed to fetch branches" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email || !data.fullName || !data.branchName) {
      return NextResponse.json(
        { error: "ข้อมูลไม่ครบถ้วน กรุณากรอกชื่อ, อีเมล และชื่อสาขา" },
        { status: 400 }
      );
    }

    const existing = await prisma.branch.findUnique({
      where: { email: data.email.trim().toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "อีเมลนี้ลงทะเบียนสาขาไว้แล้ว" },
        { status: 400 }
      );
    }

    const branchCode = "SBC-" + Math.floor(100 + Math.random() * 900);
    const nowStr = new Date().toLocaleString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const newBranch = await prisma.branch.create({
      data: {
        email: data.email.trim().toLowerCase(),
        password: data.password || null,
        fullName: data.fullName.trim(),
        branchName: data.branchName.trim(),
        branchCode,
        phone: data.phone?.trim() || "",
        contractFileUrl: data.contractFileUrl || null,
        address: data.address || "",
        approvalStatus: "pending_approval",
        submittedAt: nowStr,
      },
    });

    return NextResponse.json(newBranch);
  } catch (error) {
    console.error("Failed to create branch:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการบันทึกข้อมูลสาขา" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, approvalStatus } = await request.json();

    if (!id || !approvalStatus) {
      return NextResponse.json(
        { error: "ระบุ id และ approvalStatus ที่ต้องการอัปเดต" },
        { status: 400 }
      );
    }

    const nowStr = new Date().toLocaleString("th-TH");
    const updated = await prisma.branch.update({
      where: { id },
      data: {
        approvalStatus,
        ...(approvalStatus === "approved" ? { approvedAt: nowStr } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update branch:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปเดตสถานะสาขา" },
      { status: 500 }
    );
  }
}
