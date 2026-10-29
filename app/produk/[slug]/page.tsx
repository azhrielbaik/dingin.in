import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";

export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
    };
  }

  const defaultVariant = product.variants[0];
  const priceFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(defaultVariant.price);

  return {
    title: `${product.name} — Beli via WhatsApp`,
    description: `${product.description.slice(0, 150)}... Mulai dari ${priceFormatted}. Dikirim tetap beku via WhatsApp Jabodetabek.`,
    openGraph: {
      title: `${product.name} | dingin.in`,
      description: `${product.description.slice(0, 150)}... Mulai ${priceFormatted}.`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(slug, product.category, 4);

  // Schema.org Product structured data (PRD 11)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.slug,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...product.variants.map((v) => v.price)),
      highPrice: Math.max(...product.variants.map((v) => v.price)),
      offerCount: product.variants.length,
      availability:
        product.status === "available"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="py-8 sm:py-12 bg-white pb-24 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <ProductDetailView product={product} />
        <RelatedProducts products={relatedProducts} />
      </Container>
    </div>
  );
}
