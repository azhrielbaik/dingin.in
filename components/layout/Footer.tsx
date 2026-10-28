import React from "react";
import Link from "next/link";
import { Snowflake, MapPin, Clock, Phone, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildWhatsAppUrl, buildGeneralInquiryMessage } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-primary-700 text-white pt-16 pb-8 border-t border-primary-600">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-primary-600">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white text-primary-700 flex items-center justify-center font-bold shadow">
                <Snowflake className="w-5 h-5 text-accent-400" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                dingin<span className="text-accent-400">.in</span>
              </span>
            </Link>
            <p className="text-primary-100 text-sm leading-relaxed">
              Penyedia aneka makanan beku berkualitas premium: dumpling, nugget, sosis, bakso, dan olahan seafood. Higienis, 100% Halal, dikemas dengan rantai dingin terjamin.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram dingin.in"
                className="w-9 h-9 rounded-full bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-primary-100 hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp dingin.in"
                className="w-9 h-9 rounded-full bg-wa-700 hover:bg-wa-800 flex items-center justify-center text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Katalog & Kategori */}
          <div>
            <h3 className="font-bold text-base text-accent-400 tracking-wide uppercase mb-4 text-xs">
              Kategori Produk
            </h3>
            <ul className="space-y-2.5 text-sm text-primary-100">
              <li>
                <Link href="/produk" className="hover:text-white transition-colors">
                  Semua Produk Katalog
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/kategori/${c.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Bantuan & Info */}
          <div>
            <h3 className="font-bold text-base text-accent-400 tracking-wide uppercase mb-4 text-xs">
              Bantuan & Panduan
            </h3>
            <ul className="space-y-2.5 text-sm text-primary-100">
              <li>
                <Link href="/cara-pesan" className="hover:text-white transition-colors">
                  Cara Pesan & Bayar via WhatsApp
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & Rantai Dingin
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang dingin.in
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Kontak & Lokasi Pengiriman
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontak & Jam Buka */}
          <div className="space-y-3">
            <h3 className="font-bold text-base text-accent-400 tracking-wide uppercase mb-4 text-xs">
              Hubungi Kami
            </h3>
            <div className="flex items-start gap-2.5 text-sm text-primary-100">
              <Clock className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
              <span>{siteConfig.openingHours}</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-primary-100">
              <Phone className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
              <span>WhatsApp: {siteConfig.phoneDisplay}</span>
            </div>
            <div className="flex items-start gap-2.5 text-sm text-primary-100">
              <MapPin className="w-4 h-4 text-accent-400 shrink-0 mt-0.5" />
              <span>{siteConfig.address}</span>
            </div>
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-600/60 border border-primary-500 text-xs text-primary-50">
                <ShieldCheck className="w-4 h-4 text-accent-400" />
                <span>Garansi Tiba Tetap Beku</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods Accepted */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-primary-600/70 text-xs text-primary-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Metode Pembayaran via WA:</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px] font-bold text-white">QRIS</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">BCA</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">Mandiri</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">BRI</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">GoPay</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">OVO</span>
            <span className="bg-primary-600 px-2 py-0.5 rounded text-[11px]">ShopeePay</span>
          </div>
          <div>
            <span>Area Layanan: Jabodetabek (Instan & Sameday)</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-100/70">
          <p>© 2026 dingin.in. Hak Cipta Dilindungi Undang-Undang.</p>
          <p>Katalog Makanan Beku Premium & Pemesanan via WhatsApp</p>
        </div>
      </div>
    </footer>
  );
}
