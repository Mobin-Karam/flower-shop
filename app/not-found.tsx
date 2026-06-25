import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        
        {/* ICON */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <AlertCircle className="w-7 h-7 text-muted-foreground" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-2">
          صفحه پیدا نشد
        </h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-muted-foreground leading-7 mb-6">
          متأسفیم، صفحه‌ای که دنبال آن هستید وجود ندارد یا حذف شده است.
          لطفاً مسیر را بررسی کنید یا به صفحه اصلی بازگردید.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-medium hover:opacity-90 transition"
        >
          <Home className="w-4 h-4" />
          بازگشت به صفحه اصلی
        </Link>

        {/* SECONDARY HINT */}
        <p className="text-xs text-muted-foreground mt-5">
          در صورت ادامه مشکل، مسیر URL را بررسی کنید.
        </p>
      </div>
    </div>
  );
}