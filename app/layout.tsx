import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import WhatsappButton from "./components/whatsapp-button";
import MobileBottomNav from "./components/mobile-bottom-nav";
import { Toaster } from "sonner";
import CartCTA from "./components/cart/cart-cta";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { GlobalLoadingOverlay } from "./components/global-loading-overlay";
import AnnouncementBanner from "./components/notifBar/notif-bar";
import { FaWhatsapp } from "react-icons/fa";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://gulify.ir"),

  title: {
    default: "Gulify | سوغات کردستان و غرب ایران",
    template: "%s | Gulify",
  },

  description:
    "خرید سوغات اصیل کردستان و غرب ایران شامل گل محمدی، دمنوش‌های گیاهی، صنایع دستی و محصولات طبیعی هورامان. ارسال به سراسر ایران.",

  keywords: [
    "سوغات کردستان",
    "سوغات غرب ایران",
    "هورامان",
    "اورامان",
    "مریوان",
    "سنندج",
    "پاوه",
    "جوانرود",
    "کامیاران",
    "دمنوش گیاهی",
    "گل محمدی",
    "محصولات طبیعی کردستان",
    "صنایع دستی کردستان",
  ],

  authors: [{ name: "Gulify" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "Gulify | سوغات کردستان و هورامان",
    description:
      "فروش آنلاین سوغات اصیل کردستان شامل دمنوش‌ها، گل محمدی و محصولات طبیعی هورامان.",
    url: "https://gulify.ir",
    siteName: "Gulify",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "سوغات کردستان | Gulify",
    description: "خرید سوغات طبیعی و اصیل غرب ایران",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Gulify",
      url: "https://gulify.ir",
      logo: "https://gulify.ir/logo/logo.png",
      description: "فروشگاه سوغات کردستان و محصولات طبیعی غرب ایران",
    },

    {
      "@type": "WebSite",
      name: "Gulify",
      url: "https://gulify.ir",
      inLanguage: "fa-IR",
    },

    {
      "@type": "Store",
      name: "Gulify",
      description:
        "فروشگاه آنلاین سوغات کردستان شامل دمنوش، گل محمدی و محصولات هورامان",
      areaServed: [
        "Iran",
        "Kurdistan",
        "Kermanshah",
        "Hawraman",
        "Oraman",
        "Marivan",
        "Sanandaj",
        "Paveh",
        "Javanrud",
        "Kamyaran",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body>
        {/* ================= STRUCTURED DATA ================= */}
        <Script id="seo-structured-data" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Gulify",
                url: "https://flower-shop-ochre-psi.vercel.app/",
                logo: "https://flower-shop-ochre-psi.vercel.app/logo/logo.png",
              },

              {
                "@type": "WebSite",
                name: "Gulify",
                url: "https://flower-shop-ochre-psi.vercel.app/",
                inLanguage: "fa-IR",
              },

              {
                "@type": "Store",
                name: "Gulify",
                description: "فروشگاه گل محمدی خشک و دمنوش گیاهی در ایران",
                areaServed: [
                  "Iran",
                  "Kermanshah",
                  "Kurdistan",
                  "Paveh",
                  "Marivan",
                  "Sanandaj",
                  "Kamyaran",
                  "Javanrud",
                  "Ravansar",
                  "Nowsud",
                  "Nowdeshah",
                  "Sarpol Zahab",
                  "Hawraman",
                  "Oraman",
                ],
              },

              // 🛒 Product Schema
              {
                "@type": "Product",
                name: "گل محمدی خشک دمنوشی",
                image:
                  "https://flower-shop-ochre-psi.vercel.app/images/rose.jpg",
                description: "گل محمدی خشک طبیعی مناسب دمنوش آرامش‌بخش",
                brand: {
                  "@type": "Brand",
                  name: "Gulify",
                },
                offers: {
                  "@type": "Offer",
                  priceCurrency: "IRR",
                  price: "150000",
                  availability: "https://schema.org/InStock",
                },
              },
            ],
          })}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XBLCWBJ5HT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XBLCWBJ5HT');
          `}
        </Script>
        <Providers>
          <AnnouncementBanner background="linear-gradient(90deg, #34d399, #059669)">
            <div className="flex items-center gap-2 text-white font-medium">
              <FaWhatsapp className="text-green-300 text-lg" />

              <p className="">برای ثبت سفارش تماس بگیرید: ۰۹۹۶۲۲۵۴۰۳۴</p>
            </div>
          </AnnouncementBanner>
          <Navbar />
          <MobileBottomNav />
          <main>{children}</main>
          <Footer />
          {/* <WhatsappButton /> */}
          <Toaster richColors position="top-left" />
          <GlobalLoadingOverlay />
        </Providers>
      </body>
    </html>
  );
}
