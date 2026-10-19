"use client";

import React, { useEffect } from "react";
import { LogOut, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  theme?: "orange" | "coffee";
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "ยืนยันการออกจากระบบ",
  description = "คุณต้องการออกจากระบบใช่หรือไม่?",
  theme = "coffee",
}: LogoutConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isOrange = theme === "orange";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-in zoom-in-95 duration-150">
        <div className="p-6 text-center">
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
              isOrange
                ? "bg-orange-50 text-orange-600 ring-4 ring-orange-100"
                : "bg-red-50 text-red-600 ring-4 ring-red-100"
            }`}
          >
            <LogOut className="h-7 w-7" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 text-sm font-semibold border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              ยกเลิก
            </Button>
            <Button
              type="button"
              onClick={() => {
                onClose();
                onConfirm();
              }}
              className={`flex-1 h-11 text-sm font-semibold text-white shadow-md ${
                isOrange
                  ? "bg-orange-600 hover:bg-orange-700 shadow-orange-600/20"
                  : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
              }`}
            >
              ตกลง
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
