"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildWhatsAppUrl, buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useCart } from "@/components/cart/CartProvider";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { isDrawerOpen } = useCart();
  const [visible, setVisible] = useState(false);

  // Is this a product detail page? On mobile, product detail page has its own sticky CTA bar
  const isProductDetailPage = pathname.startsWith("/produk/") && pathname !== "/produk";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Check initial scroll
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide if drawer is open or if on mobile product detail page
  if (isDrawerOpen) return null;

  const url = buildWhatsAppUrl(buildGeneralInquiryMessage());

  const handleClick = () => {
    trackWhatsAppClick({
      source: "floating_button",
    });
  };

  return (
    <aside
      aria-label="Kontak Cepat WhatsApp"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      } ${isProductDetailPage ? "hidden sm:block" : "block"}`}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat dengan Admin dingin.in via WhatsApp (membuka WhatsApp di tab baru)"
        className="group relative flex items-center justify-center w-14 h-14 bg-wa-600 hover:bg-wa-700 active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wa-700"
      >
        <WhatsAppIcon className="w-7 h-7" />

        {/* Online pulse indicator */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-wa-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-wa-500 border-2 border-white"></span>
        </span>

        {/* Desktop Hover Tooltip */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-neutral-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Chat kami sekarang
        </span>
      </a>
    </aside>
  );
}

