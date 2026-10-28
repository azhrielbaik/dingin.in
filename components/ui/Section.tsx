import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "default" | "muted" | "frost" | "primary" | "white";
  className?: string;
  id?: string;
}

export function Section({
  children,
  variant = "default",
  className,
  id,
  ...props
}: SectionProps) {
  const variantStyles = {
    default: "bg-white",
    white: "bg-white",
    muted: "bg-neutral-50",
    frost: "bg-frost-50",
    primary: "bg-primary-700 text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-10 sm:py-16", variantStyles[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}

