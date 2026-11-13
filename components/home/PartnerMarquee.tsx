import React from "react";

interface PartnerItem {
  id: string;
  name: string;
  logo: React.ReactNode;
}

function GoSendLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="16" fill="#00AA13" />
        <circle cx="16" cy="16" r="8" stroke="#FFFFFF" strokeWidth="3.2" fill="none" />
        <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
      </svg>
      <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-neutral-900">
        go<span className="text-[#00AA13]">send</span>
      </span>
    </div>
  );
}

function GrabExpressLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#00B14F" />
        <path
          d="M21 11.5c-1.2-1.5-3-2.5-5.2-2.5-3.8 0-6.8 3.1-6.8 7s3 7 6.8 7c3.3 0 6-2.3 6.6-5.4h-3.2c-.5 1.5-1.8 2.6-3.4 2.6-2 0-3.6-1.7-3.6-3.8s1.6-3.8 3.6-3.8c1.1 0 2.1.5 2.7 1.3L21 11.5z"
          fill="#FFFFFF"
        />
        <circle cx="21.5" cy="15.8" r="1.5" fill="#FFFFFF" />
      </svg>
      <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#00B14F]">
        Grab<span className="font-bold text-neutral-800">Express</span>
      </span>
    </div>
  );
}

function PaxelLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#5E2784" />
        <path d="M16 8.5l7 4-7 4-7-4 7-4z" fill="#FFFFFF" />
        <path d="M9 12.5l7 4v8l-7-4v-8z" fill="#FA6400" />
        <path d="M16 16.5l7-4v8l-7 4v-8z" fill="#FFFFFF" fillOpacity="0.88" />
      </svg>
      <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#5E2784]">
        paxel
      </span>
    </div>
  );
}

function LalamoveLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#F26522" />
        <path
          d="M8.5 20l4-7.5 5 1-4.5 6.5h-4.5zm5-7.5l4-5.5 6.5 2-7.5 6.5-3-3zm4.5 1.5l5.5-4.5 1.5 4-7 4v-3.5z"
          fill="#FFFFFF"
        />
        <circle cx="21" cy="9.5" r="1.2" fill="#FFFFFF" />
      </svg>
      <span className="font-black text-xl sm:text-2xl tracking-wider text-[#F26522]">
        LALAMOVE
      </span>
    </div>
  );
}

function AnterajaLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#D81B60" />
        <path
          d="M9 16.5l8-8 1.5 1.5-6.5 6.5h11v2.2H12l6.5 6.5-1.5 1.5-8-8.2z"
          fill="#FFFFFF"
        />
        <circle cx="21" cy="11" r="2" fill="#FFC107" />
      </svg>
      <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#D81B60]">
        anteraja
      </span>
    </div>
  );
}

function BorzoLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#1D4ED8" />
        <path d="M17 7l-7 10h6l-2 8 9-11h-6l2-7z" fill="#FFD200" />
      </svg>
      <span className="font-black text-xl sm:text-2xl tracking-tight text-[#1D4ED8]">
        borzo
      </span>
    </div>
  );
}

function HalalLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#672B83" />
        <path
          d="M16 6.5c-2.6 3-5.2 5.5-5.2 9 0 3 2.3 4.5 5.2 4.5s5.2-1.5 5.2-4.5c0-3.5-2.6-6-5.2-9z"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M16 9.5v8M13.5 13.5c1 1.2 2.5 1.2 5 0"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <rect x="10" y="22" width="12" height="2" rx="1" fill="#FFFFFF" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-black text-sm sm:text-base tracking-widest text-[#672B83] leading-none">
          HALAL
        </span>
        <span className="font-bold text-[9px] sm:text-[10px] text-[#672B83] tracking-tighter leading-none mt-1">
          INDONESIA
        </span>
      </div>
    </div>
  );
}

function BpomLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9 shrink-0" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0284C7" />
        <path
          d="M16 7l6 2.5v5.5c0 4.2-2.5 7.5-6 9-3.5-1.5-6-4.8-6-9V9.5L16 7z"
          fill="#FFFFFF"
        />
        <path
          d="M16 10l4 1.8v3.7c0 2.8-1.7 5-4 6-2.3-1-4-3.2-4-6v-3.7L16 10z"
          fill="#0284C7"
        />
        <path
          d="M16 12v5m-2.5-2.5h5"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-black text-sm sm:text-base tracking-wide text-[#0284C7] leading-none">
          BADAN POM
        </span>
        <span className="font-bold text-[9px] sm:text-[10px] text-neutral-400 tracking-wider leading-none mt-1">
          REPUBLIK INDONESIA
        </span>
      </div>
    </div>
  );
}

const partners: PartnerItem[] = [
  { id: "paxel", name: "Paxel", logo: <PaxelLogo /> },
  { id: "gosend", name: "GoSend", logo: <GoSendLogo /> },
  { id: "grabexpress", name: "GrabExpress", logo: <GrabExpressLogo /> },
  { id: "lalamove", name: "Lalamove", logo: <LalamoveLogo /> },
  { id: "anteraja", name: "Anteraja", logo: <AnterajaLogo /> },
  { id: "borzo", name: "Borzo", logo: <BorzoLogo /> },
  { id: "halal", name: "Halal Indonesia", logo: <HalalLogo /> },
  { id: "bpom", name: "BPOM RI", logo: <BpomLogo /> },
];

export function PartnerMarquee() {
  // Duplicate list to achieve continuous seamless loop
  const marqueeItems = [...partners, ...partners];

  return (
    <section
      aria-label="Mitra Pengiriman Resmi"
      className="py-7 sm:py-8 bg-white border-b border-neutral-100 overflow-hidden relative select-none"
    >
      {/* Left and Right Fade Overlays */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1200px] mx-auto px-4 mb-4 text-center">
        <span className="text-[11px] sm:text-xs font-bold text-neutral-400 tracking-wider uppercase">
          Didukung Mitra Pengiriman Tercepat & Jaminan Rantai Dingin
        </span>
      </div>

      {/* Ticker Track with enlarged logos */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 lg:gap-20 py-2">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center shrink-0 opacity-85 hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-default"
            >
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
