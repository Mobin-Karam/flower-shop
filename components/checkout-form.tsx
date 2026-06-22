"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { checkoutSchema } from "@/lib/schema";
import { toast } from "sonner";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = useCartStore((s) => s.getTotalPrice());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);

    const data = {
      fullName: form.get("name"),
      phone: form.get("phone"),
      city: form.get("city"),
      address: form.get("address"),
      note: form.get("message"),
    };

    const parsed = checkoutSchema.safeParse(data);

    if (!parsed.success) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    const payload = {
      ...parsed.data,
      items,
      total,
    };

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.fullName,
        phone: payload.phone,
        email: "", // optional if you still need it
        message: `
Order:
${payload.items
  .map((i: any) => `${i.name} x${i.quantity} = $${i.price * i.quantity}`)
  .join("\n")}

TOTAL: $${payload.total}

Address: ${payload.address}
City: ${payload.city}
Note: ${payload.note ?? ""}
        `,
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
      toast.error("Failed to send order");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="text-center p-10">
        <h2 className="text-3xl font-bold text-green-600">
          Order Sent Successfully 🌸
        </h2>
        <p className="mt-4 text-gray-600">
          We will contact you soon on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="name" placeholder="Full Name" className="input" />
      <input name="phone" placeholder="Phone" className="input" />
      <input name="email" placeholder="Email (optional)" className="input" />
      <input name="address" placeholder="Address" className="input" />

      <textarea name="message" placeholder="Notes" className="input" />

      <button disabled={loading} className="btn-primary">
        {loading ? "Sending..." : "Place Order"}
      </button>
    </form>
  );
}
