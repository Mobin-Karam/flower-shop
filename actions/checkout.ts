"use server"

import { checkoutSchema } from "@/lib/schema"
import { useCartStore } from "@/store/cart-store"

type CartItem = {
  name: string
  price: number
  quantity: number
}

export async function checkoutAction(
  formData: FormData
) {
  const raw = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    message: formData.get("message"),
    address: formData.get("address"),
  }

  const parsed =
    checkoutSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid form",
    }
  }

  // NOTE: we cannot use zustand on server,
  // so we must send cart from client
  return {
    success: true,
  }
}