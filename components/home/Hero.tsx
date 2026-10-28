import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { Snowflake, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export function Hero() {
  const inquiryMessage = buildGeneralInquiryMessage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-8 pb-14 sm:py-16 lg:py-20">
      {/* Decorative background circle */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent-100/60 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-primary-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-wa-500 animate-pulse" />
              <span className="text-xs font-bold text-neutral-800">
                Layanan Pesan Antar Makanan Beku Se-Jabodetabek
              </span>
            </div>

            {/* Display / Hero Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
              Stok Makanan Beku Berkualitas,{" "}
              <span className="text-primary-500">Tinggal Masak.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Dumpling ayam, nugget keju, sosis bratwurst, dan bakso sapi urat pilihan. Higienis, 100% Halal, dikemas dengan rantai dingin terjamin dan dipesan mudah langsung via WhatsApp.
            </p>

            {/* CTAs: CTA 1 (Lihat Katalog) & CTA 2 (Chat WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                href="/produk"
                className="w-full sm:w-auto font-bold"
              >
                <span>Lihat Katalog Produk</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>

              <div className="w-full sm:w-auto">
                <WhatsAppButton
                  message={inquiryMessage}
                  source="hero_section"
                  size="lg"
                  fullWidth
                >
                  Chat WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-neutral-200/80 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-frost-50 flex items-center justify-center text-frost-500 shrink-0">
                  <Snowflake className="w-4 h-4" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-neutral-900 block leading-tight">Tetap Beku</span>
                  <span className="text-neutral-500">Insulasi + Gel Pack</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-success/10 flex items-center justify-center text-success shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-neutral-900 block leading-tight">100% Halal</span>
                  <span className="text-neutral-500">Resmi LPPOM MUI</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent-100 flex items-center justify-center text-accent-500 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-neutral-900 block leading-tight">Kirim Sameday</span>
                  <span className="text-neutral-500">Tiba di Hari Sama</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1000&auto=format&fit=crop"
                alt="Sajian dumpling ayam hangat dan makanan beku siap saji dingin.in"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />

              {/* Floating Pill Overlay Badge 1 */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-neutral-100 flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-success animate-ping" />
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold block uppercase tracking-wider">
                    Kualitas Resto
                  </span>
                  <span className="text-xs font-extrabold text-neutral-900">
                    Dumpling Ayam Juicy
                  </span>
                </div>
              </div>

              {/* Floating Pill Overlay Badge 2 */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-neutral-100 flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-frost-500" />
                <span className="text-xs font-bold text-neutral-900">
                  Suhu Aman −18 °C
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
