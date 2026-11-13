import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedStars } from "@/components/ui/AnimatedStars";
import { testimonials } from "@/data/testimonials";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-500 uppercase tracking-wider mb-1">
            <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
            Kepuasan Pelanggan
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Apa Kata Mereka Tentang dingin.in?
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 mt-2">
            Cerita asli dari ibu rumah tangga, pekerja sibuk, dan pelaku usaha kuliner langganan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => (
            <RevealOnScroll key={item.id} delayMs={idx * 100} className="h-full">
              <div className="flex flex-col justify-between p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-neutral-100/70 hover:border-primary-100 transition-all duration-300 relative h-full">
                <div>
                  {/* 🌟 Animated Fill-Wave Stars */}
                  <div className="mb-3">
                    <AnimatedStars
                      rating={item.rating}
                      maxRating={5}
                      starStepMs={110}
                      initialDelayMs={idx * 80}
                      sizeClass="w-4 h-4"
                    />
                  </div>

                  {/* Content */}
                  <p className="text-sm text-neutral-700 leading-relaxed italic mb-6">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author & Favorite */}
                <div className="pt-4 border-t border-neutral-200/60">
                  <div className="flex items-center gap-3">
                    {item.avatar && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-neutral-300">
                        <Image
                          src={item.avatar}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-500">{item.role}</p>
                    </div>
                  </div>

                  {item.favoriteProduct && (
                    <div className="mt-2.5 text-[11px] text-primary-700 bg-primary-50 px-2 py-0.5 rounded-md inline-block font-medium">
                      Favorit: {item.favoriteProduct}
                    </div>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
