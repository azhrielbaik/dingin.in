"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      onClick={openDrawer}
      aria-label={`Buka keranjang belanja (${totalItems} item)`}
      className="relative p-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
    >
      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-promo text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-150">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  );
}

