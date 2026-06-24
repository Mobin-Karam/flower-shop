import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <div className="text-center max-w-md card p-10">
        {/* Icon */}
        <div className="text-6xl mb-4">🌸</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-(--accent) mb-3">
          صفحه پیدا نشد
        </h1>

        {/* Description */}
        <p className="text-gray-600 leading-7 mb-6">
          متأسفیم 🌿 صفحه‌ای که دنبال آن بودید وجود ندارد یا حذف شده است.
          <br />
          لطفاً به صفحه اصلی بازگردید.
        </p>

        {/* CTA */}
        <Link href="/">
          <button className="btn-primary w-full">بازگشت به صفحه اصلی</button>
        </Link>

        {/* Secondary hint */}
        <p className="text-xs text-gray-400 mt-5">
          اگر فکر می‌کنید اشتباهی رخ داده، لطفاً دوباره تلاش کنید.
        </p>
      </div>
    </div>
  );
}
