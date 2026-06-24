"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartItem, Product } from "../lib/types";

type CartStore = {
  items: CartItem[];

  addItem: (product: Product) => void;

  removeItem: (id: string) => void;

  increase: (id: string) => void;

  decrease: (id: string) => void;

  clearCart: () => void;

  getTotalItems: () => number;

  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;

        const existing = items.find((i) => i.id === product.id);

        if (existing) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item,
            ),
          });

          return;
        }

        set({
          items: [
            ...items,
            {
              ...product,
              quantity: 1,
            },
          ],
        });
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((item) => item.id !== id),
        }),

      increase: (id) =>
        set({
          items: get().items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }),

      decrease: (id) =>
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }),

      clearCart: () =>
        set({
          items: [],
        }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ),
    }),
    {
      name: "gol-mohammadi-cart",
    },
  ),
);
