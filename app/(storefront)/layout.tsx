import CartCTA from "@/app/components/cart/cart-cta";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CartCTA />
    </>
  );
}