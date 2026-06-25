import { products } from "@/lib/products";
import ProductClient from "./product-client";


export function decodePersianSlug(slug: string): string {
  const decoded = decodeURIComponent(slug);

  return decoded
    .replace(/_/g, " ") // underscores → space
    .replace(/\s+/g, " ") // collapse spaces
    .trim();
}


export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // or use(params) if you prefer
  const decoded = decodeURIComponent(slug);

  const product = products.find((p) => p.slug === decoded);

  if (!product) {
    return <div className="section text-center">Product not found</div>;
  }

  return <ProductClient product={product} />;
}
