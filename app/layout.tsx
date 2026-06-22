import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import { Toaster } from "sonner";
import CartCTA from "@/components/cart-cta";

export const metadata: Metadata = {
  metadataBase: new URL("https://flower-shop-ochre-psi.vercel.app/"),

  title: {
    default: "Gulify | خرید گل خشک دمنوشی و گل محمدی",
    template: "%s | Gulify",
  },
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },

  description:
    "خرید گل رز صورتی و گل محمدی خشک برای دمنوش طبیعی. ارسال سریع، کیفیت بالا، مناسب دمنوش آرامش‌بخش و گیاهی.",

  keywords: [
    "گل محمدی خشک",
    "گل رز صورتی دمنوشی",
    "خرید گل خشک دمنوش",
    "دمنوش گیاهی طبیعی",
    "Gulify",
    "گل برای چای",
    "خرید اینترنتی گل رز",
  ],

  authors: [{ name: "Gulify" }],

  openGraph: {
    title: "Gulify |  و گل محمدی دمنوشی",
    description:
      "خرید گل خشک طبیعی برای دمنوش آرامش‌بخش. کیفیت بالا و ارسال سریع.",
    url: "https://flower-shop-ochre-psi.vercel.app/",
    siteName: "Gulify",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gulify | دمنوش گل طبیعی",
    description: "خرید گل  محمدی خشک برای دمنوش",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Navbar />

        <CartCTA />
        <MobileBottomNav />

        <main>{children}</main>

        <Footer />
        <WhatsappButton />

        <Toaster richColors position="top-left" />
      </body>
    </html>
  );
}
