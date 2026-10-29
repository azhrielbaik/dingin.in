"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Info, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { CartItemRow } from "./CartItemRow";
import { formatRupiah } from "@/lib/format";
import { buildCartOrderMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, subtotal, totalItems, clearCart } = useCart();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const orderMessage = buildCartOrderMessage(items);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity duration-200"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Drawer content: bottom sheet on mobile, slide from right on desktop */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keranjang Belanja"
        className="relative w-full sm:max-w-md h-[90vh] sm:h-full mt-auto sm:mt-0 bg-white rounded-t-2xl sm:rounded-none sm:rounded-l-2xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom sm:slide-in-from-right duration-250"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary-500" />
            <h2 className="font-bold text-lg text-neutral-900">
              Keranjang Pesanan ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Tutup keranjang"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-neutral-900 mb-1">
              Keranjang Masih Kosong
            </h3>
            <p className="text-sm text-neutral-500 max-w-xs mb-6">
              Yuk, lihat aneka pilihan makanan beku lezat kami dan simpan stok di kulkasmu!
            </p>
            <Button
              variant="primary"
              onClick={closeDrawer}
              href="/produk"
            >
              Mulai Belanja di Katalog
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 divide-y divide-neutral-100">
              {items.map((item) => (
                <CartItemRow key={item.variantId} item={item} />
              ))}
            </div>

            {/* Footer Summary & WhatsApp Order CTA */}
            <div className="p-5 border-t border-neutral-100 bg-neutral-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600 font-medium">
                  Estimasi Subtotal
                </span>
                <span className="text-lg font-extrabold text-neutral-900">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              {/* Note about delivery calculation */}
              <div className="flex items-start gap-1.5 p-2.5 rounded-lg bg-frost-50 text-xs text-neutral-600 mb-4">
                <Info className="w-4 h-4 text-frost-500 shrink-0 mt-0.5" />
                <span>
                  Harga di atas belum termasuk ongkir. Total final dan ketersediaan stok akan dikonfirmasi langsung oleh admin di WhatsApp.
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <WhatsAppButton
                  message={orderMessage}
                  source="cart_drawer"
                  size="lg"
                  fullWidth
                >
                  Kirim Pesanan ke WhatsApp
                </WhatsAppButton>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={clearCart}
                    className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-danger transition-colors font-medium cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Kosongkan keranjang
                  </button>

                  <Link
                    href="/keranjang"
                    onClick={closeDrawer}
                    className="text-xs text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Buka halaman keranjang →
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

