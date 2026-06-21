import { z } from "zod"

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(3),

  phone: z
    .string()
    .min(8),

  city: z
    .string()
    .min(2),

  address: z
    .string()
    .min(10),

  note: z
    .string()
    .optional(),
})

export type CheckoutFormData =
  z.infer<typeof checkoutSchema>