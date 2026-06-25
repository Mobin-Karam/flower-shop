"use client"

import { useCartStore }
  from "../app/store/cart-store"

export function useCart() {
  return useCartStore()
}