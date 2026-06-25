"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const trustBadges = [
  { id: 1, label: "پرداخت امن", icon: "/footer/footer1.svg" },
  { id: 2, label: "ارسال سریع", icon: "/footer/footer2.svg" },
  { id: 3, label: "ضمانت کیفیت", icon: "/footer/footer3.svg" },
  { id: 4, label: "پشتیبانی ۲۴/۷", icon: "/footer/footer4.svg" },
  { id: 5, label: "بازگشت کالا", icon: "/footer/footer5.svg" },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="mt-20 border-t bg-background text-foreground font-[Vazirmatn]">
      <div className="container-custom py-12 space-y-10">
        {/* ================= BRAND HEADER ================= */}
        <div className="flex flex-row items-center justify-between text-center gap-3">
          <div className="flex flex-row items-center gap-3 text-center">
            <div className="w-14 h-14 relative">
              <Image
                src="/logo/logo.png"
                alt="گلیفای"
                fill
                className="object-contain"
                priority
              />
            </div>

            <h2 className="text-xl font-semibold">گلیفای</h2>

            <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
              فروشگاه تخصصی محصولات طبیعی و دمنوش‌های گیاهی. تجربه خرید سریع،
              امن و ساده.
            </p>
          </div>
          {/* ================= BACK TO TOP BUTTON ================= */}
          {showTop && (
            <button
              onClick={scrollToTop}
              className="
            bg-primary text-primary-foreground
            p-3 rounded-full shadow-lg
            hover:scale-105 active:scale-95
            transition-all
            text-center flex
          "
            >
              <p className="">برگشت به بالا</p>
              <ArrowUp size={18} />
            </button>
          )}
        </div>

        {/* ================= TRUST STRIP ================= */}
        <div className="grid grid-cols-5 gap-3 md:gap-6 items-center">
          {trustBadges.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center gap-2 opacity-80 hover:opacity-100 transition"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 relative">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="text-[10px] md:text-xs text-muted-foreground text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border" />

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">دسترسی سریع</h4>

            <div className="flex flex-col gap-2 text-sm">
              {[
                { href: "/", label: "خانه" },
                { href: "/shop", label: "فروشگاه" },
                { href: "/categories", label: "دسته‌بندی‌ها" },
                { href: "/contact", label: "تماس با ما" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">خدمات مشتریان</h4>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>پشتیبانی سفارش‌ها در تمام ساعات کاری</p>
              <p>ارسال سریع به سراسر کشور</p>
              <p>ضمانت بازگشت کالا</p>
              <p>مشاوره انتخاب محصول مناسب</p>
            </div>
          </div>

          {/* BRAND SUMMARY */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">درباره ما</h4>

            <p className="text-sm text-muted-foreground leading-relaxed">
              گلیفای با تمرکز بر محصولات طبیعی، تجربه‌ای امن و ساده برای خرید
              آنلاین دمنوش‌ها و گیاهان دارویی فراهم می‌کند.
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-border" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} گلیفای — All rights reserved</p>

          <div className="flex gap-5">
            <Link className="hover:text-primary transition" href="/terms">
              قوانین
            </Link>
            <Link className="hover:text-primary transition" href="/privacy">
              حریم خصوصی
            </Link>
            <Link className="hover:text-primary transition" href="/faq">
              سوالات متداول
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
