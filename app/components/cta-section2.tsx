"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export default function CTASection2() {
  return (
    <section className="container-custom py-10 md:py-16">
      <div className="card overflow-hidden gradient-bg">
        <div
          className="
            p-8 md:p-14
            flex flex-col md:flex-row
            items-center justify-between
            gap-8
          "
        >
          {/* TEXT BLOCK */}
          <div className="text-center md:text-right space-y-2 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-black">
              تجربه خرید حرفه‌ای‌تر
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              سفارش سریع، مدیریت ساده، ارسال مستقیم — بدون پیچیدگی و اتلاف وقت
            </p>
          </div>

          {/* ACTION BLOCK */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <Link href={'/shop'}>
              <Button className="btn-primary px-8 py-6 text-base rounded-2xl">
                شروع خرید
              </Button>
            </Link>

            <span className="text-xs text-muted-foreground">
              مناسب برای خرید سریع و مطمئن
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
