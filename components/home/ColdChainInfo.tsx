import React from "react";
import { Container } from "@/components/ui/Container";
import { Snowflake, PackageCheck, Clock4, ShieldAlert } from "lucide-react";

export function ColdChainInfo() {
  return (
    <section className="py-14 sm:py-16 bg-neutral-50">
      <Container>
        <div className="bg-gradient-to-br from-frost-50 to-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-frost-500/15 text-primary-700 text-xs font-bold mb-3">
              <Snowflake className="w-3.5 h-3.5 text-frost-500" />
              Standar Rantai Dingin dingin.in
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Jaminan Pengiriman Makanan Beku Tetap Segar
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 leading-relaxed">
              Kami memahami kekhawatiran Anda saat membeli makanan beku online. dingin.in menerapkan SOP rantai dingin ketat agar produk sampai di dapur Anda dalam kondisi beku maksimal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Point 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-frost-50 flex items-center justify-center text-frost-500">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">
                Kemasan Insulasi + Ice Gel
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Setiap paket dikemas dengan foil bubble/kantong insulasi termal khusus dan gel pack beku food-grade untuk menahan suhu beku selama perjalanan kurir.
              </p>
            </div>

            {/* Point 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-frost-50 flex items-center justify-center text-frost-500">
                <Clock4 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">
                Kurir Instan & Sameday
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Pengiriman eksklusif menggunakan armada GoSend / GrabExpress Instan (1–3 jam) dan Sameday (4–8 jam) untuk seluruh area Jakarta, Tangerang, Depok, dan Bekasi.
              </p>
            </div>

            {/* Point 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-frost-50 flex items-center justify-center text-frost-500">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-neutral-900">
                Garansi Tiba Tetap Beku
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Jika produk tiba rusak atau mencair karena kendala kurir, kirim video unboxing ke WhatsApp dalam waktu maksimal 2 jam setelah barang diterima untuk retur/refund 100%.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

