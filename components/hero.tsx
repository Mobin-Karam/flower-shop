"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { memo, useMemo } from "react";

// ── Animation Variants ──────────────────────────────────────────────
// Typed correctly: ease uses Framer's accepted tuple form for cubic-bezier
const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
});

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

// Ambient shimmer for the logo ring
const ringPulse: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: [0, 0.35, 0.15],
    scale: [0.8, 1.08, 1],
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      times: [0, 0.6, 1],
    },
  },
};

// ── Sub-components (memoised for performance) ────────────────────────
const BackgroundLayers = memo(function BackgroundLayers() {
  return (
    <div className="absolute inset-0 will-change-transform" aria-hidden="true">
      {/* Primary background — loaded eagerly, high priority */}
      <Image
        src="/flowers/rose-1.jpg"
        alt=""
        fill
        priority
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
        style={{ willChange: "transform" }}
      />
      {/* Overlay texture */}
      <Image
        src="/flowers/rose-2.jpg"
        alt=""
        fill
        quality={60}
        sizes="100vw"
        className="object-cover object-center opacity-35 mix-blend-overlay"
        style={{ willChange: "transform" }}
      />
      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-stone-900/40 to-rose-950/55" />
      {/* Subtle radial highlight behind content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
    </div>
  );
});

// ── Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // When the user prefers reduced motion we collapse delays to near-zero
  const d0 = prefersReducedMotion ? 0 : 0;
  const d1 = prefersReducedMotion ? 0 : 0.2;
  const d2 = prefersReducedMotion ? 0 : 0.42;
  const d3 = prefersReducedMotion ? 0 : 0.6;

  const fadeUp0 = useMemo(() => fadeUp(d0), [d0]);
  const fadeUp1 = useMemo(() => fadeUp(d1), [d1]);
  const fadeUp2 = useMemo(() => fadeUp(d2), [d2]);
  const fadeUp3 = useMemo(() => fadeUp(d3), [d3]);

  return (
    <section
      className="relative h-[90vh] min-h-[580px] overflow-hidden font-[Vazirmatn]"
      aria-label="بخش اصلی"
    >
      <BackgroundLayers />

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center text-white max-w-2xl mx-auto flex flex-col items-center gap-0">
          {/* ── Logo mark ── */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="show"
            className="relative mb-7 flex items-center justify-center"
          >
            {/* Ambient glow ring */}
            <motion.span
              variants={ringPulse}
              initial="hidden"
              animate="show"
              className="absolute inset-0 rounded-full bg-rose-300/25 blur-2xl"
              aria-hidden="true"
            />

            {/* Logo container */}
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-white/20 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm bg-white/5">
              <Image
                src="/logo/logo.png"
                alt="لوگوی گل محمدی"
                fill
                priority
                quality={90}
                sizes="(max-width:768px) 96px, 128px"
                className="object-contain p-2"
              />
            </div>
          </motion.div>

          {/* ── Brand name ── */}
          <motion.div
            variants={fadeUp0}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-1"
          >
            {/* Eyebrow */}
            <span className="text-[11px] md:text-xs tracking-[0.28em] uppercase text-rose-200/70 font-medium select-none">
              گل‌های طبیعی ایران
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]">
              گل محمدی
            </h1>
          </motion.div>

          {/* ── Divider ── */}
          <motion.div
            variants={fadeUp1}
            initial="hidden"
            animate="show"
            className="mt-5 flex items-center gap-3 w-full max-w-xs"
            aria-hidden="true"
          >
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-rose-300/60 shrink-0"
            >
              <circle cx="7" cy="7" r="2.5" fill="currentColor" />
              <circle
                cx="7"
                cy="7"
                r="6"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeDasharray="2 2"
              />
            </svg>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
          </motion.div>

          {/* ── Tagline ── */}
          <motion.p
            variants={fadeUp2}
            initial="hidden"
            animate="show"
            className="mt-5 text-sm md:text-base leading-relaxed text-rose-100/75 max-w-sm"
          >
            عطر گل‌ها، طعم چای و لحظه‌هایی که آرامش را دوباره تعریف می‌کنند
          </motion.p>

          {/* ── CTA buttons ── */}
          <motion.div
            variants={fadeUp3}
            initial="hidden"
            animate="show"
            className="mt-9 flex justify-center gap-3 flex-wrap"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 transition-all duration-200 px-7 py-3 rounded-full text-white text-sm font-semibold shadow-[0_4px_20px_rgba(4,120,87,0.45)] hover:shadow-[0_6px_28px_rgba(4,120,87,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <span>خرید چای گل محمدی</span>
              {/* Arrow icon — subtle micro-interaction */}
              <svg
                className="w-4 h-4 -rotate-90 opacity-75 group-hover:translate-x-0.5 transition-transform duration-200"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M8 3v10M4 9l4 4 4-4" />
              </svg>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/10 active:bg-white/5 transition-all duration-200 px-6 py-3 rounded-full text-white/85 text-sm font-medium backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            >
              بیشتر بدانید
            </Link>
          </motion.div>

          {/* ── Trust badges ── */}
          <motion.div
            variants={fadeUp3}
            initial="hidden"
            animate="show"
            className="mt-8 flex items-center justify-center gap-5 text-[11px] text-rose-100/50"
          >
            {[
              { icon: "🌹", label: "محصول طبیعی" },
              { icon: "🍃", label: "ارگانیک" },
              { icon: "🚚", label: "ارسال سراسری" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <span className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);
