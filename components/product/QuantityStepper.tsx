"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs sm:text-sm font-semibold text-neutral-700">Jumlah:</span>
      <div
        className={cn(
          "inline-flex items-center border border-neutral-200 rounded-xl bg-white p-1 shadow-2xs",
          disabled && "opacity-50 pointer-events-none"
        )}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= min || disabled}
          aria-label="Kurangi jumlah pesanan"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>

        <span
          className="w-10 text-center font-extrabold text-neutral-900 text-sm sm:text-base select-none"
          aria-live="polite"
        >
          {quantity}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= max || disabled}
          aria-label="Tambah jumlah pesanan"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

