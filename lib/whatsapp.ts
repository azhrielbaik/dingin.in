import { Product, Variant, CartItem, OrderFormData } from "@/types";
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

/**
 * Builds automated WhatsApp message with filled customer data & fulfillment details
 */
export function buildStructuredOrderMessage(params: {
  items: CartItem[];
  formData: OrderFormData;
  brandName?: string;
}): string {
  const brand = params.brandName || siteConfig.brandName;
  const subtotal = params.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const itemLines = params.items.map(
    (item, index) =>
      `${index + 1}. ${item.productName} (${item.variantLabel}) × ${item.quantity} = ${formatRupiah(
        item.price * item.quantity
      )}`
  );

  const isDelivery = params.formData.fulfillmentMethod === "delivery";

  const lines: string[] = [
    `Halo ${brand}, saya mau melakukan pemesanan:`,
    "",
    "📦 *[DAFTAR PESANAN]*",
    ...itemLines,
    "",
    `💰 *Estimasi Subtotal:* ${formatRupiah(subtotal)} ${isDelivery ? "(belum termasuk ongkir)" : "(ambil sendiri)"}`,
    "",
    "👤 *[DATA PEMESAN]*",
    `• Nama: ${params.formData.name}`,
    `• No. WhatsApp: ${params.formData.phone}`,
  ];

  if (params.formData.email) {
    lines.push(`• Email: ${params.formData.email}`);
  }

  lines.push("");

  if (isDelivery) {
    lines.push(
      "🚚 *[METODE PENGIRIMAN - DIANTARKAN]*",
      `• Area: ${params.formData.area}`,
      `• Alamat Lengkap: ${params.formData.address}`
    );
    if (params.formData.notesCourier) {
      lines.push(`• Patokan / Catatan Kurir: ${params.formData.notesCourier}`);
    }
    if (params.formData.preferredTime) {
      lines.push(`• Waktu Pengiriman: ${params.formData.preferredTime}`);
    }
  } else {
    lines.push(
      "🏬 *[METODE PENGIRIMAN - AMBIL SENDIRI (PICK-UP)]*",
      `• Lokasi Gerai: ${params.formData.pickupLocation || siteConfig.address}`,
      `• Jadwal Pengambilan: ${params.formData.pickupTime}`
    );
    if (params.formData.pickupPerson) {
      lines.push(`• Diambil Oleh: ${params.formData.pickupPerson}`);
    }
  }

  if (params.formData.orderNotes) {
    lines.push("", "📝 *[CATATAN PESANAN]*", params.formData.orderNotes);
  }

  lines.push(
    "",
    "Mohon info ketersediaan stok & rincian pembayarannya ya min. Terima kasih!"
  );

  return lines.join("\n");
}


