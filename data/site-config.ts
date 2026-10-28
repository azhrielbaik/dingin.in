import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  brandName: "dingin.in",
  brandTagline: "Stok Makanan Beku Berkualitas, Tinggal Masak",
  whatsappNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "6281234567890",
  openingHours: "Setiap Hari 08.00 - 20.00 WIB",
  serviceAreas: [
    "Jakarta Selatan",
    "Jakarta Barat",
    "Jakarta Pusat",
    "Jakarta Timur",
    "Jakarta Utara",
    "Tangerang & Tangsel",
    "Depok & Bekasi (Radius Instant/Sameday)",
  ],
  minOrderNote: "Bebas minimum order! Pembelian di atas Rp 200.000 dapat subsidi ongkir s/d Rp 15.000.",
  address: "Jl. Rawa Belong No. 42, Kebon Jeruk, Jakarta Barat 11530",
  phoneDisplay: "0812-3456-7890",
  email: "halo@dingin.in",
  socialLinks: {
    instagram: "https://instagram.com/dingin.in",
    tiktok: "https://tiktok.com/@dingin.in",
    facebook: "https://facebook.com/dingin.in.official",
  },
  messageTemplate: {
    greeting: "Halo dingin.in, saya mau pesan makanan beku:",
    footer: "Mohon info ketersediaan dan ongkirnya ya.",
  },
};

