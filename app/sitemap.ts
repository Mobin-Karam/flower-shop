import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gulify.ir";

  const now = new Date();

  return [
    // Home
    {
      url: `${baseUrl}/`,
      lastModified: now,
      priority: 1,
    },

    // Shop listing
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      priority: 0.9,
    },

    // Product pages
    ...products
      .filter((p) => p.isActive)
      .map((product) => ({
        url: `${baseUrl}/shop/${product.slug}`,
        lastModified: new Date(
          product.updatedAt ?? product.createdAt ?? Date.now(),
        ),
        priority: product.isFeatured ? 0.9 : 0.8,
      })),
  ];
}
