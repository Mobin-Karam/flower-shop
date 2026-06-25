// lib/dto/checkout.ts

export type CheckoutItemDTO = {
  name: string;
  quantity: number;
  price: number;
  unitPrice: number;
  variantName?: string;
};