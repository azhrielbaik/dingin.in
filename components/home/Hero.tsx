"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { ArrowRight } from "lucide-react";
import {
  IceCrystal3DIcon,
  HalalShield3DIcon,
  SpeedDelivery3DIcon,
} from "@/components/icons/3d/Trust3DIcons";

const heroImages = [
  "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585325701165-351af916e581?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=1600&auto=format&fit=crop",
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inquiryMessage = buildGeneralInquiryMessage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden -mt-[68px] sm:-mt-[80px] pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-36 lg:pb-48">
      {/* Background Slideshow of Food Images */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="Aneka sajian makanan beku dingin.in"
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}

        {/* Subtle Dark Gradient Overlay: keeps food appetizing & vibrant on right, makes text razor sharp on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-900/60 to-neutral-900/20 sm:from-neutral-950/80 sm:via-neutral-900/40 sm:to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl lg:max-w-3xl space-y-6 text-center lg:text-left">
          {/* Display / Hero Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
            <span className="text-yellow-400">Stok Makanan Beku Berkualitas,</span>{" "}
            <span className="text-white">Tinggal Masak.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-neutral-200 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
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
              <ArrowRight className="w-4 h-4 ml-1" />
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
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/20 text-left max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <IceCrystal3DIcon className="w-5 h-5 drop-shadow-xs" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <span className="font-bold text-white block leading-tight">Tetap Beku</span>
                <span className="text-neutral-300">Insulasi + Gel Pack</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <HalalShield3DIcon className="w-5 h-5 drop-shadow-xs" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <span className="font-bold text-white block leading-tight">100% Halal</span>
                <span className="text-neutral-300">Resmi LPPOM MUI</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                <SpeedDelivery3DIcon className="w-5 h-5 drop-shadow-xs" />
              </div>
              <div className="text-[11px] sm:text-xs">
                <span className="font-bold text-white block leading-tight">Kirim Sameday</span>
                <span className="text-neutral-300">Tiba di Hari Sama</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
