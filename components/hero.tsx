'use client'

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden font-[Vazirmatn]">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-rose-950/40" />

      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center text-white px-6 max-w-3xl">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold tracking-wide"
          >
            گل محمدی
          </motion.h1>

          <p className="mt-5 text-lg md:text-2xl text-rose-100 leading-relaxed">
            زیبایی گل‌ها برای لحظه‌هایی که فراموش نمی‌شوند
          </p>

          <p className="mt-3 text-sm md:text-base text-rose-200">
            Flowers that carry emotion, elegance, and Persian warmth
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">

            <Link
              href="/shop"
              className="bg-rose-600 hover:bg-rose-700 transition px-7 py-3 rounded-full text-white shadow-lg"
            >
              خرید گل‌ها
            </Link>

            <Link
              href="/contact"
              className="px-7 py-3 rounded-full border border-white/70 text-white hover:bg-white/10 transition"
            >
              تماس با ما
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}