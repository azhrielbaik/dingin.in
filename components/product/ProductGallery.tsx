"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ColdChainBadge } from "@/components/ui/ColdChainBadge";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  halal?: boolean;
  status?: "available" | "soldout";
  badges?: ("promo" | "bestseller" | "new")[];
}

export function ProductGallery({
  images,
  productName,
  halal,
  status,
  badges,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeImage = images[selectedIndex] || images[0];
  const isSoldout = status === "soldout";

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
        <Image
          src={activeImage}
          alt={`${productName} - foto ${selectedIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
          {badges?.includes("promo") && <Badge variant="promo">PROMO DISKON</Badge>}
          {badges?.includes("bestseller") && <Badge variant="bestseller">TERLARIS</Badge>}
          {badges?.includes("new") && <Badge variant="new">PRODUK BARU</Badge>}
        </div>

        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
          {halal && <Badge variant="halal">100% HALAL</Badge>}
          <ColdChainBadge text="Rantai Dingin" />
        </div>

        {/* Soldout Overlay */}
        {isSoldout && (
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 z-20 text-center">
            <Badge variant="soldout" size="md">
              STOK SAAT INI HABIS
            </Badge>
            <p className="text-sm text-white/90 font-medium mt-2 max-w-xs">
              Hubungi admin via WhatsApp untuk info jadwal batch produksi berikutnya
            </p>
          </div>
        )}
      </div>

      {/* Thumbnails (min 3 photos per PRD D-01) */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Lihat foto ${idx + 1} dari ${productName}`}
                className={cn(
                  "relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 border-2 transition-all shrink-0 cursor-pointer",
                  isSelected
                    ? "border-primary-500 ring-2 ring-primary-100"
                    : "border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100"
                )}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

