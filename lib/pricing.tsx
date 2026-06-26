// lib/pricing.ts

export type PricingInput = {
  price: number;
  originalPrice?: number;
  discountPercent?: number;
};

export function getPricing(input: PricingInput) {
  const original = input.originalPrice;
  const discount = input.discountPercent ?? 0;

  const hasValidOriginal =
    typeof original === "number" && original > input.price;

  const hasDiscount = discount > 0 && hasValidOriginal;

  const finalPrice = hasDiscount
    ? Math.round(original! * (1 - discount / 100))
    : input.price;

  return {
    finalPrice,

    // always keep original if it exists and is valid (UI needs it)
    originalPrice: hasValidOriginal ? original : undefined,

    // NEVER hide raw value (important for badges/debug/UI consistency)
    discountPercent: discount,

    hasDiscount,
  };
}
