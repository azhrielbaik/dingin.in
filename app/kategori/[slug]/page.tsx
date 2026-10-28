import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getCategories, getCategoryBySlug, getProducts } from "@/lib/products";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Kategori Tidak Ditemukan",
    };
  }

  return {
    title: `${category.name} — Katalog Makanan Beku`,
    description: `${category.description} Pesan mudah langsung via WhatsApp se-Jabodetabek.`,
    openGraph: {
      title: `${category.name} | dingin.in`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allProducts = getProducts();
  const allCategories = getCategories();

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
            <li>
              <Link href="/produk" className="hover:text-primary-600 transition-colors">
                Katalog
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li className="font-semibold text-neutral-800" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="mb-8 max-w-2xl">
          <Link
            href="/produk"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Semua Katalog
          </Link>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Kategori: {category.name}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            {category.description}
          </p>
        </div>

        {/* Product Grid initialized with this category */}
        <ProductGrid
          initialProducts={allProducts}
          categories={allCategories}
          initialCategory={category.slug}
        />
      </Container>
    </div>
  );
}

