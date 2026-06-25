"use client";

import { useCartStore } from "../../store/cart-store";
import CartItem from "../../components/cart/cart-item";
import Link from "next/link";
import { formatPrice } from "../../../lib/format";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.getTotalPrice());
  const clear = useCartStore((s) => s.clearCart);
  const totalItems = useCartStore((s) => s.getTotalItems());

  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      <div className="container-custom py-6">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">سبد خرید</h1>

          <p className="text-sm text-muted-foreground mt-1">
            {totalItems} کالا
          </p>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">سبد خرید شما خالی است</p>

            <Button asChild className="mt-5">
              <Link href="/shop">رفتن به فروشگاه</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            {/* LEFT SIDE */}
            <div className="space-y-4">
              {/* HEADER BAR */}
              <Card className="p-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  محصولات انتخاب شده
                </span>

                <Button
                  variant="ghost"
                  className="text-red-500"
                  onClick={clear}
                >
                  حذف همه
                </Button>
              </Card>

              {/* ITEMS */}
              <div className="space-y-3">
                {items.map((item) => (
                  <CartItem key={item.key} item={item} />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE (SUMMARY) */}
            <div className="lg:sticky lg:top-6 h-fit space-y-4">
              <Card className="p-5 space-y-4">
                <h2 className="font-semibold text-sm">خلاصه سفارش</h2>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">قیمت کالاها</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">تخفیف</span>
                  <span className="text-green-600">محاسبه در پرداخت</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>مبلغ قابل پرداخت</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">ادامه فرایند خرید</Link>
                </Button>
              </Card>

              {/* SUPPORT */}
              <Card className="p-4 text-xs text-muted-foreground space-y-1">
                <p>ارسال سریع</p>
                <p>پرداخت امن</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
