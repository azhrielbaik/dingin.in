import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildGeneralInquiryMessage } from "@/lib/whatsapp";
import {
  ShoppingBag,
  MessageSquareShare,
  Calculator,
  Truck,
  CreditCard,
  QrCode,
  Clock,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cara Pesan & Panduan Pembayaran via WhatsApp",
  description:
    "Panduan praktis memesan makanan beku di dingin.in lewat WhatsApp. Pembayaran mudah via QRIS, Transfer Bank, dan e-Wallet tanpa registrasi akun.",
  openGraph: {
    title: "Cara Pesan & Panduan Pembayaran | dingin.in",
    description: "4 langkah mudah memesan frozen food pilihan via WhatsApp dengan jaminan rantai dingin.",
  },
};

export default function CaraPesanPage() {
  const steps = [
    {
      num: "01",
      icon: <ShoppingBag className="w-6 h-6 text-primary-500" />,
      title: "Pilih Makanan Beku Favorit",
      desc: "Buka halaman katalog kami. Anda bisa melihat foto close-up, berat kemasan, komposisi bahan, status halal, serta saran penyajian untuk setiap produk.",
    },
    {
      num: "02",
      icon: <MessageSquareShare className="w-6 h-6 text-primary-500" />,
      title: "Tekan Tombol 'Pesan via WhatsApp'",
      desc: "Pilih ukuran varian dan jumlah, lalu klik tombol WhatsApp. Aplikasi WhatsApp Anda akan langsung terbuka dengan template pesanan yang sudah terisi otomatis.",
    },
    {
      num: "03",
      icon: <Calculator className="w-6 h-6 text-primary-500" />,
      title: "Konfirmasi Stok & Ongkos Kirim",
      desc: "Lengkapi nama dan alamat pengiriman Anda pada pesan WhatsApp. Admin kami akan memeriksa stok fisik, menghitung ongkos kirim termurah, dan memberikan total akhir.",
    },
    {
      num: "04",
      icon: <Truck className="w-6 h-6 text-primary-500" />,
      title: "Pembayaran & Pengiriman Cepat",
      desc: "Lakukan transfer pembayaran via QRIS atau Transfer Bank. Setelah bukti bayar dikonfirmasi, paket langsung dipacking insulasi beku dan dikirim via kurir instan/sameday.",
    },
  ];

  const paymentMethods = [
    {
      title: "QRIS All Payment",
      desc: "Bisa di-scan dari seluruh mobile banking (BCA, Mandiri, BRI, BNI, CIMB) & e-Wallet (GoPay, OVO, ShopeePay, DANA).",
      icon: <QrCode className="w-6 h-6 text-primary-500" />,
    },
    {
      title: "Transfer Antar Bank",
      desc: "Tersedia rekening resmi BCA, Mandiri, dan BRI atas nama dingin.in. Nomor rekening akan diinfokan di chat.",
      icon: <CreditCard className="w-6 h-6 text-primary-500" />,
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
              Cara Pesan & Bayar
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-2 block">
            Panduan Lengkap Pembeli
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Cara Pesan Makanan Beku via WhatsApp
          </h1>
          <p className="text-base text-neutral-600 mt-3 leading-relaxed">
            Di dingin.in, Anda tidak perlu repot membuat akun atau mengingat kata sandi. Cukup pesan lewat chat WhatsApp yang sudah Anda gunakan sehari-hari.
          </p>
        </div>

        {/* 4 Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-2xs">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-primary-200">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-base text-neutral-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 mb-14">
          <div className="max-w-xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              Metode Pembayaran yang Diterima
            </h2>
            <p className="text-sm text-neutral-600 mt-1">
              Semua transaksi dilakukan secara transparan langsung di chat WhatsApp dengan konfirmasi otomatis dari admin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {paymentMethods.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  {m.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-neutral-900">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block mb-0.5">
                Jam Operasional & Batas Konfirmasi Pembayaran
              </span>
              Pesanan dan pembayaran yang terkonfirmasi sebelum pukul <strong>15.00 WIB</strong> akan dikirimkan di hari yang sama (Sameday/Instant). Pesanan setelah jam tersebut dikirimkan keesokan paginya mulai pukul 08.00 WIB.
            </div>
          </div>
        </div>

        {/* Guarantee and Packaging */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="p-6 rounded-2xl bg-frost-50 border border-frost-500/25 space-y-3">
            <div className="flex items-center gap-2 text-primary-700 font-bold text-sm">
              <Truck className="w-5 h-5 text-frost-500" />
              SOP Pengemasan Rantai Dingin
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Makanan beku Anda dimasukkan ke dalam kantong insulasi termal khusus bersama <strong>ice gel pack beku</strong> dengan suhu stabil. Aman dalam perjalanan hingga 6–8 jam perjalanan kurir di area Jabodetabek.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-success/5 border border-success/20 space-y-3">
            <div className="flex items-center gap-2 text-success font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              Garansi Segar Tiba
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              Jika makanan tiba dalam keadaan rusak atau mencair karena kelalaian pengiriman, sertakan foto/video unboxing dalam waktu <strong>maksimal 2 jam</strong> setelah paket diterima. Kami ganti baru atau refund 100%.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-6 border-t border-neutral-200">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Sudah Tahu Mau Pesan Apa?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="primary" size="lg" href="/produk">
              <span>Buka Katalog Produk</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <WhatsAppButton
              message={buildGeneralInquiryMessage()}
              source="how_to_order_page"
              size="lg"
            >
              Chat Tanya Admin
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </div>
  );
}

