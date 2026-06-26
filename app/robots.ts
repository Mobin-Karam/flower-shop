import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://gulify.ir/";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/products/",
          "/product/",
          "/category/",
          "/search",
          "/blog/",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/cart/",
          "/checkout/",
          "/dashboard/",
          "/auth/",
          "/private/",
          "/_next/",
          "/server/",
        ],
        crawlDelay: 1,
      },

      // Special rule for Google image indexing (important for product SEO)
      {
        userAgent: "Googlebot-Image",
        allow: ["/"],
      },

      // Block bad bots (optional but good practice)
      {
        userAgent: ["AhrefsBot", "SemrushBot", "MJ12bot"],
        disallow: ["/"],
      },
    ],

    sitemap: `${baseUrl}sitemap.xml`,

    host: baseUrl,
  };
}