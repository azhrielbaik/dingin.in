import React from "react";
import { Container } from "@/components/ui/Container";
import { ShoppingBag, MessageSquareShare, Calculator, Truck } from "lucide-react";

export function HowToOrder() {
  const steps = [
    {
      step: 1,
      icon: <ShoppingBag className="w-5 h-5 text-white" />,
      title: "Pilih Produk",
      desc: "Telusuri katalog makanan beku kami, pilih varian berat dan jumlah yang diinginkan.",
    },
    {
      step: 2,
      icon: <MessageSquareShare className="w-5 h-5 text-white" />,
      title: "Klik Pesan via WA",
      desc: "Tekan tombol WhatsApp. Pesanan otomatis terisi rapi di kolom chat Anda.",
    },
    {
      step: 3,
      icon: <Calculator className="w-5 h-5 text-white" />,
      title: "Konfirmasi & Ongkir",
      desc: "Admin kami menghitung ongkir tercepat dan memberikan rincian total serta QRIS/rekening.",
    },
    {
      step: 4,
      icon: <Truck className="w-5 h-5 text-white" />,
      title: "Kirim Tetap Beku",
      desc: "Setelah konfirmasi transfer, paket dikemas insulasi gel pack dan meluncur ke rumah Anda.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-primary-600 tracking-wider uppercase mb-1.5 block">
            Alur Pemesanan Praktis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Cara Pesan Makanan Beku via WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">
            Hanya 4 langkah mudah tanpa repot mendaftar akun atau instal aplikasi tambahan.
          </p>
        </div>

        {/* Steps with connecting lines on desktop */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector Line on Desktop */}
          <div
            className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-neutral-200 z-0"
            aria-hidden="true"
          />

          {steps.map((item) => (
            <div
              key={item.step}
              className="relative z-10 flex flex-col items-center text-center p-4 rounded-2xl bg-white"
            >
              {/* Numbered badge circle */}
              <div className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold text-lg shadow-md ring-4 ring-white mb-4">
                {item.icon}
              </div>

              <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-bold mb-2">
                Langkah {item.step}
              </div>

              <h3 className="font-bold text-base text-neutral-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

