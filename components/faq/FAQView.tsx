"use client";

import React, { useState } from "react";
import { FAQItem } from "@/types";
import { Accordion } from "@/components/ui/Accordion";
import { cn } from "@/lib/utils";

interface FAQViewProps {
  items: FAQItem[];
}

export function FAQView({ items }: FAQViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories: { key: string; label: string }[] = [
    { key: "all", label: "Semua Pertanyaan" },
    { key: "pengiriman", label: "Pengiriman Beku" },
    { key: "pemesanan", label: "Pemesanan via WA" },
    { key: "pembayaran", label: "Metode Pembayaran" },
    { key: "produk", label: "Kualitas & Halal" },
    { key: "komplain", label: "Garansi & Komplain" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const accordionItems = filteredItems.map((item, index) => ({
    id: `faq-${selectedCategory}-${index}`,
    title: item.question,
    content: <p className="leading-relaxed">{item.answer}</p>,
  }));

  return (
    <div className="space-y-6">
      {/* Category Pills Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                "h-10 px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer",
                isSelected
                  ? "bg-primary-50 border-primary-500 text-primary-700 shadow-2xs"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Accordion Component */}
      <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 shadow-sm">
        <Accordion items={accordionItems} defaultOpenId="faq-all-0" />
      </div>
    </div>
  );
}
