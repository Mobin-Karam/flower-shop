import SectionTitle from "./section-title";
import ProductCard from "./product-card";
import { getFeaturedProducts } from "@/lib/product-helper";

export default function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="section bg-rose-50 font-[Vazirmatn]">

      <div className="container-custom">

        <SectionTitle
          title="گل‌های منتخب"
          subtitle="زیباترین گل‌آرایی‌های ما برای لحظات خاص شما"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}