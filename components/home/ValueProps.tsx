import React from "react";
import { Container } from "@/components/ui/Container";
import { Snowflake, ShieldCheck, Sparkles, MessageCircle } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: <Snowflake className="w-6 h-6 text-frost-500" />,
      title: "Dikemas Tetap Beku",
      desc: "Kemasan insulasi termal + ice gel pack beku, makanan tiba dalam kondisi beku sempurna.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-success" />,
      title: "100% Halal & Aman",
      desc: "Telah bersertifikat Halal resmi BPJPH / MUI dan diproduksi secara higienis terstandarisasi.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent-500" />,
      title: "Kualitas Standar Restoran",
      desc: "Berdaging padat bukan tepung semata. Tanpa boraks, formalin, atau pengawet berbahaya.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-wa-700" />,
      title: "Pesan Mudah via WhatsApp",
      desc: "Tanpa ribet bikin akun atau download app. Cukup klik tombol, langsung terhubung ke admin.",
    },
  ];

  return (
    <section className="py-12 bg-frost-50/70 border-y border-frost-500/15">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((p, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-frost-50 flex items-center justify-center shrink-0">
                {p.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm sm:text-base text-neutral-900">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

