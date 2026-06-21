export const metadata = {
  title: "Contact Us",
  description: "Send messages or orders",
};

export default function ContactLayout({
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
