# PRD — [NamaBrand] Frozen Food Catalog & WhatsApp Order

| | |
|---|---|
| **Versi** | 0.2.1 (Revisi MVP: Next.js, katalog + WhatsApp order) |
| **Status** | Draft untuk review |
| **Dokumen terkait** | `design.md` (design system & layout) |
| **Bahasa produk** | Bahasa Indonesia |

### Riwayat revisi
| Versi | Perubahan |
|---|---|
| 0.1 | Draft awal: e-commerce penuh (akun, checkout, payment gateway, admin panel). |
| **0.2** | **MVP disederhanakan:** hanya Next.js (multi-page), landing page + katalog, **tanpa login**, **tanpa backend/database**. Pemesanan dan pembayaran dilakukan lewat **WhatsApp**. Fitur e-commerce penuh dipindah ke fase berikutnya. |
| **0.2.1** | Struktur folder proyek diperbarui dan dilengkapi (nama proyek `dingin.in`): pohon folder lengkap, aturan struktur, pemetaan route-data, dan daftar library. |

---

## 1. Ringkasan Produk

[NamaBrand] adalah website **landing page + katalog** makanan beku (dumpling, nugget, sosis, bakso, siomay, dan lainnya). Pengunjung menelusuri produk tanpa perlu membuat akun. Saat ingin membeli, pengunjung menekan tombol **"Pesan via WhatsApp"** dan langsung diarahkan ke chat WhatsApp penjual dengan **pesan pesanan yang sudah terisi otomatis**. Konfirmasi stok, ongkir, dan **pembayaran** dilakukan penjual dan pembeli langsung di WhatsApp.

**Prinsip MVP:** secepat mungkin online, biaya rendah, tanpa sistem rumit. Website bertugas **menarik minat, menampilkan produk dengan jelas, dan memindahkan calon pembeli ke WhatsApp** dengan semulus mungkin.

## 2. Latar Belakang & Masalah

| Masalah | Solusi lewat MVP |
|---|---|
| Katalog penjual tersebar di status/story sosmed, sulit dicari dan tidak rapi | Katalog web terstruktur dengan foto, harga, dan info lengkap |
| Calon pembeli bertanya hal yang sama berulang (isi, halal, cara masak) | Halaman detail produk yang informatif + FAQ |
| Pesanan lewat chat sering tidak lengkap (tidak jelas varian/jumlah) | Pesan WhatsApp otomatis berformat rapi |
| Pembeli ragu soal pengiriman makanan beku | Penjelasan cara pengemasan & pengiriman beku di landing page dan FAQ |
| Biaya bangun e-commerce penuh terlalu besar untuk tahap validasi | Cukup website statis Next.js + WhatsApp |

## 3. Tujuan & Metrik

### Tujuan MVP
1. Punya website yang tampil profesional dan mudah ditemukan lewat Google.
2. Mengubah pengunjung menjadi **chat WhatsApp masuk** dengan pesanan terisi.
3. Memvalidasi produk mana yang paling diminati sebelum berinvestasi ke sistem e-commerce penuh.

### Metrik

| Metrik | Definisi | Cara ukur | Target awal |
|---|---|---|---|
| WhatsApp click-through | Klik tombol WA / sesi | Event analytics `click_whatsapp` | ≥ 5% |
| Chat masuk dari web | Jumlah chat dengan pesan template | Rekap manual di WhatsApp Business | Dicatat mingguan |
| Chat → pesanan | Pesanan dibayar / chat masuk | Rekap manual | ≥ 30% |
| Performa | LCP mobile 4G | Lighthouse / PageSpeed | ≤ 2,5 dtk |
| Trafik organik | Kunjungan dari Google | Analytics / Search Console | Naik bulanan |

> Konversi akhir (pembayaran) terjadi **di luar website**, sehingga dihitung manual oleh admin. Karena itu event klik WhatsApp wajib dilacak sejak hari pertama.

## 4. Target Pengguna

| Persona | Kebutuhan | Perilaku |
|---|---|---|
| **Rina (32), ibu rumah tangga** | Stok lauk praktis, halal, harga jelas | Buka dari HP, lebih nyaman memesan via chat |
| **Dimas (25), pekerja/anak kos** | Porsi kecil, cepat dimasak, ongkir terjangkau | Bandingkan harga, tanya ongkir via chat |
| **Bu Sari (40), pelaku usaha kecil** | Beli banyak untuk jualan/katering | Bernegosiasi harga lewat chat |

Semua persona terbiasa memakai WhatsApp, sehingga **tidak ada hambatan login atau pembayaran online** di website.

## 5. Ruang Lingkup

### 5.1 In Scope (MVP)
- Landing page yang menjelaskan nilai brand dan memicu aksi.
- Katalog produk (daftar + pencarian + filter kategori + urutan).
- Halaman detail produk.
- Tombol **Pesan via WhatsApp** (per produk) dengan pesan otomatis.
- *(Direkomendasikan)* Keranjang ringan di sisi browser untuk memesan beberapa produk sekaligus dalam satu pesan WhatsApp.
- Halaman informasi: Cara Pesan, FAQ, Tentang, Kontak.
- Tombol WhatsApp mengambang (floating) di semua halaman.
- SEO dasar, analytics, dan optimasi performa.

### 5.2 Out of Scope (tidak dikerjakan di MVP)
| Tidak termasuk | Digantikan oleh |
|---|---|
| Login, registrasi, akun pengguna | Tanpa akun; data pembeli diisi di chat WhatsApp |
| Checkout & halaman pembayaran | Pembayaran manual lewat WhatsApp |
| Payment gateway (QRIS otomatis, VA, e-wallet) | Penjual mengirim nomor rekening/QRIS di chat |
| Database & backend/API terpisah | Data produk berupa file/konfigurasi di proyek Next.js |
| Panel admin | Data diubah lewat file data (lihat 9) |
| Ongkir otomatis & pelacakan kurir | Ongkir dihitung penjual di chat |
| Stok real-time | Status "Tersedia / Habis" diatur manual |
| Ulasan, kupon otomatis, poin loyalitas | Fase berikutnya |
| Notifikasi otomatis (email/WA bot) | Penjual membalas manual |

## 6. Alur Pengguna

### 6.1 Alur di website
```
Landing page ──► Katalog ──► Detail produk ──► [Pesan via WhatsApp]
      │             ▲              │
      └─────────────┘              └─► (opsional) Tambah ke keranjang ─► Kirim pesanan ke WhatsApp
```

### 6.2 Alur operasional di WhatsApp (SOP penjual)
```
1. Pembeli klik tombol → WhatsApp terbuka dengan pesan pesanan terisi
2. Pembeli mengirim pesan (melengkapi nama & alamat)
3. Penjual cek stok & area, hitung ongkir, kirim total akhir
4. Pembeli setuju → penjual kirim info pembayaran (transfer bank / QRIS / e-wallet)
5. Pembeli kirim bukti bayar
6. Penjual konfirmasi, kemas (kotak insulasi + gel pack), jadwalkan pengiriman
7. Penjual kirim info/nomor resi atau kabar kurir
8. Pesanan diterima → penjual minta konfirmasi (dan testimoni jika berkenan)
```

> Waktu balas penjual sangat menentukan konversi. Cantumkan **jam operasional** dan perkiraan waktu balas di website.

## 7. Struktur Halaman (Sitemap Multi-Page)

| Route | Halaman | Rendering | Prioritas |
|---|---|---|---|
| `/` | Landing page | Static (SSG) | P0 |
| `/produk` | Katalog semua produk | SSG + filter/pencarian di sisi klien | P0 |
| `/produk/[slug]` | Detail produk | SSG (`generateStaticParams`) | P0 |
| `/kategori/[slug]` | Katalog per kategori (untuk SEO) | SSG | P1 |
| `/keranjang` | Keranjang ringan (jika dipakai) | Client component | P1 |
| `/cara-pesan` | Cara pesan & pembayaran via WhatsApp | Static | P0 |
| `/faq` | Pertanyaan umum (pengiriman beku, halal, dll.) | Static | P0 |
| `/tentang` | Tentang kami | Static | P1 |
| `/kontak` | Kontak, jam operasional, area layanan | Static | P1 |
| `/not-found` | Halaman 404 | Static | P0 |
| `/sitemap.xml`, `/robots.txt` | SEO | Generated | P0 |

## 8. Kebutuhan Fungsional

Prioritas: **P0** wajib MVP, **P1** sebaiknya ada, **P2** nanti.

### 8.1 Landing Page (`/`)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| L-01 | Hero: headline, subteks, CTA utama "Lihat Katalog" + CTA kedua "Chat WhatsApp" | P0 |
| L-02 | Navigasi kategori cepat (ikon + label) | P0 |
| L-03 | Section produk unggulan/terlaris (kartu produk) | P0 |
| L-04 | Section keunggulan: halal, dikemas beku, higienis, mudah dipesan | P0 |
| L-05 | Section **Cara Pesan** (3–4 langkah via WhatsApp) | P0 |
| L-06 | Section informasi pengiriman beku & area layanan | P0 |
| L-07 | Testimoni pelanggan (statis, dari screenshot/teks yang dikurasi) | P1 |
| L-08 | FAQ ringkas (accordion) | P1 |
| L-09 | CTA penutup + footer lengkap (kontak, jam operasional, sosmed) | P0 |
| L-10 | Tombol WhatsApp mengambang | P0 |

### 8.2 Katalog (`/produk`)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| K-01 | Grid kartu produk (foto, nama, varian/berat, harga, badge) | P0 |
| K-02 | Filter kategori | P0 |
| K-03 | Pencarian nama produk (di sisi klien) | P0 |
| K-04 | Urutkan: terlaris/unggulan, termurah, termahal, terbaru | P1 |
| K-05 | Badge: Promo, Terlaris, Baru, **Habis** | P0 |
| K-06 | Tombol cepat "Pesan" di kartu (membuka WhatsApp dengan 1 produk) | P1 |
| K-07 | Produk berstatus **Habis** tetap tampil, tombol pesan dinonaktifkan atau diganti "Tanya Ketersediaan" | P0 |
| K-08 | Skeleton/loading state & empty state ("Produk tidak ditemukan") | P1 |

### 8.3 Detail Produk (`/produk/[slug]`)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| D-01 | Galeri foto (min. 3 foto) | P0 |
| D-02 | Nama, harga, harga coret (jika promo) | P0 |
| D-03 | Pemilih varian (mis. 250 g / 500 g / 1 kg) dan jumlah | P0 |
| D-04 | **Tombol "Pesan via WhatsApp"** dengan pesan terisi otomatis (produk, varian, jumlah, estimasi harga) | P0 |
| D-05 | Info: komposisi, berat bersih, jumlah isi | P0 |
| D-06 | Info halal / izin edar (hanya jika dokumen valid) | P0 |
| D-07 | **Cara penyimpanan** (suhu, masa simpan) dan **cara memasak** (goreng/kukus/air fryer + durasi) | P0 |
| D-08 | Catatan: "Harga belum termasuk ongkir; ketersediaan dikonfirmasi via WhatsApp" | P0 |
| D-09 | Produk terkait | P1 |
| D-10 | Tombol "Tambah ke Keranjang" (jika keranjang ringan dipakai) | P1 |
| D-11 | Tombol bagikan (salin tautan / share WhatsApp) | P2 |

### 8.4 Integrasi WhatsApp (inti MVP)
| ID | Kebutuhan | Prioritas |
|---|---|---|
| W-01 | Semua tombol pesan memakai tautan `https://wa.me/<nomor>?text=<pesan ter-encode>`; nomor dalam format internasional tanpa tanda `+` (mis. `62812xxxxxxx`) | P0 |
| W-02 | Nomor WhatsApp disimpan di satu tempat konfigurasi (env/variabel) agar mudah diganti | P0 |
| W-03 | Pesan otomatis berformat konsisten (lihat 8.5) | P0 |
| W-04 | Tombol membuka tab/aplikasi baru (`target="_blank"`, `rel="noopener noreferrer"`) | P0 |
| W-05 | Tombol WhatsApp mengambang pada semua halaman, dengan pesan umum ("Halo, saya mau tanya produk…") | P0 |
| W-06 | Event analytics `click_whatsapp` dengan parameter: sumber halaman, produk, varian | P0 |
| W-07 | Tangani pesan panjang (batasi isi pesan agar URL tetap aman; jumlah item keranjang dibatasi wajar) | P1 |
| W-08 | Teks bantuan jika WhatsApp tidak terbuka (tampilkan nomor yang bisa disalin) | P1 |

### 8.5 Template Pesan WhatsApp

**Pesan 1 produk (dari halaman detail):**
```
Halo [NamaBrand], saya mau pesan:

• Dumpling Ayam - 500 g × 2
  Estimasi: Rp 76.000

Mohon info ketersediaan dan ongkirnya ya.

Nama:
Alamat / area pengiriman:
Tanggal & jam kirim yang diinginkan:
Catatan:
```

**Pesan banyak produk (dari keranjang ringan):**
```
Halo [NamaBrand], saya mau pesan:

1. Dumpling Ayam - 500 g × 2 = Rp 76.000
2. Nugget Ayam - 1 kg × 1 = Rp 85.000

Estimasi subtotal: Rp 161.000 (belum termasuk ongkir)

Nama:
Alamat / area pengiriman:
Tanggal & jam kirim yang diinginkan:
Catatan:

Link produk: [url halaman]
```

Aturan: harga di pesan hanya **estimasi**; total final ditetapkan penjual di chat. Data pribadi pembeli (nama, alamat) **diketik pembeli di WhatsApp**, tidak disimpan oleh website.

### 8.6 Keranjang Ringan (P1, direkomendasikan)
| ID | Kebutuhan |
|---|---|
| C-01 | Tambah/ubah jumlah/hapus item; disimpan di `localStorage` (tanpa login) |
| C-02 | Ikon keranjang di header dengan jumlah item |
| C-03 | Halaman/drawer keranjang menampilkan item, subtotal estimasi, dan tombol **"Kirim Pesanan ke WhatsApp"** |
| C-04 | Setelah tombol ditekan, keranjang tidak otomatis dikosongkan (pembeli mungkin kembali); sediakan tombol "Kosongkan" |
| C-05 | Peringatan jika harga berubah sejak item ditambahkan |

> Tanpa keranjang, pembeli yang ingin banyak produk harus membuka banyak chat atau mengetik manual. Keranjang ini tetap **tanpa backend dan tanpa login**, hanya logika di browser.

### 8.7 Halaman Informasi
| Halaman | Isi minimum |
|---|---|
| **Cara Pesan** | Langkah 1–4, metode pembayaran yang diterima (transfer bank, QRIS, e-wallet), kebijakan konfirmasi pembayaran, estimasi waktu proses |
| **FAQ** | Cara menjaga produk tetap beku, area & jadwal kirim, minimum order, halal, komplain/pengembalian, jam balas chat |
| **Tentang** | Cerita brand, proses produksi/sumber produk, nilai kualitas |
| **Kontak** | Nomor WhatsApp, jam operasional, area layanan, alamat (jika ada), tautan sosmed |

### 8.8 Aturan Khusus Produk Beku (disampaikan di web, dijalankan di operasional)
- Area layanan dan jadwal kirim dijelaskan di landing, FAQ, dan Kontak.
- Pengemasan standar: kotak insulasi + gel pack/es kering.
- Pesan jelas: "Segera simpan di freezer saat diterima."
- Kebijakan komplain: kirim foto/video dalam batas waktu tertentu setelah diterima (tentukan, mis. 2 jam).
- Minimum order dan aturan gratis ongkir (jika ada) dicantumkan jelas.

## 9. Data Produk (tanpa database)

Data produk disimpan sebagai **file di dalam proyek Next.js** dan dibaca saat build.

### 9.1 Struktur data (TypeScript)
```ts
type Variant = {
  id: string;
  label: string;          // "500 g"
  price: number;          // dalam Rupiah
  comparePrice?: number;  // harga coret
};

type Product = {
  slug: string;
  name: string;
  category: string;       // slug kategori
  images: string[];
  description: string;
  composition?: string;
  netWeight?: string;
  pieces?: string;        // "isi 20 pcs"
  halal: boolean;
  halalInfo?: string;
  storage: string;        // "Simpan di freezer −18 °C, tahan 6 bulan"
  cooking: { method: "goreng" | "kukus" | "air-fryer"; duration: string }[];
  variants: Variant[];
  status: "available" | "soldout";
  badges?: ("promo" | "bestseller" | "new")[];
  featured?: boolean;
};

type SiteConfig = {
  brandName: string;
  whatsappNumber: string;  // "62812xxxxxxx"
  openingHours: string;
  serviceAreas: string[];
  minOrderNote?: string;
  messageTemplate: { greeting: string; footer: string };
};
```

### 9.2 Cara memperbarui data
| Opsi | Cara | Cocok untuk | Catatan |
|---|---|---|---|
| **A. File JSON/TS di repo** *(default MVP)* | Ubah file data → commit → deploy otomatis | Katalog kecil, perubahan jarang, ada developer | Paling sederhana dan murah |
| **B. Google Sheets sebagai sumber data** | Pemilik edit spreadsheet; Next.js membaca saat build/ISR | Pemilik non-teknis, harga/stok sering berubah | Perlu penyiapan kecil; tetap tanpa backend sendiri |
| **C. Headless CMS** (mis. Sanity, Decap) | Edit lewat dashboard CMS | Katalog besar, banyak editor | Lebih banyak setup; bisa di fase 2 |

Rekomendasi: mulai dengan **A**, siapkan struktur agar mudah pindah ke **B** bila pemilik ingin mengubah harga/stok sendiri.

## 10. Kebutuhan Teknis

### 10.1 Tech Stack
| Lapisan | Pilihan |
|---|---|
| Framework | **Next.js** (App Router), multi-page, **SSG/static** sedapat mungkin |
| Bahasa | TypeScript |
| Styling | Tailwind CSS (token sesuai `design.md`) |
| Gambar | `next/image` (WebP/AVIF), lazy-load |
| State keranjang | React state + `localStorage` (tanpa library eksternal) |
| Pencarian | Filter array di sisi klien (cukup untuk ratusan produk) |
| Analytics | GA4 atau Plausible/Umami; opsional Meta Pixel |
| Hosting | Vercel / Netlify / Cloudflare Pages |
| Backend / DB | **Tidak ada** |

### 10.2 Struktur Proyek

**Nama proyek:** `dingin.in`
**Dibuat dengan:** `create-next-app` (TypeScript, Tailwind CSS, ESLint, App Router). Folder `app` berada di **root** proyek (tanpa `src/`); jika hasil instalasi ternyata memakai `src/`, seluruh path di bawah cukup dipindah ke dalam `src/`.

#### a) Pohon folder

```
dingin.in/
├── app/                              # Routing (App Router)
│   ├── layout.tsx                    # Root layout: font, metadata, Header, Footer, FloatingWhatsApp
│   ├── globals.css                   # Tailwind + token warna (sesuai design.md)
│   ├── page.tsx                      # /  Landing page
│   ├── not-found.tsx                 # 404
│   ├── sitemap.ts                    # /sitemap.xml
│   ├── robots.ts                     # /robots.txt
│   ├── produk/
│   │   ├── page.tsx                  # /produk  Katalog
│   │   └── [slug]/
│   │       └── page.tsx              # /produk/[slug]  Detail produk
│   ├── kategori/
│   │   └── [slug]/
│   │       └── page.tsx              # /kategori/[slug]  (P1)
│   ├── keranjang/
│   │   └── page.tsx                  # /keranjang  (P1)
│   ├── cara-pesan/
│   │   └── page.tsx                  # /cara-pesan
│   ├── faq/
│   │   └── page.tsx                  # /faq
│   ├── tentang/
│   │   └── page.tsx                  # /tentang  (P1)
│   └── kontak/
│       └── page.tsx                  # /kontak   (P1)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWhatsApp.tsx
│   ├── home/                         # Section khusus landing page
│   │   ├── Hero.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ValueProps.tsx            # Keunggulan (halal, dikemas beku, dll.)
│   │   ├── HowToOrder.tsx            # Langkah pesan via WhatsApp
│   │   ├── ColdChainInfo.tsx
│   │   ├── Testimonials.tsx          # (P1)
│   │   └── FinalCTA.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx           # client: filter, pencarian, sort
│   │   ├── ProductFilters.tsx        # client
│   │   ├── ProductGallery.tsx        # client
│   │   ├── VariantPicker.tsx         # client
│   │   ├── QuantityStepper.tsx       # client
│   │   ├── ProductInfoTabs.tsx       # komposisi, cara simpan, cara masak
│   │   └── RelatedProducts.tsx       # (P1)
│   ├── cart/                         # (P1)
│   │   ├── CartProvider.tsx          # client: context + localStorage
│   │   ├── CartButton.tsx            # ikon + badge jumlah di header
│   │   ├── CartDrawer.tsx
│   │   └── CartItemRow.tsx
│   ├── whatsapp/
│   │   └── WhatsAppButton.tsx        # client: buka wa.me + track event
│   └── ui/                           # Komponen dasar yang dipakai ulang
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── ColdChainBadge.tsx
│       ├── Accordion.tsx
│       ├── Container.tsx
│       └── Section.tsx
│
├── data/                             # Sumber data (pengganti database)
│   ├── products.ts
│   ├── categories.ts
│   ├── site-config.ts                # nomor WA, jam buka, area layanan
│   ├── faq.ts
│   └── testimonials.ts               # (P1)
│
├── lib/
│   ├── whatsapp.ts                   # buildWhatsAppUrl, buildOrderMessage
│   ├── format.ts                     # formatRupiah, slugify
│   ├── analytics.ts                  # trackWhatsAppClick
│   ├── products.ts                   # getProducts, getProductBySlug, filter & sort
│   └── utils.ts                      # cn() = clsx + tailwind-merge
│
├── types/
│   └── index.ts                      # Product, Variant, Category, CartItem, SiteConfig
│
├── public/
│   ├── images/
│   │   ├── products/                 # foto produk, mis. dumpling-ayam-1.webp
│   │   ├── banners/
│   │   └── icons/
│   ├── favicon.ico
│   └── og-default.jpg                # gambar Open Graph (1200 x 630)
│
├── .env.local                        # NEXT_PUBLIC_WA_NUMBER, NEXT_PUBLIC_SITE_URL (tidak di-commit)
├── .prettierrc
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

#### b) Aturan struktur

| Aturan | Penjelasan |
|---|---|
| **Server Component by default** | Halaman dan komponen statis (Hero, ProductCard, Footer) tetap Server Component agar JavaScript ke browser minimal. |
| **Client Component seperlunya** | Hanya komponen interaktif yang memakai `"use client"` (ditandai `client` pada pohon di atas): filter/pencarian, varian & jumlah, keranjang, tombol WhatsApp (karena melacak klik). |
| **Data terpisah dari UI** | Semua isi katalog ada di `data/`; komponen tidak berisi data produk. Ini memudahkan pindah ke Google Sheets/CMS di fase berikutnya. |
| **Satu pintu untuk WhatsApp** | Pembuatan tautan dan isi pesan hanya lewat `lib/whatsapp.ts` agar format pesan konsisten di semua tombol. |
| **Satu sumber konfigurasi** | Nomor WhatsApp, jam operasional, dan area layanan hanya diubah di `data/site-config.ts` / `.env.local`. |
| **Import alias** | Gunakan `@/` (mis. `@/components/product/ProductCard`, `@/lib/whatsapp`). |
| **Penamaan** | Komponen: `PascalCase.tsx`; fungsi/utilitas: `camelCase.ts`; folder dan route: `kebab-case`; slug produk: `kebab-case` (mis. `dumpling-ayam`). |
| **Gambar produk** | Format WebP, rasio 1:1, nama file sama dengan slug produk + nomor urut. |

#### c) Pemetaan route ke file data

| Route | Membaca data dari | Catatan rendering |
|---|---|---|
| `/` | `products.ts` (featured), `categories.ts`, `faq.ts`, `site-config.ts` | Static |
| `/produk` | `products.ts`, `categories.ts` | Static + filter di klien |
| `/produk/[slug]` | `products.ts`, `site-config.ts` | `generateStaticParams` dari daftar slug |
| `/kategori/[slug]` | `products.ts`, `categories.ts` | `generateStaticParams` dari daftar kategori |
| `/keranjang` | `localStorage` (via `CartProvider`) | Client |
| `/cara-pesan`, `/faq`, `/tentang`, `/kontak` | `site-config.ts`, `faq.ts` | Static |

#### d) Library tambahan yang dipasang

| Library | Fungsi |
|---|---|
| `lucide-react` | Ikon |
| `clsx` + `tailwind-merge` | Fungsi `cn()` untuk menggabungkan class |
| `embla-carousel-react` | Carousel promo/testimoni |
| `prettier` + `prettier-plugin-tailwindcss` *(dev)* | Format kode dan urutan class |
| `@next/third-parties` *(opsional, saat rilis)* | Google Analytics |


### 10.3 Fungsi inti WhatsApp (referensi)
```ts
export function buildWhatsAppUrl(message: string, number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

### 10.4 Konfigurasi
- `NEXT_PUBLIC_WA_NUMBER` (nomor WhatsApp), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ANALYTICS_ID`.

## 11. Kebutuhan Non-Fungsional

| Area | Persyaratan |
|---|---|
| **Performa** | LCP ≤ 2,5 dtk (mobile 4G), skor Lighthouse Performance ≥ 90; halaman statis dengan gambar teroptimasi |
| **Responsif** | Mobile-first (target layar mulai 360 px); mayoritas trafik dari HP |
| **SEO** | Judul & meta description unik per halaman, Open Graph (agar tautan cantik saat dibagikan di WhatsApp), `sitemap.xml`, `robots.txt`, JSON-LD `Product` pada detail produk dan `LocalBusiness`/`Organization` di beranda |
| **Aksesibilitas** | Target WCAG 2.1 AA: kontras, fokus keyboard, `alt` gambar, label form |
| **Keamanan & privasi** | HTTPS; tidak menyimpan data pribadi di server; keranjang hanya di browser; tautan eksternal memakai `rel="noopener noreferrer"`; jika memakai analytics/pixel, tampilkan pemberitahuan privasi sesuai UU PDP |
| **Ketersediaan** | Hosting statis/CDN (target uptime ≥ 99,9%) |
| **Pemeliharaan** | Data produk terpisah dari komponen; mudah ditambah tanpa mengubah kode UI |
| **Biaya** | Dapat berjalan di tier gratis hosting + domain berbayar |

## 12. Desain & Branding

Mengacu pada `design.md`: palet biru (primer) + kuning (aksen) + frost (penanda beku), kartu bersudut membulat, mobile-first. **Bagian yang berlaku untuk MVP:** header, hero, kategori, kartu produk, detail produk, FAQ, footer, tombol WhatsApp.

**Catatan:** warna tombol WhatsApp memakai **hijau WhatsApp** untuk pengenalan instan, ditempatkan konsisten sebagai CTA pemesanan, sementara biru tetap menjadi warna utama brand.

## 13. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Landing, katalog, dan detail produk dapat diakses tanpa login.
- [ ] Menekan "Pesan via WhatsApp" membuka chat ke nomor yang benar dengan pesan lengkap (produk, varian, jumlah, estimasi harga).
- [ ] Pesan tampil benar di WhatsApp Web dan aplikasi mobile (karakter, baris baru, simbol × dan Rp).
- [ ] Produk berstatus Habis tidak bisa dipesan langsung.
- [ ] Event `click_whatsapp` tercatat di analytics beserta nama produk dan halaman asal.
- [ ] Pencarian dan filter kategori berfungsi di mobile dan desktop.
- [ ] Setiap halaman memiliki meta tag unik dan Open Graph.
- [ ] Skor Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90.
- [ ] Semua halaman informasi (Cara Pesan, FAQ, Kontak) tersedia dengan konten final.
- [ ] Situs diuji di Android Chrome, iOS Safari, dan desktop Chrome/Firefox.

## 14. Rencana Rilis

| Minggu | Fokus | Output |
|---|---|---|
| **0** | Persiapan | Nama brand, logo, nomor WhatsApp Business, daftar produk + foto, teks Cara Pesan/FAQ |
| **1** | Setup & UI dasar | Proyek Next.js, token desain, header/footer, komponen kartu & tombol |
| **2** | Landing + Katalog | Landing page, halaman katalog, filter & pencarian |
| **3** | Detail + WhatsApp | Halaman detail, integrasi WhatsApp, (opsional) keranjang ringan |
| **4** | Finalisasi | Halaman informasi, SEO, analytics, QA lintas perangkat, deploy & domain |
| **Setelah rilis** | Iterasi | Pantau klik WA & chat masuk, perbaiki katalog dan copy |

## 15. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Beban chat manual membesar saat pesanan banyak | Balasan lambat, pesanan terlewat | Template balasan cepat (WhatsApp Business: quick replies, label), jam operasional jelas, evaluasi otomatisasi di fase 2 |
| Harga/stok di web tidak sinkron dengan kenyataan | Kekecewaan pembeli | Wajib konfirmasi stok di chat, status "Habis" diperbarui rutin, pesan "estimasi" |
| Pembeli batal setelah chat (tanpa komitmen pembayaran) | Konversi rendah | Alur jelas, batas waktu konfirmasi, DP/pembayaran di muka sebelum pengiriman |
| Penipuan/bukti transfer palsu | Kerugian | SOP cek mutasi sebelum kirim |
| Produk mencair saat pengiriman | Komplain/refund | Kemasan insulasi + gel pack, batasi area & jadwal, kebijakan komplain tertulis |
| Tautan `wa.me` gagal/terlalu panjang | Pesan terpotong | Batasi panjang pesan, uji di berbagai perangkat, sediakan nomor yang bisa disalin |
| Nomor WhatsApp dibatasi/diblokir karena spam | Saluran penjualan terganggu | Gunakan WhatsApp Business, pola balasan wajar, siapkan nomor cadangan |
| Tidak ada pelacakan pesanan otomatis | Banyak pertanyaan "pesanan saya di mana?" | Kirim update manual di chat, cantumkan estimasi waktu di Cara Pesan |
| Pembaruan katalog bergantung pada developer (opsi A) | Lambat mengubah harga | Pindah ke Google Sheets (opsi B) bila perubahan sering |

## 16. Jalur Upgrade (Fase Berikutnya)

| Fase | Fitur |
|---|---|
| **2** | Pembaruan data via Google Sheets/CMS, kategori & halaman SEO tambahan, testimoni dinamis, kode promo manual |
| **3** | Checkout di web, pembayaran otomatis (payment gateway), nomor pesanan, backend + database |
| **4** | Akun pelanggan, riwayat & pesan ulang, panel admin, ongkir otomatis, notifikasi otomatis, langganan/loyalitas |

Struktur data produk dan komponen UI MVP dirancang agar **dapat dipakai ulang** di fase berikutnya tanpa penulisan ulang total.

## 17. Pertanyaan Terbuka

1. Nama brand, logo, dan nomor WhatsApp Business final?
2. **Perlu keranjang ringan** (multi-produk dalam satu pesan) di MVP, atau cukup tombol pesan per produk?
3. Siapa yang akan memperbarui harga/stok, dan seberapa sering? (menentukan opsi data A/B/C)
4. Metode pembayaran apa yang diterima di WhatsApp (transfer bank mana, QRIS, e-wallet)? Apakah COD atau DP diperlukan?
5. Area layanan awal, jadwal pengiriman, dan minimum order?
6. Berapa jumlah produk awal, dan apakah foto produk berkualitas sudah tersedia?
7. Apakah produk berlabel halal/BPOM dan dokumennya tersedia untuk ditampilkan?
8. Analytics apa yang dipilih (GA4, Plausible, atau Meta Pixel untuk iklan)?
9. Domain apa yang akan dipakai, dan apakah sudah dimiliki?
10. Perlu tombol tautan Instagram/TikTok/Shopee sebagai kanal tambahan?
