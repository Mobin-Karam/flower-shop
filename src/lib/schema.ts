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
      }),
    )
    .optional(),

  total: z.number(),

  productTitle: z.string().optional(),
  brand: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "نام الزامی است").max(100),

  phone: z.string().min(8, "شماره تماس نامعتبر است").max(20),

  email: z.string().email("ایمیل نامعتبر است").optional().or(z.literal("")),

  message: z.string().min(5, "پیام خیلی کوتاه است").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
