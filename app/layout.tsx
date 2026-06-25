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

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://flower-shop-ochre-psi.vercel.app/"),

  title: {
    default: "Gulify | خرید گل محمدی خشک، دمنوش گل رز، محصولات طبیعی ایران",
    template: "%s | Gulify",
  },

  description:
    "خرید گل محمدی خشک و دمنوش گیاهی طبیعی در ایران. ارسال سریع به سراسر کشور از جمله کرمانشاه، کردستان، پاوه، نودشه، نوسود، اورامان، مریوان، سنندج، کامیاران، جوانرود، روانسر و مناطق کردنشین غرب ایران.",

  keywords: [
    "گل محمدی خشک",
    "دمنوش گل رز",
    "خرید گل خشک",
    "دمنوش گیاهی ایران",
    "گل برای چای",
    "Gulify",

    // 🟢 Kermanshah SEO
    "کرمانشاه",
    "کرماشان",
    "جوانرود",
    "پاوه",
    "نودشه",
    "نوسود",
    "روانسر",
    "سرپل ذهاب",
    "اسلام آباد غرب",
    "کنگاور",
    "صحنه",
    "هرسین",
    "بیستون",

    // 🟢 Kurdistan SEO
    "کردستان",
    "سنندج",
    "مریوان",
    "کامیاران",
    "بانه",
    "سقز",
    "دیواندره",
    "قروه",
    "بیجار",
    "اورامان",
    "هورامان",
    "اورامانات",

    // 🟢 Hawraman region SEO
    "هورامان تخت",
    "اورامان تخت",
    "حجیج",
    "پالنگان",
    "شامشیر",
    "شاخو",

    // 🟢 Intent keywords
    "خرید اینترنتی گل خشک",
    "دمنوش آرامش بخش",
    "گل رز طبیعی",
  ],

  authors: [{ name: "Gulify" }],

  openGraph: {
    title: "Gulify | گل محمدی خشک و دمنوش طبیعی ایران (کرمانشاه و کردستان)",
    description:
      "ارسال گل محمدی خشک به تمام شهرهای ایران از جمله کرمانشاه، کردستان، مریوان، پاوه، سنندج و مناطق اورامان.",
    url: "https://flower-shop-ochre-psi.vercel.app/",
    siteName: "Gulify",
    locale: "fa_IR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gulify | دمنوش گل طبیعی ایران",
    description: "خرید گل محمدی خشک و دمنوش گیاهی با ارسال به سراسر ایران",
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    enamad: "55333083",
  },
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
          {" "}
          <Navbar />
          <MobileBottomNav />
          <main>{children}</main>
          <Footer />
          <WhatsappButton />
          <Toaster richColors position="top-left" />
          <GlobalLoadingOverlay />
        </Providers>
      </body>
    </html>
  );
}
