export type Variant = {
  id: string;
  label: string;          // e.g. "250 g", "500 g", "1 kg"
  price: number;          // Dalam Rupiah
  comparePrice?: number;  // Harga coret jika ada diskon
};

export type CookingMethod = "goreng" | "kukus" | "air-fryer" | "rebus";

export type CookingGuide = {
  method: CookingMethod;
  duration: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;       // category slug
  images: string[];
  description: string;
  composition?: string;
  netWeight?: string;
  pieces?: string;        // e.g. "isi 20 pcs"
  halal: boolean;
  halalInfo?: string;
  storage: string;        // e.g. "Simpan di freezer −18 °C, tahan hingga 6 bulan"
  cooking: CookingGuide[];
  variants: Variant[];
  status: "available" | "soldout";
  badges?: ("promo" | "bestseller" | "new")[];
  featured?: boolean;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type CartItem = {
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  image: string;
};

export type SiteConfig = {
  brandName: string;
  brandTagline: string;
  whatsappNumber: string;  // e.g. "6281234567890" without +
  openingHours: string;
  serviceAreas: string[];
  minOrderNote?: string;
  address?: string;
  phoneDisplay?: string;
  email?: string;
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
  messageTemplate: {
    greeting: string;
    footer: string;
  };
};

export type FAQCategory = "pemesanan" | "pembayaran" | "pengiriman" | "produk" | "komplain";

export type FAQItem = {
  question: string;
  answer: string;
  category: FAQCategory;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  favoriteProduct?: string;
};

