import Link from "next/link";

export default function CTASection() {
  return (
    <section className="section font-[Vazirmatn]">

      <div className="container-custom">

        <div className="rounded-[48px] p-12 md:p-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white text-center shadow-2xl relative overflow-hidden">

          {/* soft ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

          <h2 className="text-3xl md:text-5xl font-bold tracking-wide relative">
            لحظه‌ای برای آرامش خودت 🍃
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-emerald-100 leading-relaxed relative">
            یک فنجان دمنوش، چند لحظه سکوت، و بازگشت به آرامش.
            در دنیای شلوغ امروز، این لحظه‌ها ارزشمندترین هدیه‌اند.
          </p>

          <p className="mt-3 text-sm text-emerald-200 relative">
            A Persian tea ritual for calm mind and soft living
          </p>

          <div className="mt-10 relative flex justify-center gap-4 flex-wrap">

            <Link
              href="/shop"
              className="inline-block bg-amber-400 text-emerald-950 px-10 py-4 rounded-full font-semibold hover:bg-amber-300 transition shadow-lg"
            >
              شروع آرامش
            </Link>

            <Link
              href="/contact"
              className="inline-block border border-emerald-200 text-white px-8 py-4 rounded-full hover:bg-white/10 transition"
            >
              راهنمای انتخاب دمنوش
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}