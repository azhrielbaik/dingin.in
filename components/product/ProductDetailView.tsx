"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, Variant } from "@/types";
import { ProductGallery } from "./ProductGallery";
import { VariantPicker } from "./VariantPicker";
import { QuantityStepper } from "./QuantityStepper";
import { ProductInfoTabs } from "./ProductInfoTabs";
import { StickyMobileBar } from "./StickyMobileBar";
import { formatRupiah } from "@/lib/format";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildSingleProductOrderMessage, buildProductInquiryMessage } from "@/lib/whatsapp";
import { useCart } from "@/components/cart/CartProvider";
import { Info, ShoppingBag, ShieldCheck, Truck, ChevronRight } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const { addItem } = useCart();

  const isSoldout = product.status === "soldout";
  const unitPrice = selectedVariant.price;
  const totalPrice = unitPrice * quantity;
  const comparePrice = selectedVariant.comparePrice;

  // Build WhatsApp order message
  const orderMessage = isSoldout
    ? buildProductInquiryMessage(product.name)
    : buildSingleProductOrderMessage(product, selectedVariant, quantity);

  const handleAddToCart = () => {
    if (isSoldout) return;
    addItem(
      {
        productSlug: product.slug,
        productName: product.name,
        variantId: selectedVariant.id,
        variantLabel: selectedVariant.label,
        price: selectedVariant.price,
        comparePrice: selectedVariant.comparePrice,
        image: product.images[0],
      },
      quantity
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-xs text-neutral-500 flex-wrap">
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
          <li className="font-semibold text-neutral-800 line-clamp-1" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Main 2-Column Product Layout (Design 7.4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={product.images}
            productName={product.name}
            halal={product.halal}
            status={product.status}
            badges={product.badges}
          />
        </div>

        {/* Right Column: Details & Order Controls */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            {/* Category and badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                {product.category.replace("-", " & ")}
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs text-neutral-500">
                {product.netWeight} {product.pieces ? `· ${product.pieces}` : ""}
              </span>
            </div>

            {/* Product Title H1 */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug mb-3">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 mb-6">
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                  {formatRupiah(unitPrice)}
                </span>
                {comparePrice && (
                  <span className="text-sm sm:text-base text-neutral-400 line-through">
                    {formatRupiah(comparePrice)}
                  </span>
                )}
                {comparePrice && (
                  <span className="text-xs font-bold text-promo bg-promo/10 px-2 py-0.5 rounded-md">
                    Hemat {formatRupiah(comparePrice - unitPrice)}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Harga per kemasan ({selectedVariant.label})
              </p>
            </div>

            {/* Variant Picker */}
            <div className="mb-5">
              <VariantPicker
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelect={setSelectedVariant}
              />
            </div>

            {/* Quantity Stepper */}
            {!isSoldout && (
              <div className="mb-6">
                <QuantityStepper
                  quantity={quantity}
                  onChange={setQuantity}
                />
              </div>
            )}

            {/* Total Estimation */}
            {!isSoldout && (
              <div className="flex items-center justify-between py-3 border-t border-b border-neutral-100 mb-6 text-sm">
                <span className="text-neutral-600 font-medium">
                  Estimasi Total ({quantity} kemasan):
                </span>
                <span className="text-xl font-extrabold text-neutral-900">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            )}

            {/* Action Buttons: WhatsApp Order (wa-700) and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
              <div className="w-full flex-1">
                <WhatsAppButton
                  message={orderMessage}
                  source="product_detail_page"
                  productName={product.name}
                  variantLabel={selectedVariant.label}
                  value={totalPrice}
                  isSoldout={isSoldout}
                  size="lg"
                  fullWidth
                >
                  {isSoldout ? "Tanya Ketersediaan via WA" : "Pesan via WhatsApp"}
                </WhatsAppButton>
              </div>

              {!isSoldout && (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full sm:w-auto h-13 px-5 rounded-lg border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Tambah Keranjang</span>
                </button>
              )}
            </div>

            {/* Price Note (PRD D-08, Design 8.10) */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-frost-50 border border-frost-500/20 text-xs text-neutral-600">
              <Info className="w-4 h-4 text-frost-500 shrink-0 mt-0.5" />
              <span>
                Harga belum termasuk ongkir. Total akhir dan ketersediaan stok akan dikonfirmasi langsung oleh admin di WhatsApp.
              </span>
            </div>
          </div>

          {/* Value Assurance Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>100% Halal Resmi LPPOM MUI</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary-500" />
              <span>Kirim Sameday & Instan Jabodetabek</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Deskripsi, Komposisi, Cara Simpan, Cara Masak */}
      <div className="mb-14">
        <ProductInfoTabs product={product} />
      </div>

      {/* Mobile Sticky Bar (Design 7.4) */}
      <StickyMobileBar
        product={product}
        selectedVariant={selectedVariant}
        quantity={quantity}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
