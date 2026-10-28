import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import {
  UtensilsCrossed,
  Beef,
  Soup,
  Fish,
  Cookie,
  ArrowRight,
} from "lucide-react";

export function CategoryNav() {
  const iconMap: Record<string, React.ReactNode> = {
    UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-primary-500" />,
    Beef: <Beef className="w-6 h-6 text-primary-500" />,
    Soup: <Soup className="w-6 h-6 text-primary-500" />,
    Fish: <Fish className="w-6 h-6 text-primary-500" />,
    Cookie: <Cookie className="w-6 h-6 text-primary-500" />,
  };

  return (
    <section className="py-8 bg-white border-y border-neutral-100">
      <Container>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">
            Jelajahi Kategori Makanan Beku
          </h2>
          <Link
            href="/produk"
            className="text-xs sm:text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
          >
            Semua Produk
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Scrollable on mobile, grid on desktop */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/kategori/${cat.slug}`}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-200 transition-all shrink-0 w-28 sm:w-auto group cursor-pointer"
            >
              {/* Circular icon in primary-50 */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-2.5 transition-colors shadow-2xs group-hover:scale-105 duration-200">
                {iconMap[cat.icon] || <UtensilsCrossed className="w-6 h-6 text-primary-500" />}
              </div>

              <span className="font-bold text-xs sm:text-sm text-neutral-800 group-hover:text-primary-600 line-clamp-2 leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

