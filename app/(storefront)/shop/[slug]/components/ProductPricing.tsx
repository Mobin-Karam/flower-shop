import { Product, ProductVariant } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { getPricing } from "@/lib/pricing";

export default function ProductPricing({
  product,
  variant,
}: {
  product: Product;
  variant?: ProductVariant;
}) {
  const price = variant?.price ?? product.price;

  const { finalPrice } = getPricing({
    price,
    originalPrice: variant?.originalPrice ?? product.originalPrice,
    discountPercent: product.discountPercent,
  });

  return (
    <div className="text-2xl font-bold text-primary">
      {formatPrice(finalPrice)}
    </div>
  );
}