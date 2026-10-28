"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { useCart } from "@/components/cart/CartProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { formatRupiah } from "@/lib/format";
import { buildCartOrderMessage } from "@/lib/whatsapp";
import {
  ShoppingBag,
  Trash2,
  Info,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

export default function KeranjangPage() {
  const { items, subtotal, totalItems, clearCart } = useCart();

  const orderMessage = buildCartOrderMessage(items);

  return (
    <div className="py-8 sm:py-12 bg-neutral-50/50 min-h-[75vh]">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li className="font-semibold text-neutral-800" aria-current="page">
              Keranjang Pesanan
            </li>
          </ol>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Keranjang Belanja
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {totalItems > 0
                ? `Terdapat ${totalItems} item makanan beku di keranjang belanja Anda`
                : "Keranjang belanja Anda saat ini masih kosong"}
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-danger transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Kosongkan Semua</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4 text-primary-500">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              Keranjang Masih Kosong
            </h2>
            <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
              Anda belum menambahkan makanan beku apapun. Jelajahi katalog kami untuk menemukan aneka dumpling, nugget crispy, sosis bratwurst, dan bakso urat.
            </p>
            <Button variant="primary" size="lg" href="/produk">
              Lihat Katalog Produk Sekarang
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items list */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-2">
                <span className="font-bold text-sm text-neutral-900">Daftar Produk</span>
                <span className="text-xs text-neutral-500">{totalItems} kemasan</span>
              </div>

              <div className="divide-y divide-neutral-100">
                {items.map((item) => (
                  <CartItemRow key={item.variantId} item={item} />
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  href="/produk"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Tambah Produk Lainnya
                </Link>
              </div>
            </div>

            {/* Right Column: Order Summary & WhatsApp CTA */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5">
              <h2 className="font-bold text-base text-neutral-900 pb-3 border-b border-neutral-100">
                Ringkasan Estimasi Pesanan
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between text-neutral-600">
                  <span>Subtotal Produk ({totalItems} item)</span>
                  <span className="font-bold text-neutral-900">{formatRupiah(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-neutral-600">
                  <span>Ongkos Kirim</span>
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                    Dihitung di WhatsApp
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-base text-neutral-900 block">
                      Estimasi Total Akhir
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      *Belum termasuk ongkos kirim
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-primary-600">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>

              {/* Info Note (Design 8.10) */}
              <div className="p-3.5 rounded-xl bg-frost-50 border border-frost-500/20 text-xs text-neutral-600 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-frost-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Semua pesanan dikirim dari Rawa Belong, Jakarta Barat. Estimasi ongkir, ketersediaan stok, dan metode pembayaran akan dirincikan oleh admin langsung di chat WhatsApp.
                </p>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="space-y-2 pt-1">
                <WhatsAppButton
                  message={orderMessage}
                  source="cart_page"
                  size="lg"
                  fullWidth
                >
                  Kirim Pesanan ke WhatsApp
                </WhatsAppButton>
                <p className="text-[11px] text-neutral-400 text-center">
                  Chat WhatsApp akan terbuka dengan format daftar pesanan terisi otomatis.
                </p>
              </div>

              {/* Guarantees */}
              <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  <span>Garansi Penggantian jika Produk Tiba Mencair</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary-500" />
                  <span>Kemasan Insulasi Rantai Dingin + Ice Gel Pack</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

