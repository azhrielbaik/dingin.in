/**
 * Analytics event tracking helper
 * Supports Google Analytics (gtag), Meta Pixel (fbq), and safe console logging fallback
 */
export function trackWhatsAppClick(params: {
  source: string;
  product?: string;
  variant?: string;
  value?: number;
}) {
  if (typeof window === "undefined") return;

  // Log for development and debugging
  if (process.env.NODE_ENV !== "production") {
    console.info("[Analytics] click_whatsapp:", params);
  }

  // Google Analytics / GA4
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  if (typeof win.gtag === "function") {
    win.gtag("event", "click_whatsapp", {
      event_category: "Conversion",
      event_label: params.product ? `${params.product} (${params.variant || "-"})` : params.source,
      source_page: params.source,
      product_name: params.product,
      product_variant: params.variant,
      value: params.value,
      currency: "IDR",
    });
  }

  // Meta Pixel
  if (typeof win.fbq === "function") {
    win.fbq("trackCustom", "ClickWhatsApp", {
      content_name: params.product || "General Inquiry",
      content_category: params.source,
      value: params.value,
      currency: "IDR",
    });
  }
}

