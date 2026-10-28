"use client";

import React, { useState, useMemo } from "react";
import { Product, Category } from "@/types";
import { ProductCard } from "./ProductCard";
import { Search, X, SlidersHorizontal, MessageCircle } from "lucide-react";
import { filterAndSortProducts, SortOption } from "@/lib/products";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

interface ProductGridProps {
  initialProducts: Product[];
  categories: Category[];
  initialCategory?: string;
}

export function ProductGrid({
  initialProducts,
  categories,
  initialCategory = "all",
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [halalOnly, setHalalOnly] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(initialProducts, {
      category: selectedCategory,
      search: searchQuery,
      halalOnly,
      sort: sortOption,
    });
  }, [initialProducts, selectedCategory, searchQuery, halalOnly, sortOption]);

  const activeCategoryObject = categories.find((c) => c.slug === selectedCategory);

  const hasActiveFilters =
    selectedCategory !== "all" || searchQuery.trim() !== "" || halalOnly;

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setHalalOnly(false);
    setSortOption("featured");
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input (PRD K-03, Design 8.3) */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari dumpling, nugget, sosis, bakso..."
            className="w-full h-11 pl-10 pr-9 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort and Halal Controls */}
        <div className="flex items-center gap-2.5">
          {/* Halal Toggle Chip */}
          <button
            type="button"
            onClick={() => setHalalOnly(!halalOnly)}
            className={cn(
              "h-11 px-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer flex items-center gap-1.5 select-none",
              halalOnly
                ? "bg-success/10 border-success text-success"
                : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
            )}
          >
            <span>Halal Only</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              aria-label="Urutkan produk"
              className="h-11 px-3.5 pr-8 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm font-semibold text-neutral-700 focus:outline-none focus:border-primary-500 cursor-pointer appearance-none"
            >
              <option value="featured">Paling Populer</option>
              <option value="price-asc">Harga: Termurah</option>
              <option value="price-desc">Harga: Termahal</option>
              <option value="newest">Produk Terbaru</option>
            </select>
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills (Design 8.4) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "h-9 px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer",
            selectedCategory === "all"
              ? "bg-primary-50 border-primary-500 text-primary-700 shadow-2xs"
              : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
          )}
        >
          Semua Produk ({initialProducts.length})
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          const count = initialProducts.filter((p) => p.category === cat.slug).length;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={cn(
                "h-9 px-4 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer",
                isSelected
                  ? "bg-primary-50 border-primary-500 text-primary-700 shadow-2xs"
                  : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
              )}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Active Filter Indicators & Results Count */}
      <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
        <span>
          Menampilkan <strong className="text-neutral-900 font-bold">{filteredProducts.length}</strong> produk makanan beku
          {activeCategoryObject && ` dalam kategori "${activeCategoryObject.name}"`}
        </span>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer underline"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* Product Cards Grid (PRD K-01) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State (PRD K-08, Design 7.3) */
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-neutral-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-sm text-neutral-500 mb-6">
            Kami tidak menemukan produk yang cocok dengan &quot;{searchQuery}&quot;. Ingin mencari produk tertentu yang belum ada di katalog?
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <button
              onClick={resetFilters}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-white text-sm font-semibold transition-colors"
            >
              Hapus Filter
            </button>
            <a
              href={buildWhatsAppUrl(
                `Halo dingin.in, saya mencari produk "${searchQuery || "makanan beku tertentu"}" apakah tersedia?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "empty_catalog_search" })}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-wa-700 hover:bg-wa-800 text-white text-sm font-semibold transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tanya Admin via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
