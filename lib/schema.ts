import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().min(8),
  city: z.string().min(2),
  address: z.string().min(10),

  email: z.string().email().optional(), // ✅ add this

  note: z.string().optional(),

  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.number(),
        price: z.number(),
      })
    )
    .optional(),

  total: z.number(),

  productTitle: z.string().optional(),
  brand: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;