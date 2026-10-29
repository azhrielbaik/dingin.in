"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Snowflake } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { CartButton } from "@/components/cart/CartButton";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildWhatsAppUrl, buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function subscribe() {
  return () => {};
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const pathname = usePathname();

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Katalog", href: "/produk" },
    { label: "Cara Pesan", href: "/cara-pesan" },
    { label: "FAQ", href: "/faq" },
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
  ];

  const handleChatClick = () => {
    trackWhatsAppClick({ source: "header_button" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        {/* Main Navbar */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              className="p-2 -ml-2 text-neutral-700 hover:text-primary-600 rounded-lg hover:bg-neutral-100 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group select-none"
            aria-label="dingin.in Beranda"
          >
            <div className="w-9 h-9 rounded-xl bg-primary-500 text-white flex items-center justify-center shadow-sm group-hover:bg-primary-600 transition-colors">
              <Snowflake className="w-5 h-5 text-accent-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-neutral-900">
                dingin<span className="text-primary-500">.in</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors",
                    isActive
                      ? "text-primary-600 bg-primary-50"
                      : "text-neutral-700 hover:text-primary-600 hover:bg-neutral-50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <CartButton />

            <a
              href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleChatClick}
              aria-label="Hubungi kami via WhatsApp (membuka WhatsApp di tab baru)"
              className="inline-flex items-center gap-2 bg-wa-700 hover:bg-wa-800 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat WA</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Portal (Rendered to document.body to prevent containing-block bugs) */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Full-screen Dark Backdrop */}
            <div
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-200"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Left Solid White Drawer */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu Navigasi Mobile"
              className="fixed top-0 bottom-0 left-0 w-[280px] sm:w-[320px] h-full bg-white shadow-2xl flex flex-col p-6 z-10 overflow-y-auto animate-in slide-in-from-left duration-200"
            >
              {/* Drawer Top Branding & Close Button */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white flex items-center justify-center shadow-xs">
                    <Snowflake className="w-4 h-4 text-accent-400" />
                  </div>
                  <span className="text-lg font-extrabold text-neutral-900">
                    dingin<span className="text-primary-500">.in</span>
                  </span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Tutup menu navigasi"
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-2.5 rounded-xl font-semibold text-base transition-colors",
                        isActive
                          ? "bg-primary-50 text-primary-600"
                          : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Bottom WhatsApp CTA */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
                <a
                  href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    handleChatClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-wa-700 hover:bg-wa-800 text-white py-3 rounded-xl font-bold text-sm shadow-sm transition-all active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Konsultasi via WhatsApp</span>
                </a>
                <div className="text-xs text-neutral-500 text-center">
                  Jam Buka: {siteConfig.openingHours}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
