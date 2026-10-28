"use client";

import React from "react";
import { Product, Variant } from "@/types";
import { formatRupiah } from "@/lib/format";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildSingleProductOrderMessage, buildProductInquiryMessage } from "@/lib/whatsapp";
import { ShoppingBag } from "lucide-react";

interface StickyMobileBarProps {
  product: Product;
  selectedVariant: Variant;
  quantity: number;
  onAddToCart: () => void;
}

export function StickyMobileBar({
  product,
  selectedVariant,
  quantity,
  onAddToCart,
}: StickyMobileBarProps) {
  const isSoldout = product.status === "soldout";
  const totalPrice = selectedVariant.price * quantity;

  const orderMessage = isSoldout
    ? buildProductInquiryMessage(product.name)
    : buildSingleProductOrderMessage(product, selectedVariant, quantity);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 p-3 sm:hidden shadow-lg safe-bottom">
      <div className="flex items-center justify-between gap-3">
        {/* Estimated Price */}
        <div className="flex flex-col">
          <span className="text-[11px] text-neutral-500 font-medium">
            Estimasi ({quantity}x)
          </span>
          <span className="text-base font-extrabold text-neutral-900 leading-tight">
            {formatRupiah(totalPrice)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {!isSoldout && (
            <button
              type="button"
              onClick={onAddToCart}
              aria-label="Tambah ke keranjang"
              className="h-11 w-11 rounded-xl border border-primary-500 text-primary-500 hover:bg-primary-50 flex items-center justify-center shrink-0 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          )}

          <div className="flex-1 max-w-[210px]">
            <WhatsAppButton
              message={orderMessage}
              source="sticky_mobile_bar"
              productName={product.name}
              variantLabel={selectedVariant.label}
              value={totalPrice}
              isSoldout={isSoldout}
              size="md"
              fullWidth
            >
              {isSoldout ? "Tanya Stok" : "Pesan WA"}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}

