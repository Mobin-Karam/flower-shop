import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50 mt-20 font-[Vazirmatn]">

      <div className="container-custom py-14">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-wide">
              گل محمدی
            </h3>

            <p className="mt-4 text-emerald-200 leading-relaxed">
              دمنوش‌های طبیعی، گل‌های آرامش‌بخش و لحظه‌هایی برای نفس کشیدن.
            </p>

            <p className="mt-3 text-sm text-emerald-300">
              Herbal tea rituals inspired by Persian calm living
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-emerald-100">دسترسی سریع</h4>

            <div className="flex flex-col gap-3 mt-4 text-emerald-200">

              <Link className="hover:text-white transition" href="/">
                خانه
              </Link>

              <Link className="hover:text-white transition" href="/shop">
                فروشگاه دمنوش
              </Link>

              <Link className="hover:text-white transition" href="/contact">
                ارتباط با ما
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-emerald-100">ارتباط</h4>

            <p className="mt-4 text-emerald-200">
              پشتیبانی از طریق واتساپ و پیام
            </p>

            <p className="mt-2 text-sm text-emerald-300">
              پاسخ‌گویی سریع برای انتخاب دمنوش مناسب شما
            </p>
          </div>

        </div>

        {/* bottom */}
        <div className="border-t border-emerald-800/60 mt-12 pt-6 text-center text-emerald-300 text-sm">

          © {new Date().getFullYear()} گل محمدی — آرامش در هر فنجان

        </div>

      </div>
    </footer>
  );
}