import React from "react";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  IceCrystal3DIcon,
  HalalShield3DIcon,
  ChefSparkle3DIcon,
  WhatsApp3DIcon,
} from "@/components/icons/3d/Trust3DIcons";

export function ValueProps() {
  const props = [
    {
      icon: <IceCrystal3DIcon className="w-8 h-8 drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />,
      title: "Dikemas Tetap Beku",
      desc: "Kemasan insulasi termal + ice gel pack beku, makanan tiba dalam kondisi beku sempurna.",
    },
    {
      icon: <HalalShield3DIcon className="w-8 h-8 drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />,
      title: "100% Halal & Aman",
      desc: "Telah bersertifikat Halal resmi BPJPH / MUI dan diproduksi secara higienis terstandarisasi.",
    },
    {
      icon: <ChefSparkle3DIcon className="w-8 h-8 drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />,
      title: "Kualitas Standar Restoran",
      desc: "Berdaging padat bukan tepung semata. Tanpa boraks, formalin, atau pengawet berbahaya.",
    },
    {
      icon: <WhatsApp3DIcon className="w-8 h-8 drop-shadow-xs transition-transform duration-300 group-hover:scale-110" />,
      title: "Pesan Mudah via WhatsApp",
      desc: "Tanpa ribet bikin akun atau download app. Cukup klik tombol, langsung terhubung ke admin.",
    },
  ];

  return (
    <section className="py-12 bg-frost-50/70 border-y border-frost-500/15">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, idx) => (
            <RevealOnScroll key={idx} delayMs={idx * 100} className="h-full">
              <div className="group flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 border border-transparent hover:border-frost-500/20 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-white to-neutral-50/80 border border-neutral-200/70 shadow-xs flex items-center justify-center shrink-0">
                  {p.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-primary-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
