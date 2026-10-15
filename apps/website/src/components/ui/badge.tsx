import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "gold";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-[#c69255] text-stone-950 hover:bg-[#d8a162]",
    secondary: "bg-white/10 text-stone-200 border-white/15",
    outline: "border border-white/20 text-stone-300",
    gold: "border border-[#c69255]/40 bg-[#c69255]/10 text-[#d8a162]",
  }[variant];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-colors focus:outline-none",
        variantStyles,
        className
      )}
      {...props}
    />
  );
}

export { Badge };
