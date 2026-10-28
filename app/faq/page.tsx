import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FAQView } from "@/components/faq/FAQView";
import { faqItems } from "@/data/faq";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { ChevronRight, HelpCircle, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — Pertanyaan Seputar Makanan Beku & Pengiriman",
  description:
    "Pertanyaan umum seputar pengemasan rantai dingin, sertifikasi halal, area pengiriman Jabodetabek, dan cara pesan di dingin.in via WhatsApp.",
  openGraph: {
    title: "FAQ & Tanya Jawab | dingin.in",
    description: "Semua jawaban tentang pengiriman makanan beku, halal, dan cara pesan lewat WhatsApp.",
  },
};

export default function FAQPage() {
  return (
    <div className="py-8 sm:py-14 bg-neutral-50/50">
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
              Tanya Jawab (FAQ)
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Pusat Bantuan
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">
            Temukan jawaban lengkap seputar suhu penyimpanan, cara pemesanan di WhatsApp, area pengiriman beku, hingga garansi komplain kami.
          </p>
        </div>

        {/* FAQ Filter & Accordions */}
        <div className="mb-14">
          <FAQView items={faqItems} />
        </div>

        {/* Bottom Card: Belum menemukan jawaban? (Design 7.7) */}
        <div className="bg-white rounded-3xl border border-neutral-200 p-8 sm:p-10 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-wa-500/10 flex items-center justify-center mx-auto mb-4 text-wa-700">
            <MessageCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
            Belum Menemukan Jawaban yang Anda Cari?
          </h2>
          <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
            Tim layanan pelanggan dingin.in siap menjawab segala pertanyaan Anda seputar produk dan pengiriman secara langsung di WhatsApp.
          </p>
          <WhatsAppButton
            message={buildGeneralInquiryMessage()}
            source="faq_bottom_card"
            size="lg"
          >
            Chat Langsung dengan Admin Kami
          </WhatsAppButton>
        </div>
      </Container>
    </div>
  );
}

