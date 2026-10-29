"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types";
import { formatRupiah } from "@/lib/format";
import { useCart } from "./CartProvider";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem, closeDrawer } = useCart();

  return (
    <div className="flex gap-3 py-3 border-b border-neutral-100 last:border-b-0 items-center">
      {/* Thumbnail */}
      <Link
        href={`/produk/${item.productSlug}`}
        onClick={closeDrawer}
        className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 shrink-0 shadow-2xs"
      >
        <Image
          src={item.image}
          alt={item.productName}
          fill
          sizes="64px"
          className="object-cover"
        />
      </Link>

      {/* Info & Quantity */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/produk/${item.productSlug}`}
          onClick={closeDrawer}
          className="font-semibold text-sm text-neutral-900 hover:text-primary-600 line-clamp-1 block"
        >
          {item.productName}
        </Link>
        <div className="text-xs text-neutral-500 mb-1">{item.variantLabel}</div>
        <div className="text-sm font-bold text-neutral-900">
          {formatRupiah(item.price)}
        </div>
      </div>

      {/* Stepper & Delete */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <button
          onClick={() => removeItem(item.variantId)}
          aria-label={`Hapus ${item.productName} dari keranjang`}
          className="text-neutral-400 hover:text-danger p-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
          <button
            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
            aria-label="Kurangi jumlah"
            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-l-lg transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-neutral-900">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
            aria-label="Tambah jumlah"
            className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 rounded-r-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

