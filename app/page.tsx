import React from "react";
import { Hero } from "@/components/home/Hero";
import { CategoryNav } from "@/components/home/CategoryNav";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { ValueProps } from "@/components/home/ValueProps";
import { HowToOrder } from "@/components/home/HowToOrder";
import { ColdChainInfo } from "@/components/home/ColdChainInfo";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getFeaturedProducts } from "@/lib/products";
import { siteConfig } from "@/data/site-config";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  // Structured Data JSON-LD for LocalBusiness & Organization (PRD 11)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brandName,
    description: siteConfig.brandTagline,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://dingin.in",
    telephone: siteConfig.whatsappNumber,
    priceRange: "Rp 20.000 - Rp 120.000",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <CategoryNav />
      <FeaturedProducts products={featuredProducts} />
      <ValueProps />
      <HowToOrder />
      <ColdChainInfo />
      <Testimonials />
      <HomeFAQ />
      <FinalCTA />
    </>
  );
}
