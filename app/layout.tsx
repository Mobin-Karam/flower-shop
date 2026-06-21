import type { Metadata } from "next"
import "./globals.css"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import MobileBottomNav from "@/components/mobile-bottom-nav";

import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Gol Mohammadi Flower Shop",
  description:
    "Fresh flowers and beautiful bouquets for every occasion.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html  
       lang="fa"
      dir="rtl"
      >
      <body>
        <Navbar />
        <MobileBottomNav />

        <main>{children}</main>

        <Footer />

        <WhatsappButton />

        <Toaster richColors  />
      </body>
    </html>
  )
}