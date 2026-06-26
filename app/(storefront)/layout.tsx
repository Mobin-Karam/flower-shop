import CartCTA from "@/app/components/cart/cart-cta";
import CartCTAResponsive from "../components/cart/cart-cta-responsive";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CartCTAResponsive />
    </>
  );
}
