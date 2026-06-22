'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden font-[Vazirmatn]">

      {/* Background Images */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/flowers/rose-1.jpg')" }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('/flowers/rose-2.jpg')" }}
        />
      </div>

      {/* Soft Relax Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-stone-900/40 to-rose-950/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">

        <div className="text-center text-white px-6 max-w-3xl">

          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-wide"
          >
           گل محمدی
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-3 text-sm md:text-base text-rose-100/80"
          >
            عطر گل‌ها، طعم چای و لحظه‌هایی که آرامش را دوباره تعریف می‌کنند
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex justify-center gap-4 flex-wrap"
          >
            <Link
              href="/shop"
              className="bg-emerald-700 hover:bg-emerald-800 transition px-7 py-3 rounded-full text-white shadow-lg"
            >
             خرید برای نوشیدن چایی ...
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}