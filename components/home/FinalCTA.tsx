import React from "react";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { Snowflake, ArrowRight } from "lucide-react";

export function FinalCTA() {
  const message = buildGeneralInquiryMessage();

  return (
    <section className="py-16 sm:py-20 bg-primary-700 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary-500/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-600/60 border border-primary-500 text-accent-400 text-xs font-bold">
            <Snowflake className="w-4 h-4 text-accent-400" />
            Praktis, Cepat, dan Halal
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Siap Penuhi Stok Freezer Keluarga Anda Hari Ini?
          </h2>

          <p className="text-base sm:text-lg text-primary-100 max-w-xl mx-auto leading-relaxed">
            Tak perlu bingung mau masak apa besok. Stok dumpling lezat, nugget keju renyah, dan sosis jumbo siap saji langsung dari kulkas Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <div className="w-full sm:w-auto">
              <WhatsAppButton
                message={message}
                source="final_cta"
                size="lg"
                fullWidth
              >
                Pesan Sekarang via WhatsApp
              </WhatsAppButton>
            </div>

            <Button
              variant="secondary"
              size="lg"
              href="/produk"
              className="w-full sm:w-auto bg-transparent text-white border-white/70 hover:bg-white/10"
            >
              <span>Jelajahi Semua Produk</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <p className="text-xs text-primary-100/70 pt-2">
            Bebas minimum order · Pengiriman cepat instan/sameday Jabodetabek · Respon admin cepat
          </p>
        </div>
      </Container>
    </section>
  );
}

