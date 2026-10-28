/**
 * Format number into Indonesian Rupiah format
 * e.g. 45000 -> "Rp 45.000"
 */
export function formatRupiah(amount: number): string {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  // Replace default "Rp" formatting space to standard "Rp 45.000"
  return formatted.replace(/\u00A0/, " ");
}

/**
 * Format slug into URL-safe string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

