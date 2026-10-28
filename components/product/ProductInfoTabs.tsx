"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { Snowflake, Flame, CookingPot, Wind, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductInfoTabsProps {
  product: Product;
}

export function ProductInfoTabs({ product }: ProductInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<"detail" | "simpan" | "masak">("detail");

  const cookingMethodIcons = {
    goreng: <Flame className="w-5 h-5 text-promo" />,
    kukus: <CookingPot className="w-5 h-5 text-primary-500" />,
    "air-fryer": <Wind className="w-5 h-5 text-accent-500" />,
    rebus: <CookingPot className="w-5 h-5 text-frost-500" />,
  };

  const cookingMethodLabels = {
    goreng: "Goreng (Pan/Deep-Fry)",
    kukus: "Kukus (Steamer)",
    "air-fryer": "Air Fryer",
    rebus: "Rebus / Kuah",
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-2xs">
      {/* Tab navigation headers */}
      <div className="flex border-b border-neutral-200 bg-neutral-50 overflow-x-auto">
        <button
          onClick={() => setActiveTab("detail")}
          className={cn(
            "px-5 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer",
            activeTab === "detail"
              ? "text-primary-600 bg-white"
              : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          Deskripsi & Komposisi
          {activeTab === "detail" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("simpan")}
          className={cn(
            "px-5 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer",
            activeTab === "simpan"
              ? "text-primary-600 bg-white"
              : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          ❄ Cara Penyimpanan
          {activeTab === "simpan" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("masak")}
          className={cn(
            "px-5 py-3.5 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer",
            activeTab === "masak"
              ? "text-primary-600 bg-white"
              : "text-neutral-500 hover:text-neutral-900"
          )}
        >
          🍳 Panduan Masak
          {activeTab === "masak" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
          )}
        </button>
      </div>

      {/* Tab Content Panels */}
      <div className="p-5 sm:p-6">
        {/* Panel 1: Detail & Komposisi */}
        {activeTab === "detail" && (
          <div className="space-y-4 text-sm text-neutral-700 leading-relaxed">
            <p>{product.description}</p>

            {product.composition && (
              <div className="pt-3 border-t border-neutral-100">
                <h4 className="font-bold text-neutral-900 mb-1 text-xs uppercase tracking-wide">
                  Komposisi Bahan:
                </h4>
                <p className="text-neutral-600 text-xs sm:text-sm">{product.composition}</p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-100 text-xs">
              <div>
                <span className="text-neutral-400 block font-medium">Berat Bersih:</span>
                <span className="font-bold text-neutral-800">{product.netWeight}</span>
              </div>
              {product.pieces && (
                <div>
                  <span className="text-neutral-400 block font-medium">Isi Kemasan:</span>
                  <span className="font-bold text-neutral-800">{product.pieces}</span>
                </div>
              )}
              {product.halal && (
                <div>
                  <span className="text-neutral-400 block font-medium">Status Halal:</span>
                  <span className="font-bold text-success inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Terverifikasi Halal
                  </span>
                </div>
              )}
            </div>

            {product.halalInfo && (
              <div className="text-[11px] text-neutral-500 italic">
                Nomor Sertifikasi: {product.halalInfo}
              </div>
            )}
          </div>
        )}

        {/* Panel 2: Cara Penyimpanan */}
        {activeTab === "simpan" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-frost-50 border border-frost-500/20 flex items-start gap-3">
              <Snowflake className="w-6 h-6 text-frost-500 shrink-0 mt-0.5" />
              <div className="space-y-1.5 text-sm">
                <h4 className="font-bold text-neutral-900">
                  Panduan Menjaga Kesegaran Produk Beku
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  {product.storage}
                </p>
                <div className="font-semibold text-primary-700 text-xs pt-1">
                  ⚠️ Penting: Segera masukkan ke dalam freezer saat paket kurir diterima.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600">
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">
                  Suhu Freezer (−18 °C s/d −20 °C)
                </span>
                Tahan optimal hingga tanggal kadaluarsa yang tertera di kemasan (4–8 bulan).
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">
                  Suhu Kulkas Bawah / Chiller (2 °C s/d 5 °C)
                </span>
                Jika sudah dipindahkan ke kulkas bawah untuk dicairkan, masak dalam waktu 24–48 jam.
              </div>
            </div>
          </div>
        )}

        {/* Panel 3: Panduan Memasak */}
        {activeTab === "masak" && (
          <div className="space-y-3">
            <h4 className="font-bold text-neutral-900 text-sm mb-2">
              Saran Penyajian Terbaik:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.cooking.map((guide, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/70"
                >
                  <div className="p-2 rounded-lg bg-white border border-neutral-200 shrink-0 shadow-2xs">
                    {cookingMethodIcons[guide.method] || <Flame className="w-5 h-5 text-primary-500" />}
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-xs uppercase tracking-wide text-neutral-900 block">
                      {cookingMethodLabels[guide.method] || guide.method}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                      {guide.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-neutral-400 italic pt-2">
              *Sebagian besar produk tidak perlu dicairkan terlalu lama (langsung masak dari freezer untuk hasil terbaik).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

