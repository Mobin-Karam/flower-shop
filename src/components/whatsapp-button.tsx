"use client";

import { MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function WhatsappButton() {
  const items = useCartStore((s) => s.items);

  const message =
    items.length > 0
      ? encodeURIComponent(
          `I want to order:\n` +
            items.map((i) => `${i.name} x${i.quantity}`).join("\n"),
        )
      : "Hello I want flowers";

  return (
    <a
      href={`https://wa.me/989935593099?text=${message}`}
      target="_blank"
      className="
      fixed bottom-5 right-5
      h-14 w-14
      bg-green-500
      rounded-full
      flex items-center justify-center
      text-white shadow-xl
      "
    >
      <MessageCircle />
    </a>
  );
}
