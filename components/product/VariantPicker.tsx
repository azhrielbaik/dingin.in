"use client";

import React from "react";
import { Variant } from "@/types";
import { cn } from "@/lib/utils";

interface VariantPickerProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelect: (variant: Variant) => void;
}

export function VariantPicker({
  variants,
  selectedVariant,
  onSelect,
}: VariantPickerProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-2">
      <label className="text-xs sm:text-sm font-semibold text-neutral-700 block">
        Pilihan Ukuran / Kemasan:
      </label>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Pilihan varian kemasan">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariant.id;
          return (
            <button
              key={variant.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(variant)}
              className={cn(
                "inline-flex items-center px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer",
                isSelected
                  ? "bg-primary-50 border-primary-500 ring-1 ring-primary-500"
                  : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700"
              )}
            >
              <span className={cn("text-xs sm:text-sm font-bold", isSelected ? "text-primary-700" : "text-neutral-900")}>
                {variant.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

