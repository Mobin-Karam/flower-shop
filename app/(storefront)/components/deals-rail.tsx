import { uiProducts } from "@/app/data/products.ui";
import ProductCardHome from "@/app/components/product-card-home";

export default function DealsRail({ title }: { title: string }) {
  const products = uiProducts
    .filter((p) => p.discountPercent > 0)
    .slice(0, 8);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex gap-4 overflow-x-auto">
        {products.map((product) => (
          <div key={product.id} className="min-w-[220px]">
            <ProductCardHome product={product as any} />
          </div>
        ))}
      </div>
    </div>
  );
}