import React from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="space-y-6 pt-10 border-t border-neutral-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
          Produk Terkait Lainnya
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}

