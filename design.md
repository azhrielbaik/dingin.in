# DESIGN — [NamaBrand] Frozen Food Catalog & WhatsApp Order

| | |
|---|---|
| **Versi** | 0.2 (selaras dengan `prd.md` v0.2.1) |
| **Proyek** | `dingin.in` (Next.js + Tailwind CSS) |
| **Cakupan** | Landing page, katalog, detail produk, keranjang ringan, halaman informasi. Pemesanan dan pembayaran lewat WhatsApp. |
| **Catatan** | Nilai warna adalah titik awal. Verifikasi kontras final di Figma/DevTools sebelum rilis. |

### Riwayat revisi
| Versi | Perubahan |
|---|---|
| 0.1 | Draft awal untuk e-commerce penuh (login, checkout, status pesanan). |
| **0.2** | Disesuaikan dengan PRD v0.2.1: **dihapus** layout checkout, akun, status pesanan, slot pengiriman, input alamat/peta. **Ditambah** sistem warna & komponen WhatsApp, tombol mengambang, halaman Cara Pesan/FAQ/Kontak, keranjang ringan, pemetaan ke file proyek. Token Tailwind diubah ke format **Tailwind v4** (`@theme`). |

Bagian yang dikeluarkan dari MVP disimpan singkat di **Lampiran A** untuk fase berikutnya.

---

## 1. Prinsip Desain

1. **Bersih & terang.** Latar putih/abu muda, produk menjadi fokus. Kesan higienis dan segar, cocok untuk makanan beku.
2. **Ramah & terpercaya.** Biru untuk rasa aman dan profesional, kuning untuk kehangatan dan selera makan.
3. **Satu tujuan: klik WhatsApp.** Setiap halaman harus memudahkan pengunjung pindah ke chat. Tombol pesan selalu mudah ditemukan dan paling menonjol.
4. **Mobile-first.** Dirancang dari layar 360 px ke atas; mayoritas pengunjung datang dari HP.
5. **Transparan soal produk beku.** Info "dikemas & dikirim tetap beku", suhu simpan, dan halal tampil jelas, bukan tersembunyi.
6. **Jujur soal harga.** Harga di web adalah estimasi; ongkir dan total final dikonfirmasi di WhatsApp. Pesan ini harus terlihat, bukan huruf kecil yang tersembunyi.

**Gaya visual:** modern flat, card-based, sudut membulat, shadow tipis, foto makanan close-up yang hangat. Tidak ada gradasi berat atau tekstur ramai.

---

## 2. Color System

### 2.1 Palet Inti

| Token | Hex | Penggunaan |
|---|---|---|
| `primary-50` | `#EAF3FF` | Latar highlight, hover lembut |
| `primary-100` | `#D4E7FF` | Chip aktif, border lembut |
| `primary-500` | `#0064D2` | **Warna utama brand**: header, link, ikon aktif, tombol sekunder |
| `primary-600` | `#0052AD` | Hover / pressed |
| `primary-700` | `#00408A` | Teks biru pada latar terang, footer |
| `accent-100` | `#FFF4CC` | Latar badge/info bar |
| `accent-400` | `#FFC928` | **Aksen**: badge, highlight, rating, elemen dekoratif |
| `accent-500` | `#FFB800` | Hover aksen |
| `frost-50` | `#E6F4FA` | **Penanda "beku"**: label suhu, section info pengiriman |
| `frost-500` | `#4FB3D9` | Ikon kepingan salju / suhu |

> `frost` adalah tambahan khusus produk beku untuk mengomunikasikan kesan dingin tanpa mengubah identitas biru–kuning.

### 2.2 Netral

| Token | Hex | Penggunaan |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Latar halaman, kartu |
| `neutral-50` | `#F5F6F8` | Latar section selang-seling |
| `neutral-100` | `#ECEEF2` | Divider, skeleton |
| `neutral-200` | `#DDE1E8` | Border input/kartu |
| `neutral-400` | `#9AA3B2` | Placeholder, ikon nonaktif |
| `neutral-500` | `#6B7280` | Teks sekunder |
| `neutral-700` | `#374151` | Teks isi |
| `neutral-900` | `#111827` | Judul, harga, teks utama |

### 2.3 WhatsApp (CTA pemesanan)

Tombol pesan adalah elemen terpenting di MVP, sehingga memakai **hijau WhatsApp** agar dikenali seketika. Warna biru tetap menjadi identitas brand.

| Token | Hex | Penggunaan |
|---|---|---|
| `wa-500` | `#25D366` | Hijau resmi WhatsApp: indikator, titik "online", latar ikon. **Jangan** untuk latar teks putih |
| `wa-600` | `#128C7E` | Tombol mengambang (ikon putih) |
| `wa-700` | `#0F7A5F` | **Tombol "Pesan via WhatsApp"** dengan teks putih |
| `wa-800` | `#0B6350` | Hover / pressed |

> Putih di atas `#25D366` kontrasnya hanya sekitar 2:1, di bawah standar aksesibilitas. Karena itu tombol dengan teks memakai `wa-700`. Angka kontras ini hasil hitung perkiraan; verifikasi dengan contrast checker sebelum rilis.

### 2.4 Semantik

| Token | Hex | Penggunaan |
|---|---|---|
| `success` | `#1A9E5C` | Label halal, konfirmasi |
| `warning` | `#F59E0B` | Peringatan (mis. harga berubah di keranjang) |
| `danger` | `#E5484D` | Error, status Habis |
| `promo` | `#FF5A36` | Badge diskon, harga coret promo |
| `info` | `#0064D2` | Informasi netral |

### 2.5 Proporsi

- **~60%** putih & netral muda
- **~30%** biru (identitas, navigasi, teks judul tertentu)
- **~10%** kuning, frost, promo, dan **hijau WhatsApp** (hanya pada elemen pemesanan)

### 2.6 Aturan Kontras

- Teks di atas **kuning** wajib memakai `neutral-900`.
- Teks di atas **biru** (`primary-500`/`600`) dan **hijau tombol** (`wa-700`/`800`) memakai putih.
- Jangan memakai kuning atau `wa-500` sebagai warna teks pada latar putih.
- Jangan mengandalkan warna saja untuk status; sertakan ikon atau label.
- Target: teks normal ≥ 4,5:1; teks besar, ikon, dan batas komponen UI ≥ 3:1.

### 2.7 Token untuk Tailwind v4 (`app/globals.css`)

Proyek dibuat dengan `create-next-app` (Tailwind memakai konfigurasi lewat CSS, bukan `tailwind.config.js`). Gunakan blok berikut:

```css
@import "tailwindcss";

@theme {
  /* Primary */
  --color-primary-50:  #eaf3ff;
  --color-primary-100: #d4e7ff;
  --color-primary-500: #0064d2;
  --color-primary-600: #0052ad;
  --color-primary-700: #00408a;

  /* Accent */
  --color-accent-100: #fff4cc;
  --color-accent-400: #ffc928;
  --color-accent-500: #ffb800;

  /* Frost (penanda beku) */
  --color-frost-50:  #e6f4fa;
  --color-frost-500: #4fb3d9;

  /* WhatsApp */
  --color-wa-500: #25d366;
  --color-wa-600: #128c7e;
  --color-wa-700: #0f7a5f;
  --color-wa-800: #0b6350;

  /* Netral (menimpa palet neutral bawaan Tailwind) */
  --color-neutral-0:   #ffffff;
  --color-neutral-50:  #f5f6f8;
  --color-neutral-100: #eceef2;
  --color-neutral-200: #dde1e8;
  --color-neutral-400: #9aa3b2;
  --color-neutral-500: #6b7280;
  --color-neutral-700: #374151;
  --color-neutral-900: #111827;

  /* Semantik */
  --color-success: #1a9e5c;
  --color-warning: #f59e0b;
  --color-danger:  #e5484d;
  --color-promo:   #ff5a36;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;

  /* Shadow */
  --shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.06);
  --shadow-md: 0 4px 12px rgba(17, 24, 39, 0.08);
  --shadow-lg: 0 12px 28px rgba(17, 24, 39, 0.12);
}

@theme inline {
  --font-sans: var(--font-jakarta), ui-sans-serif, system-ui, sans-serif;
}
```

Contoh pemakaian: `bg-primary-500`, `text-primary-700`, `bg-frost-50`, `bg-wa-700 hover:bg-wa-800`, `rounded-xl`, `shadow-md`.

**Jika proyek ternyata memakai Tailwind v3**, pakai `tailwind.config.js` berikut:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { 50: '#EAF3FF', 100: '#D4E7FF', 500: '#0064D2', 600: '#0052AD', 700: '#00408A' },
        accent:  { 100: '#FFF4CC', 400: '#FFC928', 500: '#FFB800' },
        frost:   { 50: '#E6F4FA', 500: '#4FB3D9' },
        wa:      { 500: '#25D366', 600: '#128C7E', 700: '#0F7A5F', 800: '#0B6350' },
        promo: '#FF5A36',
      },
      borderRadius: { sm: '8px', md: '12px', lg: '16px', xl: '24px' },
      fontFamily: { sans: ['var(--font-jakarta)', 'Inter', 'system-ui', 'sans-serif'] },
    },
  },
};
```

---

## 3. Tipografi

**Font utama:** Plus Jakarta Sans, dimuat lewat `next/font/google` (tanpa instalasi tambahan). Fallback: Inter → system-ui → sans-serif. Bobot: 400, 500, 600, 700, 800.

| Peran | Mobile | Desktop | Bobot | Line-height |
|---|---|---|---|---|
| Display / Hero | 28 px | 44 px | 800 | 1.15 |
| H1 | 24 px | 32 px | 700 | 1.25 |
| H2 (judul section) | 20 px | 24 px | 700 | 1.3 |
| H3 (judul kartu) | 16 px | 18 px | 600 | 1.35 |
| Body | 14 px | 16 px | 400 | 1.55 |
| Body kecil / caption | 12 px | 13 px | 400–500 | 1.45 |
| Harga (utama) | 18 px | 20 px | 800 | 1.2 |
| Harga coret | 12 px | 14 px | 400 | 1.2 |
| Tombol | 14 px | 16 px | 600 | 1 |

Aturan: harga selalu bold dan berwarna `neutral-900` (atau `promo` untuk harga diskon); maksimal 2 bobot berbeda dalam satu kartu.

---

## 4. Spacing, Grid & Breakpoint

**Skala spacing (basis 4 px):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80.

| Breakpoint | Lebar | Kolom | Gutter | Margin sisi |
|---|---|---|---|---|
| Mobile | < 640 px | 4 | 12 px | 16 px |
| Tablet | 640–1023 px | 8 | 16 px | 24 px |
| Desktop | ≥ 1024 px | 12 | 24 px | auto (container) |

- **Container maksimum:** 1200 px, terpusat.
- **Jarak antar section:** 40 px (mobile) / 64 px (desktop).
- **Grid produk:** 2 kolom (mobile), 3 (tablet), 4 (desktop).

---

## 5. Bentuk, Elevasi & Ikon

- **Radius:** tombol & input 12 px, kartu 16 px, banner/hero 24 px, chip & badge pill penuh.
- **Elevasi:** kartu default `shadow-sm` + border `neutral-200`; hover `shadow-md`; drawer/modal `shadow-lg`.
- **Ikon:** `lucide-react`, stroke 1,5–2 px, ukuran 20/24 px. Ikon kategori ditaruh di dalam lingkaran `primary-50`. Logo WhatsApp tidak ada di Lucide, jadi pakai **SVG resmi/brand asset WhatsApp** sebagai komponen sendiri.
- **Ilustrasi:** minimal, bentuk sederhana dengan palet yang sama.

---

## 6. Fotografi & Gambar

- Foto produk **close-up** dengan latar bersih (putih/abu muda), rasio **1:1** untuk kartu.
- Foto "hasil masak" (matang, hangat, ada uap) untuk hero dan halaman detail agar menggugah selera.
- Format WebP, `next/image`, `loading="lazy"` untuk konten di bawah lipatan; hero memakai `priority`.
- Hindari foto terlalu gelap; sertakan `alt` deskriptif (mis. "Dumpling ayam kukus, isi 20 pcs").
- Siapkan **gambar Open Graph** 1200 × 630 px (logo + foto produk), karena tautan sering dibagikan lewat WhatsApp.

---

## 7. Layout Halaman

### 7.1 Header / Navbar
```
Desktop:
┌────────────────────────────────────────────────────────────────┐
│ [Logo]   Katalog   Cara Pesan   FAQ   Kontak     🛒(2)  [Chat WA]│
└────────────────────────────────────────────────────────────────┘

Mobile:
┌────────────────────────────────┐
│ ☰   [Logo]            🛒(2) [WA]│
└────────────────────────────────┘
```
- Tinggi 64 px (desktop) / 56 px (mobile), latar putih, sticky, `shadow-sm` saat di-scroll.
- **Tidak ada menu Masuk/Daftar.**
- Ikon keranjang hanya tampil jika fitur keranjang ringan aktif (P1).
- Tombol "Chat WA" (`wa-700`) selalu terlihat.
- Menu mobile: drawer dari kiri berisi Katalog, Cara Pesan, FAQ, Tentang, Kontak.
- **Info bar** tipis di atas header (opsional): latar `accent-100`, teks `neutral-900`, mis. "Pesan mudah via WhatsApp · Jam operasional 08.00–20.00".

### 7.2 Beranda `/`
```
[ Info bar ]
[ Header ]
[ HERO ]
   Latar primary-500 (atau primary-50 dengan foto), headline besar,
   subteks 1 baris, foto produk di kanan (desktop) / di bawah (mobile).
   CTA 1: [Lihat Katalog]  (putih/aksen)   CTA 2: [Chat WhatsApp] (wa-700)
   Dekorasi: satu lingkaran kuning sebagai gema logo.
[ Kategori cepat: ikon bulat + label, scroll horizontal di mobile ]
[ Produk unggulan / terlaris: grid 4 kolom, link "Lihat semua" ]
[ Strip keunggulan (latar frost-50):
   ❄ Dikemas tetap beku · ✔ Halal · 🧼 Higienis · 💬 Pesan mudah via WhatsApp ]
[ Cara Pesan: 4 langkah horizontal ]
[ Info pengiriman beku & area layanan (kartu frost) ]
[ Testimoni: carousel kartu (P1) ]
[ FAQ ringkas: accordion 4–5 pertanyaan (P1) ]
[ CTA penutup: latar primary-700, ajakan "Siap stok freezer?" + tombol WhatsApp ]
[ Footer ]
```
Headline contoh: "Stok makanan beku, tinggal masak." Hero tidak memakai kotak pencarian; pencarian ada di halaman katalog.

### 7.3 Katalog `/produk`
```
Desktop:
┌───────────────┬────────────────────────────────────────────┐
│ Filter        │ Judul + jumlah produk   [ 🔍 Cari… ] [Urutkan▾]│
│  Kategori ☐   │ Chip filter aktif (bisa dihapus)           │
│  Halal ☐      │ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │
│               │ │Kartu│ │Kartu│ │Kartu│ │Kartu│            │
└───────────────┴────────────────────────────────────────────┘
```
- Mobile: kolom pencarian di atas, tombol "Filter" dan "Urutkan" sticky di bawah header → bottom sheet.
- Breadcrumb di atas. **Empty state**: "Produk tidak ditemukan" + tombol "Tanya admin via WhatsApp".
- Produk **Habis** tetap tampil (overlay abu + label), tombol berubah menjadi "Tanya Ketersediaan".

### 7.4 Detail Produk `/produk/[slug]`
```
Desktop (2 kolom):
┌──────────────────────┬─────────────────────────────────┐
│ Galeri (thumb + besar)│ Nama produk                    │
│                      │ [Halal] [❄ Dikirim beku]        │
│                      │ Rp 45.000  ~~Rp 55.000~~        │
│                      │ Varian: [250g] [500g] [1kg]     │
│                      │ Jumlah: [− 1 +]                 │
│                      │ Estimasi: Rp 90.000             │
│                      │ [ Pesan via WhatsApp ]  ← wa-700│
│                      │ [ Tambah ke Keranjang ] ← P1    │
│                      │ ℹ Harga belum termasuk ongkir;  │
│                      │   stok dikonfirmasi via WhatsApp│
└──────────────────────┴─────────────────────────────────┘
Tab/accordion: Deskripsi · Komposisi · Cara Simpan · Cara Masak
Produk terkait (grid, P1)
```
- Mobile: galeri swipe di atas, info di bawah, dan **bar CTA sticky di dasar layar** (estimasi harga + tombol WhatsApp). Pada halaman ini tombol WhatsApp mengambang disembunyikan agar tidak menumpuk.
- Kartu "Cara memasak" dengan ikon (goreng / kukus / air fryer) dan durasi.
- Kartu `frost-50` untuk info penyimpanan: suhu simpan, masa simpan, "Segera simpan di freezer saat diterima".
- Tidak ada tab ulasan di MVP.

### 7.5 Keranjang Ringan (P1) `/keranjang` atau drawer
- Daftar item: foto kecil, nama, varian, stepper jumlah, hapus.
- Ringkasan: **"Estimasi subtotal (belum termasuk ongkir)"**, tanpa kolom voucher.
- Tombol utama: **"Kirim Pesanan ke WhatsApp"** (`wa-700`), tombol kecil "Kosongkan keranjang".
- Peringatan `warning` jika harga produk berubah sejak ditambahkan.
- Empty state: ilustrasi sederhana + "Keranjang kosong" + tombol "Lihat Katalog".
- Mobile: drawer dari bawah (bottom sheet); desktop: drawer dari kanan.

### 7.6 Cara Pesan `/cara-pesan`
```
[ Judul + subteks ]
[ 4 langkah (kartu bernomor, horizontal di desktop, vertikal di mobile):
   1 Pilih produk → 2 Klik "Pesan via WhatsApp" → 3 Konfirmasi stok & ongkir
   → 4 Bayar & pesanan dikirim ]
[ Kartu metode pembayaran yang diterima: transfer bank, QRIS, e-wallet ]
[ Kartu estimasi waktu proses + info pengiriman beku ]
[ CTA: Lihat Katalog / Chat WhatsApp ]
```

### 7.7 FAQ `/faq`
- Accordion dikelompokkan: Pemesanan, Pembayaran, Pengiriman Beku, Produk & Halal, Komplain.
- Di bawah daftar: kartu "Belum menemukan jawaban?" + tombol WhatsApp.

### 7.8 Tentang `/tentang` dan Kontak `/kontak`
- **Tentang:** hero kecil, cerita brand, 3 nilai (kualitas, higienis, praktis), foto proses/dapur.
- **Kontak:** kartu nomor WhatsApp (tombol salin + tombol chat), jam operasional, area layanan, tautan sosmed. Peta opsional.

### 7.9 Footer
- Latar `primary-700`, teks putih/`primary-100`.
- 4 kolom: Tentang · Katalog · Bantuan (Cara Pesan, FAQ) · Hubungi Kami (WhatsApp, jam operasional, area layanan).
- Baris metode pembayaran yang diterima + sosial media; garis pemisah + hak cipta.

### 7.10 Halaman 404
- Ilustrasi sederhana, teks "Halaman tidak ditemukan", tombol "Kembali ke Beranda" dan "Lihat Katalog".

---

## 8. Komponen

### 8.1 Tombol

| Varian | Latar | Teks | Border | Pemakaian |
|---|---|---|---|---|
| **WhatsApp** | `wa-700` | putih | — | **CTA pemesanan** (Pesan via WhatsApp, Kirim Pesanan ke WhatsApp, Chat WA) |
| Primary | `primary-500` | putih | — | Navigasi utama (Lihat Katalog) |
| Secondary | putih | `primary-500` | 1 px `primary-500` | Aksi pendukung (Tambah ke Keranjang) |
| Accent | `accent-400` | `neutral-900` | — | Promo/ajakan khusus (maks. 1 per layar) |
| Ghost | transparan | `primary-500` | — | Aksi tersier |
| Danger | `danger` | putih | — | Hapus item |

- Tinggi: 44 px (default), 36 px (kecil), 52 px (besar). Target sentuh minimum 44 × 44 px.
- Hanya **satu tombol WhatsApp utama** per area pandang agar fokus tidak terpecah.
- State: hover (`wa-800` / `primary-600`), pressed `scale(0.98)`, focus ring 2 px offset 2 px, disabled `neutral-200` teks `neutral-400`.

### 8.2 Kartu Produk
```
┌─────────────────────┐
│ [Foto 1:1]  [-20%]  │  ← badge promo kiri atas, label Halal kanan atas
│                     │
│ Dumpling Ayam       │  ← H3, maks. 2 baris
│ 500 g · isi 20 pcs  │  ← caption neutral-500
│ Rp 38.000 ~~48.000~~│  ← harga bold + coret ("Mulai dari" jika varian banyak)
│ ❄ Dikirim beku      │
│ [ Pesan ]           │  ← tombol WhatsApp kecil (P1)
└─────────────────────┘
```
- Seluruh kartu menjadi tautan ke halaman detail; tombol "Pesan" terpisah dan tidak membuka detail.
- Radius 16, border `neutral-200`, hover naik 2 px + `shadow-md`.
- **Habis:** overlay abu pada foto, label "Habis" (`danger`), tombol berubah menjadi "Tanya Ketersediaan".

### 8.3 Input & Pencarian
- Satu-satunya input teks di MVP: kolom **pencarian katalog**. Tinggi 48 px, radius 12, ikon kaca pembesar di kiri, tombol hapus (×) di kanan.
- Focus: border `primary-500` + ring `primary-100`. Placeholder `neutral-400`: "Cari dumpling, nugget…".
- Tidak ada form alamat atau pembayaran di web; data pembeli diketik di WhatsApp.

### 8.4 Chip / Filter
- Pill, tinggi 32–36 px; default `neutral-100`; aktif `primary-50` + border `primary-500` + teks `primary-700`.

### 8.5 Badge & Label

| Badge | Warna | Catatan |
|---|---|---|
| Promo / -20% | `promo` latar, teks putih | Kiri atas foto |
| Terlaris | `accent-400`, teks `neutral-900` | |
| Baru | `primary-100`, teks `primary-700` | |
| Halal | `success` outline + ikon | Tampil hanya jika dokumen valid |
| Habis | `danger` | Overlay + label |
| Dikirim beku (ColdChainBadge) | `frost-50` + ikon salju `frost-500` | |

Tidak ada badge status pesanan atau stok menipis (stok tidak real-time di MVP).

### 8.6 Stepper Jumlah
- Tombol − / + bulat 36 px, angka di tengah, minimum 1, maksimum wajar (mis. 99).

### 8.7 Navigasi tambahan
- Breadcrumb: teks 13 px, pemisah ">".
- Tab/accordion info produk: garis bawah `primary-500` 2 px untuk tab aktif.
- Bottom navigation mobile (opsional): Beranda · Katalog · Keranjang · WhatsApp.

### 8.8 Feedback
- **Toast**: "Ditambahkan ke keranjang" (3 detik), posisi atas tengah (mobile) / kanan atas (desktop).
- **Skeleton loading** (`neutral-100`) untuk grid katalog.
- **Empty state**: ilustrasi sederhana + CTA.
- **Drawer & bottom sheet**: overlay `rgba(17,24,39,0.5)`, radius 24 di sudut atas (sheet).

### 8.9 Komponen Khusus Produk Beku
- **ColdChainBadge:** pill `frost-50` + ikon salju + "Dikirim tetap beku".
- **Panel Info Penyimpanan:** kartu `frost-50` berisi suhu simpan, masa simpan, "Segera simpan di freezer".
- **ColdChainInfo (landing):** section dengan 3 poin: kemasan insulasi + gel pack, jadwal & area kirim, kebijakan komplain.

### 8.10 Komponen WhatsApp

**WhatsAppButton**
- Berisi ikon WhatsApp (SVG brand) + teks. Varian ukuran: kecil (kartu), default, besar (hero/CTA).
- Membuka `https://wa.me/...` di tab baru (`target="_blank"`, `rel="noopener noreferrer"`).
- Mengirim event analytics `click_whatsapp` (halaman asal, produk, varian).
- `aria-label` deskriptif, mis. "Pesan Dumpling Ayam 500 g via WhatsApp (membuka WhatsApp di tab baru)".
- Pada produk Habis: label "Tanya Ketersediaan" dengan varian secondary.

**FloatingWhatsApp**
- Tombol bulat 56 × 56 px, latar `wa-600`, ikon putih 28 px, `shadow-lg`.
- Posisi: kanan bawah, jarak 16 px dari tepi, mempertimbangkan safe-area perangkat.
- Desktop: saat hover muncul label "Chat kami" di sisi kiri.
- Disembunyikan pada halaman detail produk (mobile) yang sudah memakai bar CTA sticky, dan saat drawer keranjang terbuka.
- Pesan bawaan: umum ("Halo, saya mau tanya produk…").

**HowToOrder**
- 4 kartu bernomor: lingkaran bernomor `primary-500`, ikon, judul singkat, 1 kalimat. Konektor garis tipis antar kartu di desktop.

**Catatan harga (PriceNote)**
- Teks kecil `neutral-500` dengan ikon info: "Harga belum termasuk ongkir. Ketersediaan dikonfirmasi via WhatsApp." Tampil di detail produk dan keranjang.

---

## 9. Interaksi & Motion

| Elemen | Durasi | Easing | Efek |
|---|---|---|---|
| Hover kartu | 150 ms | ease-out | naik 2 px + shadow |
| Tombol press | 100 ms | ease-in-out | scale 0.98 |
| Drawer/bottom sheet | 250 ms | ease-out | slide + fade overlay |
| Add to cart | 300 ms | ease-out | ikon keranjang "bump" + toast |
| Carousel | 400 ms | ease-in-out | slide halus |
| FloatingWhatsApp | 300 ms | ease-out | muncul saat scroll > 200 px |

Hormati `prefers-reduced-motion`: matikan animasi non-esensial.

---

## 10. Aksesibilitas (checklist)

- [ ] Kontras teks ≥ 4,5:1, termasuk putih di atas `wa-700` dan `primary-500`.
- [ ] Fokus keyboard terlihat di semua elemen interaktif.
- [ ] Semua gambar punya `alt`; ikon dekoratif `aria-hidden`.
- [ ] Tombol WhatsApp memberi tahu bahwa tautan membuka tab/aplikasi baru.
- [ ] Target sentuh ≥ 44 px, termasuk tombol mengambang.
- [ ] Status tidak hanya dibedakan warna (Habis memakai label teks).
- [ ] Hierarki heading berurutan (satu H1 per halaman).
- [ ] Teks bisa diperbesar sampai 200% tanpa kehilangan fungsi.
- [ ] Accordion FAQ bisa dioperasikan dengan keyboard.

---

## 11. Tone of Voice (copywriting)

- Hangat, jelas, singkat; bahasa Indonesia santai-sopan. Tentukan "kamu" atau "Anda" dan konsisten.
- **CTA:** "Pesan via WhatsApp", "Kirim Pesanan ke WhatsApp", "Tanya Ketersediaan", "Lihat Katalog".
- **Catatan harga:** "Harga belum termasuk ongkir. Total final dikonfirmasi di WhatsApp."
- **Info beku:** "Dikemas dengan gel pack agar tiba tetap beku. Segera simpan di freezer ya!"
- Hindari klaim berlebihan ("paling sehat", "tanpa bahan kimia") tanpa bukti.

---

## 12. Brand & Logo

- Gunakan **nama dan logo orisinal**. Palet biru + kuning dipakai sebagai sistem warna, **bukan** meniru bentuk logo merek lain.
- Ide: wordmark huruf kecil yang bersahabat berwarna `primary-500` dengan satu elemen kuning yang berkaitan dengan makanan.
- Siapkan versi: berwarna, putih (di atas biru), mono, favicon 32 × 32, dan gambar Open Graph.

---

## 13. Pemetaan Desain ke File Proyek

| Desain | File di proyek (`dingin.in`) |
|---|---|
| Header, Footer, tombol mengambang | `components/layout/Header.tsx`, `Footer.tsx`, `FloatingWhatsApp.tsx` |
| Hero, kategori cepat, unggulan, keunggulan, cara pesan, info beku, testimoni, CTA penutup | `components/home/*` |
| Kartu, grid, filter, galeri, varian, stepper, tab info | `components/product/*` |
| Keranjang ringan | `components/cart/*` |
| Tombol WhatsApp | `components/whatsapp/WhatsAppButton.tsx` |
| Button, Badge, ColdChainBadge, Accordion, Container, Section | `components/ui/*` |
| Token warna, radius, shadow, font | `app/globals.css` + `app/layout.tsx` |
| Halaman | `app/page.tsx`, `app/produk/*`, `app/kategori/[slug]`, `app/keranjang`, `app/cara-pesan`, `app/faq`, `app/tentang`, `app/kontak`, `app/not-found.tsx` |

---

## 14. Prioritas Deliverable Desain

1. Logo, favicon, dan gambar Open Graph.
2. UI kit di Figma: token (warna termasuk `wa-*`), tipografi, komponen di bagian 8.
3. Desain high-fidelity, **mobile dulu** lalu desktop: Beranda, Katalog, Detail Produk, Cara Pesan, FAQ, Kontak.
4. P1: Keranjang ringan, Tentang, halaman kategori, testimoni.
5. Prototype klik untuk uji alur "lihat produk → pesan via WhatsApp" bersama 5–8 calon pengguna.
6. Handoff: token CSS/Tailwind, aset ikon & SVG WhatsApp, panduan responsif.

---

## Lampiran A — Dikeluarkan dari MVP (disimpan untuk fase berikutnya)

| Desain | Fase | Catatan |
|---|---|---|
| Checkout 3 langkah (alamat → pengiriman → pembayaran) + stepper | Fase 3 | Butuh backend & payment gateway |
| Pemilih slot pengiriman, validasi area otomatis, pin peta alamat | Fase 3 | |
| Metode pembayaran sebagai kartu radio (QRIS, VA, e-wallet) | Fase 3 | Di MVP hanya informasi di halaman Cara Pesan |
| Halaman konfirmasi + timeline status pesanan | Fase 3–4 | |
| Halaman akun: profil, riwayat pesanan, buku alamat, "Pesan lagi" | Fase 4 | Butuh login |
| Badge status pesanan, badge stok menipis | Fase 3–4 | Butuh data real-time |
| Input voucher, progress bar gratis ongkir | Fase 2–3 | |
| Tab ulasan & rating | Fase 3 | |
| Kotak pencarian di hero + autosuggest | Fase 2 | |
