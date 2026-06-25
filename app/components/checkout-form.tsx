"use client";

import { useState } from "react";
import { useCartStore } from "../store/cart-store";
import { checkoutSchema } from "../../lib/schema";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";

import {
  User,
  Phone,
  MapPin,
  Mail,
  FileText,
  Loader2,
  PackageCheck,
  ShoppingBag,
  AlertCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore((s) => s.getTotalPrice());

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getValue = (form: FormData, key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!items.length) {
      toast.error("سبد خرید خالی است");
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const normalizedItems = items.map((i) => ({
      name: i.name ?? i.product?.name ?? "محصول نامشخص",
      quantity: Number(i.quantity ?? 1),
      price: Number(i.unitPrice ?? i.product?.price ?? 0),
    }));

    const payload = {
      fullName: getValue(form, "name"),
      phone: getValue(form, "phone"),
      city: getValue(form, "city"),
      address: getValue(form, "address"),
      note: getValue(form, "message"),
      email: getValue(form, "email") || undefined,

      items: normalizedItems,
      total: Number(total ?? 0),

      productTitle: "سفارش جدید",
      brand: "فروشگاه چهل چای",
    };

    const parsed = checkoutSchema.safeParse(payload);

    if (!parsed.success) {
      toast.error("اطلاعات فرم کامل نیست یا اشتباه است");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        clearCart();
        toast.success("سفارش ثبت شد");
      } else {
        toast.error(result.error || "ارسال ناموفق بود");
      }
    } catch {
      toast.error("خطای سرور");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-xl mx-auto">
        <CardContent className="p-10 text-center space-y-4">
          <PackageCheck className="mx-auto text-primary" />
          <h2 className="text-xl font-semibold">سفارش ثبت شد</h2>
          <p className="text-sm text-muted-foreground">
            به زودی با شما تماس گرفته می‌شود
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>تکمیل سفارش</CardTitle>

        {/* ================= UX HELPERS ================= */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-[11px] text-center">
          <div className="p-2 rounded-lg border bg-muted/30">
            <ShieldCheck size={14} className="mx-auto mb-1" />
            پرداخت امن
          </div>

          <div className="p-2 rounded-lg border bg-muted/30">
            <Truck size={14} className="mx-auto mb-1" />
            ارسال سریع
          </div>

          <div className="p-2 rounded-lg border bg-muted/30">
            <Phone size={14} className="mx-auto mb-1" />
            تماس فوری
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= PERSONAL INFO ================= */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <User size={16} /> اطلاعات شخصی
            </h3>

            <Input name="name" placeholder="نام و نام خانوادگی *" />
            <Input name="phone" placeholder="شماره تماس *" />
            <Input name="email" placeholder="ایمیل (اختیاری)" />
          </div>

          <Separator />

          {/* ================= ADDRESS ================= */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <MapPin size={16} /> آدرس تحویل
            </h3>

            <Input name="city" placeholder="شهر *" />
            <Input name="address" placeholder="آدرس کامل *" />
          </div>

          <Separator />

          {/* ================= NOTE ================= */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <FileText size={16} /> توضیحات
            </h3>

            <Textarea name="message" placeholder="توضیحات سفارش (اختیاری)" />
          </div>

          <Separator />

          {/* ================= CART SUMMARY ================= */}
          <div className="rounded-xl border p-4 bg-muted/30 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <ShoppingBag size={16} />
                خلاصه سفارش
              </span>

              <span className="text-muted-foreground">{items.length} آیتم</span>
            </div>

            <div className="text-sm font-semibold">
              مجموع: {total?.toLocaleString()} تومان
            </div>

            <p className="text-[11px] text-muted-foreground">
              هزینه نهایی شامل ارسال در تماس تلفنی تایید می‌شود
            </p>
          </div>

          {/* ================= ERROR ================= */}
          {!items.length && (
            <div className="text-xs text-destructive flex items-center gap-2">
              <AlertCircle size={14} />
              سبد خرید خالی است
            </div>
          )}

          {/* ================= SUBMIT ================= */}
          <Button
            type="submit"
            disabled={loading || !items.length}
            className="w-full h-11 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                در حال پردازش...
              </>
            ) : (
              "ثبت سفارش"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
