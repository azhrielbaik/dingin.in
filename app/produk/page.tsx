import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProducts, getCategories } from "@/lib/products";
import { Snowflake, ChevronRight, MessageSquareQuote } from "lucide-react";

export const metadata: Metadata = {
  title: "Katalog Makanan Beku Lengkap",
  description:
    "Jelajahi aneka dumpling ayam, siomay, nugget renyah, sosis bratwurst, dan bakso sapi urat. Pilihan varian lengkap dan pemesanan via WhatsApp.",
  openGraph: {
    title: "Katalog Makanan Beku Lengkap | dingin.in",
    description: "Pilihan lengkap aneka makanan beku higienis & 100% Halal siap kirim ke rumah Anda.",
  },
};

export default function ProdukPage() {
  const products = getProducts();
  const categories = getCategories();

  return (
    <div className="py-8 sm:py-12 bg-white">
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
              Katalog Produk
            </li>
          </ol>
        </nav>

        {/* Catalog Header */}
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-frost-50 text-frost-500 border border-frost-500/20 text-xs font-bold mb-2">
            <Snowflake className="w-3.5 h-3.5" />
            <span>Koleksi Terlengkap</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Katalog Makanan Beku Pilihan
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Cari lauk dan camilan favorit keluarga Anda. Semua produk dikemas beku dengan rantai dingin higienis dan siap dikirim via WhatsApp.
          </p>
        </div>

        {/* Client Product Grid with Filter, Search, and Sort */}
        <ProductGrid initialProducts={products} categories={categories} />

        {/* Bottom Helper Banner */}
        <div className="mt-14 p-5 sm:p-6 rounded-2xl bg-frost-50 border border-frost-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-primary-500 flex items-center justify-center shrink-0 border border-neutral-200">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-neutral-900">
                Punya Pertanyaan Khusus Seputar Produk atau Katering?
              </h3>
              <p className="text-xs text-neutral-600">
                Admin kami siap membantu pesanan partai besar / katering dan konsultasi pengiriman.
              </p>
            </div>
          </div>

          <Link
            href="/kontak"
            className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-xs sm:text-sm font-bold text-primary-600 transition-colors shadow-2xs"
          >
            Hubungi Layanan Pelanggan →
          </Link>
        </div>
      </Container>
    </div>
  );
}

