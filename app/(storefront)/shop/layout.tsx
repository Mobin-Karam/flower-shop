import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "فروشگاه | Gulify",
  description:
    "مشاهده و خرید محصولات Gulify شامل دمنوش‌های گیاهی، گل محمدی، کفش سنتی و صنایع دستی کردستان.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
