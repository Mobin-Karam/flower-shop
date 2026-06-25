"use client";

import CheckoutForm from "../../components/checkout-form";
import { formatPrice } from "../../../lib/format";
import { useCartStore } from "../../store/cart-store";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Badge } from "@/app/components/ui/badge";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.getTotalPrice());
  const totalItems = useCartStore((s) => s.getTotalItems());

  if (!items.length) {
    return (
      <div className="section text-center" dir="rtl">
        <h1 className="text-2xl md:text-3xl font-bold">
          سبد خرید شما خالی است
        </h1>

        <Link href="/shop" className="btn-primary mt-6 inline-block">
          رفتن به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" dir="rtl">
      <div className="container-custom py-6 grid lg:grid-cols-2 gap-6">
        {/* ================= LEFT: FORM ================= */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">تکمیل سفارش</CardTitle>
            <p className="text-sm text-muted-foreground">
              اطلاعات تماس و آدرس را وارد کنید
            </p>
          </CardHeader>

          <CardContent>
            <CheckoutForm />
          </CardContent>
        </Card>

        {/* ================= RIGHT: SUMMARY ================= */}
        <Card className="rounded-2xl h-fit lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle className="text-lg">
              خلاصه سفارش
              <Badge variant="secondary" className="mr-2">
                {totalItems} کالا
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ITEMS */}
            <div className="space-y-3 max-h-[320px] overflow-auto pr-1">
              {items.map((item) => (
                <div
                  key={item.key}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{item.name}</p>

                    <p className="text-muted-foreground text-xs">
                      {item.variantName
                        ? `${item.variantName} × ${item.quantity}`
                        : `× ${item.quantity}`}
                    </p>
                  </div>

                  <div className="shrink-0 font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* TOTAL */}
            <div className="flex justify-between font-bold">
              <span>جمع کل</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <p className="text-xs text-muted-foreground">
              هزینه ارسال و تخفیف در مرحله بعد محاسبه می‌شود
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
