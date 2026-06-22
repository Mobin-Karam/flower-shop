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
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      fullName: getValue(form, "name"),
      phone: getValue(form, "phone"),
      city: getValue(form, "city"), // NOTE: you DON'T have city input in UI right now
      address: getValue(form, "address"),
      note: getValue(form, "message"),
      email: getValue(form, "email"),
    };

    const parsed = checkoutSchema.safeParse(payload);

    if (!parsed.success) {
      console.log("Validation error:", parsed.error.format());

      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          items,
          total,
          productTitle: "Flower Order",
          brand: "Gol Mohammadi Shop",
        }),
      });

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        clearCart();
        toast.success("Order placed successfully 🌸");
      } else {
        toast.error(result.error || "Failed to send order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
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
        <p className="mt-4 text-gray-600">We will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="name" placeholder="نام و نام خانوادگی" className="input" />
      <input name="phone" placeholder="شماره موبایل" className="input" />

      {/* Optional: REMOVE if schema requires it */}
      {/* <input name="city" placeholder="شهر" className="input" /> */}

      <input name="email" placeholder="ایمیل (اختیاری)" className="input" />
      <input name="address" placeholder="آدرس" className="input" />
      <textarea name="message" placeholder="توضیحات" className="input" />

      <button disabled={loading} className="btn-primary">
        {loading ? "در حال ارسال ..." : "ارسال سفارش"}
      </button>
    </form>
  );
}