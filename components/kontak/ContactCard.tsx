"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site-config";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";
import { buildWhatsAppUrl, buildGeneralInquiryMessage } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Copy, Check } from "lucide-react";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChat = () => {
    trackWhatsAppClick({ source: "contact_page_main" });
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl p-6 sm:p-8 border border-primary-100 shadow-sm space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-wa-700 text-white flex items-center justify-center shadow-sm">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="text-xs font-bold text-wa-700 uppercase tracking-wide block">
            Saluran Utama Pemesanan
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
            WhatsApp Business dingin.in
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 block font-medium">Nomor WhatsApp:</span>
            <span className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
              +{siteConfig.whatsappNumber.slice(0, 2)} {siteConfig.whatsappNumber.slice(2, 5)}-{siteConfig.whatsappNumber.slice(5, 9)}-{siteConfig.whatsappNumber.slice(9)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-bold text-neutral-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-success">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Nomor</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed pt-1 border-t border-neutral-100">
          💡 Tips: Jika aplikasi WhatsApp di perangkat Anda tidak otomatis terbuka saat menekan tombol, Anda dapat menyalin nomor di atas dan menyimpannya di kontak ponsel secara manual.
        </p>
      </div>

      <a
        href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleChat}
        className="w-full h-12 rounded-xl bg-wa-700 hover:bg-wa-800 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span>Buka Chat WhatsApp Sekarang</span>
      </a>
    </div>
  );
}
