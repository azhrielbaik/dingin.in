import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/data/faq";
import { ArrowRight, HelpCircle } from "lucide-react";

export function HomeFAQ() {
  // Select 5 key questions for landing page
  const homeFaqList = faqItems.slice(0, 5).map((item, index) => ({
    id: `home-faq-${index}`,
    title: item.question,
    content: <p>{item.answer}</p>,
  }));

  return (
    <section className="py-14 sm:py-20 bg-neutral-50/70 border-t border-neutral-200">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              Tanya Jawab Singkat
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 mt-2">
              Jawaban cepat seputar pengiriman makanan beku, kehalalan, dan cara pemesanan.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
            <Accordion items={homeFaqList} defaultOpenId="home-faq-0" />
          </div>

          <div className="text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors group"
            >
              Lihat Semua Pertanyaan & Jawaban Lengkap
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

