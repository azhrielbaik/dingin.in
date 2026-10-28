"use client";

import React from "react";
import { useCart } from "./CartProvider";
import { CheckCircle2, X } from "lucide-react";

export function Toast() {
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 sm:right-6 z-50 flex items-center gap-2.5 bg-neutral-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg border border-neutral-700 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
      <span className="font-medium">{toastMessage}</span>
      <button
        onClick={hideToast}
        aria-label="Tutup notifikasi"
        className="ml-2 text-neutral-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

