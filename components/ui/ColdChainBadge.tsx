import React from "react";
import { Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColdChainBadgeProps {
  className?: string;
  size?: "sm" | "md";
  text?: string;
}

export function ColdChainBadge({
  className,
  size = "md",
  text = "Dikirim tetap beku",
}: ColdChainBadgeProps) {
  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium bg-frost-50 text-neutral-700 rounded-full select-none border border-frost-500/20",
        sizeClasses[size],
        className
      )}
    >
      <Snowflake className={cn("text-frost-500 shrink-0 animate-pulse", iconSizes[size])} />
      <span>{text}</span>
    </span>
  );
}

