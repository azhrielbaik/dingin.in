"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatRupiah } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { ColdChainBadge } from "@/components/ui/ColdChainBadge";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildSingleProductOrderMessage, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isSoldout = product.status === "soldout";
  const defaultVariant = product.variants[0];

  // Min price among variants
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const hasMultiplePrices =
    product.variants.length > 1 &&
    Math.min(...product.variants.map((v) => v.price)) !==
      Math.max(...product.variants.map((v) => v.price));

  const comparePrice = defaultVariant.comparePrice;

  // Build WhatsApp order message for quick order button
  const orderMessage = isSoldout
    ? buildProductInquiryMessage(product.name)
    : buildSingleProductOrderMessage(product, defaultVariant, 1);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Clickable Image Area */}
      <Link
        href={`/produk/${product.slug}`}
        className="relative aspect-square w-full bg-neutral-100 overflow-hidden block"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badges?.includes("promo") && (
            <Badge variant="promo">PROMO</Badge>
          )}
          {product.badges?.includes("bestseller") && (
            <Badge variant="bestseller">TERLARIS</Badge>
          )}
          {product.badges?.includes("new") && (
            <Badge variant="new">BARU</Badge>
          )}
        </div>

        {product.halal && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <Badge variant="halal">HALAL</Badge>
          </div>
        )}

        {/* Soldout Overlay */}
        {isSoldout && (
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 z-20">
            <Badge variant="soldout" size="md">
              STOK HABIS
            </Badge>
            <span className="text-[11px] text-white/90 font-medium mt-1 text-center">
              Akan restock segera
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-primary-600 line-clamp-2 transition-colors mb-1">
          <Link href={`/produk/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Weight & Pieces subtitle */}
        <p className="text-xs text-neutral-500 mb-2.5">
          {product.netWeight} {product.pieces ? `· ${product.pieces}` : ""}
        </p>

        {/* Price */}
        <div className="mt-auto mb-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-base sm:text-lg font-extrabold text-neutral-900">
              {hasMultiplePrices ? `Mulai ${formatRupiah(minPrice)}` : formatRupiah(minPrice)}
            </span>
            {comparePrice && (
              <span className="text-xs text-neutral-400 line-through">
                {formatRupiah(comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Cold chain badge */}
        <div className="mb-3.5">
          <ColdChainBadge size="sm" />
        </div>

        {/* Action Button: Quick order via WhatsApp */}
        <div className="pt-2 border-t border-neutral-100">
          <WhatsAppButton
            message={orderMessage}
            source="product_card"
            productName={product.name}
            variantLabel={defaultVariant.label}
            value={minPrice}
            isSoldout={isSoldout}
            size="sm"
            fullWidth
          >
            {isSoldout ? "Tanya Stok" : "Pesan via WA"}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}

