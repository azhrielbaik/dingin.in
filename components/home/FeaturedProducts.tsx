import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Flame } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-12 sm:py-16 bg-neutral-50/60">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-promo tracking-wide uppercase mb-1">
              <Flame className="w-4 h-4 fill-promo text-promo" />
              Paling Sering Dipesan
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Produk Terlaris & Unggulan
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-1 max-w-xl">
              Pilihan favorit ribuan keluarga untuk stok lauk harian praktis, sarapan cepat, dan camilan nikmat.
            </p>
          </div>

          <Link
            href="/produk"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-primary-600 hover:text-primary-700 group"
          >
            Lihat Semua Produk
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="text-center sm:hidden">
          <Button variant="secondary" href="/produk" fullWidth>
            Lihat Semua Katalog Produk
          </Button>
        </div>
      </Container>
    </section>
  );
}

