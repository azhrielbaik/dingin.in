import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Toast } from "@/components/cart/Toast";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://dingin.in"),
  title: {
    default: "dingin.in — Katalog Makanan Beku Premium & Pesan via WhatsApp",
    template: "%s | dingin.in",
  },
  description:
    "Katalog makanan beku pilihan (dumpling, nugget, sosis, bakso, seafood). 100% Halal, kemasan insulasi rantai dingin, pemesanan praktis langsung via WhatsApp se-Jabodetabek.",
  keywords: [
    "makanan beku",
    "frozen food jabodetabek",
    "dumpling ayam",
    "nugget crispy",
    "sosis bratwurst",
    "bakso urat",
    "pesan frozen food via whatsapp",
    "frozen food halal",
  ],
  authors: [{ name: "dingin.in" }],
  creator: "dingin.in",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://dingin.in",
    siteName: "dingin.in",
    title: "dingin.in — Makanan Beku Berkualitas, Tinggal Masak",
    description:
      "Katalog makanan beku higienis dan 100% Halal. Dikemas dengan insulasi gel pack tetap beku. Pesan cepat tanpa registrasi akun via WhatsApp.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "dingin.in Frozen Food Catalog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "dingin.in — Makanan Beku Berkualitas, Tinggal Masak",
    description: "Katalog makanan beku higienis & 100% Halal. Pesan via WhatsApp.",
    images: ["https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-primary-100 selection:text-primary-700">
        <CartProvider>
          <Toast />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
