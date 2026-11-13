import React from "react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight } from "lucide-react";
import {
  Dimsum3DIcon,
  NuggetSosis3DIcon,
  Bakso3DIcon,
  Seafood3DIcon,
  Snack3DIcon,
} from "@/components/icons/3d/Category3DIcons";

export function CategoryNav() {
  const iconMap: Record<string, React.ReactNode> = {
    "dimsum-dumpling": <Dimsum3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />,
    "nugget-sosis": <NuggetSosis3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />,
    "bakso-siomay": <Bakso3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />,
    "seafood-ikan": <Seafood3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />,
    "camilan-beku": <Snack3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs transition-transform group-hover:scale-110 duration-200" />,
    // Key by cat.icon fallback
    UtensilsCrossed: <Dimsum3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />,
    Beef: <NuggetSosis3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />,
    Soup: <Bakso3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />,
    Fish: <Seafood3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />,
    Cookie: <Snack3DIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-xs" />,
  };

  return (
    <section className="py-4 sm:py-5 bg-white border-b border-neutral-100">
      <Container>
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h2 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight">
            Kategori Makanan Beku
          </h2>
          <Link
            href="/produk"
            className="text-[11px] sm:text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 group"
          >
            Lihat Semua
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Compact scrollable on mobile, 5-col on desktop */}
        <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 scrollbar-none sm:grid sm:grid-cols-5">
          {categories.map((cat, idx) => (
            <RevealOnScroll
              key={cat.slug}
              delayMs={idx * 60}
              className="shrink-0 w-20 sm:w-auto"
            >
              <Link
                href={`/kategori/${cat.slug}`}
                className="flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl hover:bg-neutral-50/80 border border-transparent hover:border-neutral-200/80 transition-all w-full group cursor-pointer hover:-translate-y-0.5"
              >
                {/* 3D Glossy Icon Container */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-b from-white to-neutral-50/90 border border-neutral-200/80 shadow-xs group-hover:shadow-md group-hover:border-primary-200 group-hover:from-white group-hover:to-primary-50/30 flex items-center justify-center mb-1.5 transition-all duration-200">
                  {iconMap[cat.slug] || iconMap[cat.icon] || <Dimsum3DIcon className="w-6 h-6 sm:w-7 sm:h-7" />}
                </div>

                <span className="font-semibold text-[11px] sm:text-xs text-neutral-800 group-hover:text-primary-600 line-clamp-1 leading-tight">
                  {cat.name}
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
