import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export type BadgeVariant = "promo" | "bestseller" | "new" | "halal" | "soldout" | "neutral";

interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ variant, children, className, size = "md" }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-bold tracking-tight select-none rounded-full whitespace-nowrap";

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] leading-tight gap-1",
    md: "px-2.5 py-1 text-xs leading-tight gap-1",
  };

  const variantClasses = {
    promo: "bg-promo text-white shadow-sm",
    bestseller: "bg-accent-400 text-neutral-900 shadow-sm",
    new: "bg-primary-100 text-primary-700",
    halal: "bg-white border border-success text-success",
    soldout: "bg-danger text-white shadow-sm",
    neutral: "bg-neutral-100 text-neutral-700",
  };

  return (
    <span className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}>
      {variant === "halal" && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
      {children ||
        (variant === "promo" && "PROMO") ||
        (variant === "bestseller" && "TERLARIS") ||
        (variant === "new" && "BARU") ||
        (variant === "halal" && "HALAL") ||
        (variant === "soldout" && "HABIS")}
    </span>
  );
}

