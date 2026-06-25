"use client";

import Image from "next/image";
import { useCartStore } from "../store/cart-store";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  const items = useCartStore((s) => s.items);

  const message =
    items.length > 0
      ? encodeURIComponent(
          `I want to order:\n` +
            items.map((i) => `${i.name} x${i.quantity}`).join("\n"),
        )
      : encodeURIComponent("Hello I want flowers");

  return (
    <a
      href={`https://wa.me/989935593099?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-20 right-5
        h-14 w-14
        rounded-full
        flex items-center justify-center
        shadow-xl
        hover:scale-105 active:scale-95
        transition-transform
        bg-green-600
      "
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-4xl" />
    </a>
  );
}
