"use client";

import React from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  message: string;
  source: string;
  productName?: string;
  variantLabel?: string;
  value?: number;
  isSoldout?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message,
  source,
  productName,
  variantLabel,
  value,
  isSoldout = false,
  size = "md",
  fullWidth = false,
  className,
  children,
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(message);

  const handleClick = () => {
    trackWhatsAppClick({
      source,
      product: productName,
      variant: variantLabel,
      value,
    });
  };

  const sizeClasses = {
    sm: "h-9 px-3 text-xs sm:text-sm rounded-md gap-1.5",
    md: "h-11 px-4 text-sm sm:text-base rounded-md gap-2",
    lg: "h-13 px-6 text-base sm:text-lg rounded-lg gap-2.5 font-bold",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // If item is sold out, secondary styling is used with "Tanya Ketersediaan"
  const variantClasses = isSoldout
    ? "bg-white text-neutral-800 border-2 border-neutral-300 hover:border-wa-600 hover:text-wa-700 shadow-sm"
    : "bg-wa-700 hover:bg-wa-800 text-white shadow-sm hover:shadow active:scale-[0.98]";

  const defaultLabel = isSoldout ? "Tanya Ketersediaan" : "Pesan via WhatsApp";
  const ariaLabelText = `${
    productName ? `${defaultLabel} untuk ${productName}` : defaultLabel
  } (membuka WhatsApp di tab baru)`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ariaLabelText}
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer select-none text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-700",
        sizeClasses[size],
        variantClasses,
        fullWidth && "w-full",
        className
      )}
    >
      <WhatsAppIcon className={cn("shrink-0", isSoldout ? "text-wa-600" : "text-white", iconSizes[size])} />
      <span>{children || defaultLabel}</span>
    </a>
  );
}

