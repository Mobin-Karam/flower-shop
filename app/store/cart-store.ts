import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/lib/types";

type AddItemInput = {
  product: Product | null | undefined;
  variantId?: string;
  quantity?: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (input: AddItemInput) => void;

  removeItem: (key: string) => void;
  increase: (key: string) => void;
  decrease: (key: string) => void;

  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;

  getKey: (productId: string, variantId?: string) => string;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      /* KEY */
      getKey: (productId, variantId) =>
        variantId ? `${productId}:${variantId}` : productId,

      /* ADD (HARDENED) */
      addItem: ({ product, variantId, quantity = 1 }) => {
        if (!product) return;

        const key = get().getKey(product.id, variantId);
        const items = get().items;

        const variant = product.variants?.find((v) => v.id === variantId);

        const unitPrice = variant?.price ?? product.price;
        const originalPrice = variant?.originalPrice ?? product.originalPrice;

        const existing = items.find((i) => i.key === key);

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          });
          return;
        }

        const newItem: CartItem = {
          key,
          productId: product.id,
          product,

          variantId,
          quantity,
          addedAt: Date.now(),

          unitPrice,
          originalPrice,
          name: product.name,
          image: variant?.image ?? product.image,
          variantName: variant?.name,
        };

        set({ items: [...items, newItem] });
      },

      removeItem: (key) =>
        set({ items: get().items.filter((i) => i.key !== key) }),

      increase: (key) =>
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }),

      decrease: (key) =>
        set({
          items: get()
            .items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        }),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((t, i) => t + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((t, i) => t + i.unitPrice * i.quantity, 0),
    }),
    {
      name: "gulify-cart",
    },
  ),
);
