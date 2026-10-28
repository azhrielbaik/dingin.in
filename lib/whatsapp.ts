import { Product, Variant, CartItem } from "@/types";
import { siteConfig } from "@/data/site-config";
import { formatRupiah } from "./format";

/**
 * Builds standard WhatsApp direct link
 */
export function buildWhatsAppUrl(message: string, number?: string): string {
  const targetNumber = (number || process.env.NEXT_PUBLIC_WA_NUMBER || siteConfig.whatsappNumber).replace(/[^\d]/g, "");
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds automated WhatsApp message for a single product order
 */
export function buildSingleProductOrderMessage(
  product: Product,
  variant: Variant,
  quantity: number,
  currentUrl?: string
): string {
  const totalPrice = variant.price * quantity;
  const brand = siteConfig.brandName;

  const lines = [
    `Halo ${brand}, saya mau pesan:`,
    "",
    `• ${product.name} - ${variant.label} × ${quantity}`,
    `  Estimasi: ${formatRupiah(totalPrice)}`,
    "",
    "Mohon info ketersediaan dan ongkirnya ya.",
    "",
    "Nama:",
    "Alamat / area pengiriman:",
    "Tanggal & jam kirim yang diinginkan:",
    "Catatan:",
  ];

  if (currentUrl) {
    lines.push("", `Link produk: ${currentUrl}`);
  }

  return lines.join("\n");
}

/**
 * Builds automated WhatsApp message for multiple products from cart
 */
export function buildCartOrderMessage(items: CartItem[], currentUrl?: string): string {
  const brand = siteConfig.brandName;
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const itemLines = items.map(
    (item, index) =>
      `${index + 1}. ${item.productName} - ${item.variantLabel} × ${item.quantity} = ${formatRupiah(
        item.price * item.quantity
      )}`
  );

  const lines = [
    `Halo ${brand}, saya mau pesan:`,
    "",
    ...itemLines,
    "",
    `Estimasi subtotal: ${formatRupiah(subtotal)} (belum termasuk ongkir)`,
    "",
    "Mohon info ketersediaan dan ongkirnya ya.",
    "",
    "Nama:",
    "Alamat / area pengiriman:",
    "Tanggal & jam kirim yang diinginkan:",
    "Catatan:",
  ];

  if (currentUrl) {
    lines.push("", `Tautan keranjang: ${currentUrl}`);
  }

  return lines.join("\n");
}

/**
 * General inquiry message
 */
export function buildGeneralInquiryMessage(): string {
  return `Halo ${siteConfig.brandName}, saya ingin bertanya seputar produk makanan beku, stok, dan area pengiriman. Terima kasih!`;
}

/**
 * Product availability inquiry (when out of stock)
 */
export function buildProductInquiryMessage(productName: string): string {
  return `Halo ${siteConfig.brandName}, saya tertarik dengan produk "${productName}" yang sedang habis di website. Kapan kira-kira stoknya tersedia kembali?`;
}

