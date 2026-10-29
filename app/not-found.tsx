import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Snowflake, ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 bg-white flex items-center justify-center min-h-[60vh]">
      <Container>
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Fun 404 Ice Illustration */}
          <div className="relative w-24 h-24 mx-auto rounded-3xl bg-frost-50 flex items-center justify-center text-primary-500 shadow-sm">
            <Snowflake className="w-12 h-12 text-frost-500 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-primary-600 text-white font-extrabold text-xs shadow-xs">
              404
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Ups, Halaman Tidak Ditemukan!
            </h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Tautan yang Anda tuju mungkin sudah dipindahkan atau produk tersebut telah kami perbarui.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="primary" size="md" href="/">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              <span>Kembali ke Beranda</span>
            </Button>
            <Button variant="secondary" size="md" href="/produk">
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span>Buka Katalog Produk</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
