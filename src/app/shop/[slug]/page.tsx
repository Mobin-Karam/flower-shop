import { products } from "@/lib/products";
import ProductClient from "./product-client";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // or use(params) if you prefer

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="section text-center">Product not found</div>;
  }

  return <ProductClient product={product} />;
}
