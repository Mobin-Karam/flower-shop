import Link from "next/link";

const categories = [
  { name: "دمنوش‌ها", href: "/c/herbal-tea" },
  { name: "گل محمدی", href: "/c/damask-rose" },
  { name: "گیاهان دارویی", href: "/c/herbs" },
  { name: "پک هدیه", href: "/c/gifts" },
  { name: "جدیدها", href: "/new" },
];

export default function CategoryStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="min-w-fit px-4 py-2 rounded-full bg-white border text-sm hover:bg-muted transition"
        >
          {c.name}
        </Link>
      ))}
    </div>
  );
}