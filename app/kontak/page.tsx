import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ContactCard } from "@/components/kontak/ContactCard";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { siteConfig } from "@/data/site-config";
import {
  MapPin,
  Clock,
  Mail,
  Truck,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Kontak & Lokasi Pengiriman Jabodetabek",
  description:
    "Hubungi admin dingin.in via WhatsApp untuk pemesanan makanan beku, jam operasional 08.00–20.00 WIB, dan daftar area jangkauan pengiriman Jabodetabek.",
  openGraph: {
    title: "Kontak & Layanan | dingin.in",
    description: "Kontak WhatsApp, jam operasional, dan area pengiriman makanan beku se-Jabodetabek.",
  },
};

export default function KontakPage() {
  return (
    <div className="py-8 sm:py-14 bg-white">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-neutral-500">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </li>
            <li className="font-semibold text-neutral-800" aria-current="page">
              Hubungi Kami
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2 block">
            Layanan Pelanggan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Kontak, Jam Buka & Area Layanan
          </h1>
          <p className="text-base text-neutral-600 mt-2">
            Kami siap melayani kebutuhan stok makanan beku keluarga dan usaha Anda setiap hari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: WhatsApp Contact Card (Interactive) */}
          <div className="lg:col-span-6">
            <ContactCard />
          </div>

          {/* Right Column: Operational Hours, Address, and Service Areas */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours Card */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Clock className="w-5 h-5 text-primary-500" />
                Jam Operasional Chat & Pengiriman
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                <strong>{siteConfig.openingHours}</strong>
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                *Pesanan di luar jam operasional tetap dapat dikirimkan ke WhatsApp dan akan diproses pertama kali di pagi hari berikutnya mulai pukul 08.00 WIB.
              </p>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <MapPin className="w-5 h-5 text-primary-500" />
                Dapur & Pusat Pengiriman
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {siteConfig.address}
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-500 pt-1 border-t border-neutral-200">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span>Email: {siteConfig.email}</span>
              </div>
            </div>

            {/* Service Areas Card */}
            <div className="p-6 rounded-2xl bg-frost-50 border border-frost-500/20 space-y-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Truck className="w-5 h-5 text-frost-500" />
                Area Jangkauan Pengiriman Beku
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {siteConfig.serviceAreas.map((area, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-white border border-frost-500/20 text-xs font-semibold text-neutral-800"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed pt-1">
                Pengiriman menggunakan GoSend / GrabExpress (Instant 1–3 jam & Sameday 4–8 jam).
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Link bar */}
        <div className="p-6 rounded-2xl bg-neutral-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-base">Ikuti Media Sosial dingin.in</h3>
            <p className="text-xs text-neutral-400">
              Dapatkan info promo bulanan, tips mengolah makanan beku, dan resep praktis harian!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
            >
              <InstagramIcon className="w-4 h-4 text-accent-400" />
              <span>@dingin.in</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
