"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  X,
  User,
  Truck,
  Store,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Mail,
  FileText,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useCart } from "./CartProvider";
import { formatRupiah } from "@/lib/format";
import { siteConfig } from "@/data/site-config";
import { OrderFormData } from "@/types";
import { buildStructuredOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/whatsapp/WhatsAppIcon";

const CUSTOMER_STORAGE_KEY = "dingin_in_customer_data_v1";

const JABODETABEK_AREAS = [
  "Jakarta Barat",
  "Jakarta Selatan",
  "Jakarta Pusat",
  "Jakarta Timur",
  "Jakarta Utara",
  "Tangerang Kota",
  "Tangerang Selatan (BSD/Bintaro/Pamulang)",
  "Kab. Tangerang",
  "Depok",
  "Bekasi Kota",
  "Kab. Bekasi",
  "Bogor (Area Paxel)",
  "Luar Jabodetabek (Konfirmasi Paxel)",
];

const DELIVERY_TIMES = [
  "Secepatnya Hari Ini (Instan / Sameday)",
  "Pagi (09.00 - 12.00 WIB)",
  "Siang (12.00 - 15.00 WIB)",
  "Sore (15.00 - 18.00 WIB)",
  "Besok Pagi (09.00 - 12.00 WIB)",
  "Besok Siang / Sore",
];

const PICKUP_TIMES = [
  "Hari ini (1-2 jam lagi)",
  "Hari ini Siang (12.00 - 14.00 WIB)",
  "Hari ini Sore (15.00 - 18.00 WIB)",
  "Besok Pagi (09.00 - 12.00 WIB)",
  "Besok Siang / Sore (13.00 - 18.00 WIB)",
];

const initialFormData: OrderFormData = {
  name: "",
  phone: "",
  email: "",
  fulfillmentMethod: "delivery",
  area: JABODETABEK_AREAS[0],
  address: "",
  notesCourier: "",
  preferredTime: DELIVERY_TIMES[0],
  pickupLocation: siteConfig.address || "Rawa Belong, Jakarta Barat",
  pickupTime: PICKUP_TIMES[0],
  pickupPerson: "",
  orderNotes: "",
};

export function OrderStepperModal() {
  const { isCheckoutOpen, closeCheckout, checkoutItems } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State with local storage pre-fill on initialization
  const [formData, setFormData] = useState<OrderFormData>(() => {
    if (typeof window === "undefined") return initialFormData;
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialFormData,
          name: parsed.name || "",
          phone: parsed.phone || "",
          email: parsed.email || "",
          area: parsed.area || JABODETABEK_AREAS[0],
          address: parsed.address || "",
          notesCourier: parsed.notesCourier || "",
        };
      }
    } catch {
      // ignore
    }
    return initialFormData;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setStep(1);
    setErrors({});
    closeCheckout();
  };

  // Prevent background scroll when modal open
  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCheckoutOpen]);

  const subtotal = useMemo(
    () => checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [checkoutItems]
  );

  const totalQty = useMemo(
    () => checkoutItems.reduce((acc, item) => acc + item.quantity, 0),
    [checkoutItems]
  );

  if (!isCheckoutOpen) return null;

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi";
    }
    const cleanPhone = formData.phone.replace(/[^\d]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Nomor WhatsApp wajib diisi";
    } else if (cleanPhone.length < 9) {
      newErrors.phone = "Nomor WhatsApp minimal 9 digit (misal: 0812xxxxxxxx)";
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Format email tidak valid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.fulfillmentMethod === "delivery") {
      if (!formData.address.trim()) {
        newErrors.address = "Alamat pengantaran lengkap wajib diisi";
      } else if (formData.address.trim().length < 10) {
        newErrors.address = "Tuliskan alamat lengkap beserta jalan/nomor rumah/RT-RW";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToStep2 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleNextToStep3 = () => {
    if (validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmitOrderToWA = () => {
    // Save customer info locally for future auto-fill
    try {
      localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          area: formData.area,
          address: formData.address,
          notesCourier: formData.notesCourier,
        })
      );
    } catch {
      // ignore
    }

    // Build automated message
    const message = buildStructuredOrderMessage({
      items: checkoutItems,
      formData,
    });

    // Track analytics
    trackWhatsAppClick({
      source: "stepper_checkout_modal",
      product: checkoutItems.map((i) => i.productName).join(", "),
      value: subtotal,
    });

    const url = buildWhatsAppUrl(message);
    window.open(url, "_blank");
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Formulir Pemesanan Makanan Beku"
        className="relative w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-full sm:max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200 mt-auto sm:mt-0"
      >
        {/* Header with Title & Stepper indicator */}
        <div className="px-5 sm:px-7 pt-5 pb-4 border-b border-neutral-100 bg-white shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary-600 block">
                Formulir Pemesanan dingin.in
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 leading-tight">
                {step === 1 && "Langkah 1: Data Kontak Pemesan"}
                {step === 2 && "Langkah 2: Metode & Lokasi Pengiriman"}
                {step === 3 && "Langkah 3: Konfirmasi & Kirim via WhatsApp"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              aria-label="Tutup form"
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-between relative">
            {/* Step 1 Pill */}
            <div
              onClick={() => step > 1 && setStep(1)}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step === 1
                  ? "text-primary-600 font-bold"
                  : step > 1
                  ? "text-success font-semibold"
                  : "text-neutral-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 1
                    ? "bg-primary-500 text-white shadow-xs ring-4 ring-primary-50"
                    : step > 1
                    ? "bg-success text-white"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
              </div>
              <span className="text-xs hidden sm:inline">Kontak</span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-2.5 transition-colors ${
                step >= 2 ? "bg-success" : "bg-neutral-200"
              }`}
            />

            {/* Step 2 Pill */}
            <div
              onClick={() => {
                if (step === 3) setStep(2);
                else if (step === 1 && validateStep1()) setStep(2);
              }}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step === 2
                  ? "text-primary-600 font-bold"
                  : step > 2
                  ? "text-success font-semibold"
                  : "text-neutral-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 2
                    ? "bg-primary-500 text-white shadow-xs ring-4 ring-primary-50"
                    : step > 2
                    ? "bg-success text-white"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : "2"}
              </div>
              <span className="text-xs hidden sm:inline">Pengantaran</span>
            </div>

            <div
              className={`flex-1 h-0.5 mx-2.5 transition-colors ${
                step === 3 ? "bg-primary-500" : "bg-neutral-200"
              }`}
            />

            {/* Step 3 Pill */}
            <div
              onClick={() => {
                if (validateStep1() && validateStep2()) setStep(3);
              }}
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step === 3 ? "text-primary-600 font-bold" : "text-neutral-400"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === 3
                    ? "bg-primary-500 text-white shadow-xs ring-4 ring-primary-50"
                    : "bg-neutral-100 text-neutral-500"
                }`}
              >
                3
              </div>
              <span className="text-xs hidden sm:inline">Konfirmasi</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 bg-white">
          {/* ================= STEP 1: DATA KONTAK ================= */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-frost-50 text-xs text-neutral-600 flex items-start gap-2.5">
                <User className="w-4 h-4 text-frost-500 shrink-0 mt-0.5" />
                <p>
                  Data ini digunakan oleh admin untuk menghubungi Anda saat verifikasi pesanan, pengiriman foto kemasan beku, dan perhitungan ongkos kirim.
                </p>
              </div>

              {/* Input Nama */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center justify-between">
                  <span>Nama Lengkap <span className="text-danger">*</span></span>
                  <span className="text-[11px] text-neutral-400 font-normal">Sesuai nama penerima</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="Contoh: Ibu Rina Wulandari"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${
                      errors.name ? "border-danger focus:border-danger" : "border-neutral-200 focus:border-primary-500"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-danger flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Input No WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center justify-between">
                  <span>Nomor WhatsApp / HP Aktif <span className="text-danger">*</span></span>
                  <span className="text-[11px] text-neutral-400 font-normal">Untuk konfirmasi kirim</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="Contoh: 081234567890"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${
                      errors.phone ? "border-danger focus:border-danger" : "border-neutral-200 focus:border-primary-500"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-danger flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Input Email (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center justify-between">
                  <span>Alamat Email <span className="text-neutral-400 font-normal">(Opsional)</span></span>
                  <span className="text-[11px] text-neutral-400 font-normal">Untuk salinan invoice</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="Contoh: rina@gmail.com"
                    className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${
                      errors.email ? "border-danger focus:border-danger" : "border-neutral-200 focus:border-primary-500"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-danger flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 2: METODE PENGANTARAN / PICK-UP ================= */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Radio Cards: Delivery vs Pickup */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-neutral-800 block mb-2">
                  Pilih Cara Pengambilan Pesanan:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Delivery Option Card */}
                  <div
                    onClick={() => setFormData({ ...formData, fulfillmentMethod: "delivery" })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      formData.fulfillmentMethod === "delivery"
                        ? "border-primary-500 bg-primary-50/40 ring-2 ring-primary-500/20"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        formData.fulfillmentMethod === "delivery"
                          ? "bg-primary-500 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-neutral-900">Diantarkan</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary-100 text-primary-700">
                          Populer
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 leading-snug">
                        Dikirim kurir instan/sameday + kemasan insulasi es beku.
                      </p>
                    </div>
                  </div>

                  {/* Pick-up Option Card */}
                  <div
                    onClick={() => setFormData({ ...formData, fulfillmentMethod: "pickup" })}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      formData.fulfillmentMethod === "pickup"
                        ? "border-primary-500 bg-primary-50/40 ring-2 ring-primary-500/20"
                        : "border-neutral-200 hover:border-neutral-300 bg-white"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        formData.fulfillmentMethod === "pickup"
                          ? "bg-primary-500 text-white"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-neutral-900">Ambil Sendiri</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-success/15 text-success">
                          Gratis Ongkir
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-1 leading-snug">
                        Ambil langsung di gerai Rawa Belong, Jakarta Barat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* IF DELIVERY FORM */}
              {formData.fulfillmentMethod === "delivery" && (
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  {/* Pilihan Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 block">
                      Area / Wilayah Pengiriman
                    </label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                    >
                      {JABODETABEK_AREAS.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Alamat Lengkap */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center justify-between">
                      <span>Alamat Lengkap Pengantaran <span className="text-danger">*</span></span>
                      <span className="text-[11px] text-neutral-400 font-normal">Sertakan no. rumah & RT/RW</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.address}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errors.address) setErrors({ ...errors, address: "" });
                      }}
                      placeholder="Contoh: Jl. Anggrek Cendrawasih No. 24, RT 03 / RW 05, Kel. Palmerah, Kec. Palmerah"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all ${
                        errors.address ? "border-danger focus:border-danger" : "border-neutral-200 focus:border-primary-500"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-danger flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Patokan / Catatan Kurir */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 block">
                      Patokan Lokasi / Catatan Kurir <span className="text-neutral-400 font-normal">(Opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.notesCourier}
                      onChange={(e) => setFormData({ ...formData, notesCourier: e.target.value })}
                      placeholder="Contoh: Pagar warna hitam samping warung kopi, titip ke satpam cluster"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  {/* Waktu Kirim */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 block">
                      Pilihan Waktu Pengiriman
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                    >
                      {DELIVERY_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* IF PICKUP FORM */}
              {formData.fulfillmentMethod === "pickup" && (
                <div className="space-y-4 pt-2 border-t border-neutral-100">
                  {/* Store info banner */}
                  <div className="p-4 rounded-2xl bg-frost-50 border border-frost-500/20 text-xs text-neutral-700 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-neutral-900 text-sm">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span>Lokasi Pengambilan Gerai dingin.in:</span>
                    </div>
                    <p className="leading-relaxed">
                      {siteConfig.address || "Jl. Kebon Jeruk Raya No. 45, Rawa Belong, Palmerah, Jakarta Barat"}
                    </p>
                    <div className="flex items-center gap-1.5 text-neutral-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-primary-500" />
                      <span>Buka Setiap Hari: 08.00 - 18.00 WIB</span>
                    </div>
                  </div>

                  {/* Jam Ambil */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 block">
                      Estimasi Waktu Pengambilan
                    </label>
                    <select
                      value={formData.pickupTime}
                      onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                    >
                      {PICKUP_TIMES.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nama Pengambil */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-bold text-neutral-800 block">
                      Nama yang Mengambil <span className="text-neutral-400 font-normal">(Kosongkan jika diambil sendiri)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pickupPerson}
                      onChange={(e) => setFormData({ ...formData, pickupPerson: e.target.value })}
                      placeholder={`Default: ${formData.name || "Sesuai nama pemesan"} (atau isi nama ojol/driver)`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= STEP 3: KONFIRMASI PESANAN ================= */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Items Summary Accordion/Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                <div className="flex items-center justify-between font-bold text-xs sm:text-sm text-neutral-900 pb-2 border-b border-neutral-200/70">
                  <span>Daftar Item ({totalQty} kemasan)</span>
                  <span className="text-primary-600">{formatRupiah(subtotal)}</span>
                </div>
                <div className="divide-y divide-neutral-200/50 max-h-40 overflow-y-auto pr-1">
                  {checkoutItems.map((item) => (
                    <div key={item.variantId} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-white border border-neutral-200">
                            <Image src={item.image} alt={item.productName} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-neutral-900 line-clamp-1">{item.productName}</p>
                          <p className="text-neutral-500 text-[11px]">{item.variantLabel} × {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-800">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Pemesan & Pengiriman Summary Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Kontak Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Penerima:
                  </span>
                  <p className="font-bold text-neutral-900 text-sm">{formData.name}</p>
                  <p className="text-neutral-600 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-neutral-400" />
                    {formData.phone}
                  </p>
                  {formData.email && (
                    <p className="text-neutral-500 flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {formData.email}
                    </p>
                  )}
                </div>

                {/* Pengiriman Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-neutral-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Metode:
                  </span>
                  <div className="flex items-center gap-1.5">
                    {formData.fulfillmentMethod === "delivery" ? (
                      <>
                        <Truck className="w-4 h-4 text-primary-500" />
                        <span className="font-bold text-primary-700">Diantarkan ({formData.area})</span>
                      </>
                    ) : (
                      <>
                        <Store className="w-4 h-4 text-success" />
                        <span className="font-bold text-success">Ambil Sendiri di Gerai</span>
                      </>
                    )}
                  </div>
                  <p className="text-neutral-600 line-clamp-2 leading-tight">
                    {formData.fulfillmentMethod === "delivery" ? formData.address : formData.pickupLocation}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Waktu: {formData.fulfillmentMethod === "delivery" ? formData.preferredTime : formData.pickupTime}
                  </p>
                </div>
              </div>

              {/* Catatan Tambahan Form */}
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-neutral-800 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-neutral-400" />
                  <span>Catatan Khusus untuk Admin <span className="text-neutral-400 font-normal">(Opsional)</span></span>
                </label>
                <textarea
                  rows={2}
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="Contoh: Mohon dipisah ice pack-nya, kirim sebelum jam 3 sore ya min."
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-900 bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-primary-500"
                />
              </div>

              {/* Jaminan Informasi */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-frost-50 text-[11px] text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-frost-500 shrink-0" />
                <span>
                  Admin akan membalas di WhatsApp untuk konfirmasi ongkir terhemat & nomor rekening/QRIS resmi.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-neutral-100 bg-neutral-50/70 shrink-0 flex items-center justify-between gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as 1 | 2)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Batal
            </button>
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={handleNextToStep2}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ml-auto"
            >
              <span>Lanjut ke Pengiriman</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={handleNextToStep3}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ml-auto"
            >
              <span>Lanjut ke Konfirmasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmitOrderToWA}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-wa-700 hover:bg-wa-800 text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
            >
              <WhatsAppIcon className="w-5 h-5 text-white" />
              <span>Kirim Pesanan ke WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
