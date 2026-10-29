import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import {
  Snowflake,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Cerita di Balik dingin.in",
  description:
    "Pelajari komitmen dingin.in dalam menyediakan aneka makanan beku berkualitas premium, higienis, 100% Halal dengan standar rantai dingin terpercaya.",
  openGraph: {
    title: "Tentang Kami | dingin.in",
    description: "Komitmen kami menghadirkan makanan beku lezat higienis untuk keluarga Indonesia.",
  },
};

export default function TentangPage() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6 text-accent-500" />,
      title: "Rasa & Bahan Premium",
      desc: "Kami mengutamakan komposisi daging asli bermutu tinggi, bukan sekadar tepung. Racikan bumbu alami tanpa pengawet sintesis berbahaya.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-success" />,
      title: "100% Halal & Terstandar",
      desc: "Seluruh rantai pasok dan fasilitas produksi kami memegang sertifikasi Halal resmi BPJPH / LPPOM MUI dan menjaga standar higienitas dapur modern.",
    },
    {
      icon: <Snowflake className="w-6 h-6 text-frost-500" />,
      title: "Integritas Rantai Dingin",
      desc: "Makanan beku harus tetap beku. Kami berinvestasi pada packaging insulasi termal dan armada pengiriman cepat agar tekstur dan rasa produk tidak rusak.",
    },
  ];

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
              Tentang Kami
            </li>
          </ol>
        </nav>

        {/* Small Hero */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            Cerita Brand
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Menghadirkan Makanan Beku Berkualitas Tanpa Ribet
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
            Berawal dari kebutuhan keluarga modern akan stok lauk praktis yang lezat, sehat, dan bebas pengawet, <strong>dingin.in</strong> lahir sebagai solusi santap lezat di meja makan Anda.
          </p>
        </div>

        {/* Story Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-md bg-neutral-100">
            <Image
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop"
              alt="Dapur produksi higienis dingin.in"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            <h2 className="text-2xl font-bold text-neutral-900">
              Dari Dapur Higienis Langsung ke Freezer Rumah Anda
            </h2>
            <p>
              Banyak orang menganggap makanan beku sekadar lauk darurat dengan rasa biasa dan dominan tepung. Di dingin.in, kami ingin mengubah persepsi tersebut. Setiap butir dumpling ayam, batang sosis bratwurst, maupun butir bakso urat kami diracik dengan takaran daging melimpah dan rempah segar asli.
            </p>
            <p>
              Kami sengaja memilih model pemesanan langsung lewat <strong>WhatsApp</strong> tanpa sistem checkout yang rumit. Dengan begini, Anda bisa langsung berinteraksi dengan tim kami, memastikan stok yang ready, meminta rekomendasi cara masak, hingga mengatur jam kirim yang pas sesuai keberadaan Anda di rumah.
            </p>
          </div>
        </div>

        {/* 3 Values (Design 7.8) */}
        <div className="bg-neutral-50 rounded-3xl p-8 sm:p-12 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-neutral-900">
              Nilai-Nilai Kualitas Kami
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Prinsip yang selalu kami pegang teguh dalam setiap produk yang kami kirimkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg text-neutral-900">{v.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900">
            Yuk, Coba Sendiri Kelezatan Produk dingin.in!
          </h2>
          <p className="text-sm text-neutral-500">
            Pesan sekarang dan rasakan kemudahan stok lauk praktis di kulkas Anda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="primary" size="lg" href="/produk">
              <span>Buka Katalog Produk</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <WhatsAppButton
              message={buildGeneralInquiryMessage()}
              source="about_page"
              size="lg"
            >
              Chat Tanya Kami
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </div>
  );
}

