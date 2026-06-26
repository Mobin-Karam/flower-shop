import { products } from "@/lib/products";
import ProductClient from "./product-client";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const decoded = decodeURIComponent(slug);

  const product = products.find((p) => p.slug === decoded);

  if (!product) {
    return {
      title: "محصول یافت نشد | Gulify",
      description: "این محصول در فروشگاه Gulify موجود نیست.",
    };
  }

  const title = `${product.name} | Gulify`;
  const description = product.seoDescription || product.description;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gulify.ir";

  const url = `${baseUrl}/shop/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },

    openGraph: {
      title,
      description,
      url,
      siteName: "Gulify",
      type: "website",
      images: [
        {
          url: `${baseUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}${product.image}`],
    },
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const decoded = decodeURIComponent(slug);

  const product = products.find((p) => p.slug === decoded);

  if (!product) {
    return <div className="section text-center">Product not found</div>;
  }

  return <ProductClient product={product} />;
}
