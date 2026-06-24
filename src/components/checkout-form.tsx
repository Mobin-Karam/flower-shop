"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { checkoutSchema } from "@/lib/schema";
import { toast } from "sonner";

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

  const payload = {
    fullName: getValue(form, "name"),
    phone: getValue(form, "phone"),
    city: getValue(form, "city"),
    address: getValue(form, "address"),
    note: getValue(form, "message"),
    email: getValue(form, "email") || undefined,
    items,
    total: typeof total === "number" ? total : 0,
    productTitle: "سفارش گل",
    brand: "فروشگاه گل محمدی",
  };

  const parsed = checkoutSchema.safeParse(payload);

  if (!parsed.success) {
    console.log(parsed.error.format());
    toast.error("لطفاً تمام فیلدهای الزامی را به‌درستی تکمیل کنید");
    setLoading(false);
    return;
  }

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
    });

    const result = await res.json();

    if (result.success) {
      setSuccess(true);
      clearCart();
      toast.success("سفارش با موفقیت ثبت شد 🌸");
    } else {
      toast.error(result.error || "ارسال سفارش ناموفق بود");
    }
  } catch (err) {
    console.error(err);
    toast.error("خطای شبکه. لطفاً دوباره تلاش کنید");
  } finally {
    setLoading(false);
  }
};

  if (success) {
    return (
      <div className="text-center p-10">
        <h2 className="text-3xl font-bold text-green-600">
          Order Sent Successfully 🌸
        </h2>
        <p className="mt-4 text-gray-600">
          We will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="name" placeholder="نام و نام خانوادگی" className="input" />
      <input name="phone" placeholder="شماره موبایل" className="input" />

      {/* REQUIRED because schema requires it */}
      <input name="city" placeholder="شهر" className="input" />

      <input name="email" placeholder="ایمیل (اختیاری)" className="input" />
      <input name="address" placeholder="آدرس" className="input" />
      <textarea name="message" placeholder="توضیحات" className="input" />

      <button disabled={loading} className="btn-primary">
        {loading ? "در حال ارسال ..." : "ارسال سفارش"}
      </button>
    </form>
  );
}