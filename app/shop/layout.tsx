import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop Flowers - Gol Mohammadi",
  description:
    "Browse fresh roses, bouquets, and floral arrangements at Gol Mohammadi.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Page content */}
      <main className="container-custom py-8">{children}</main>
    </div>
  );
}
