const collections = [
  {
    title: "دمنوش آرامش",
    image: "/collections/c1.jpg",
  },
  {
    title: "هدیه‌های طبیعی",
    image: "/collections/c2.jpg",
  },
  {
    title: "پرفروش‌ترین‌ها",
    image: "/collections/c3.jpg",
  },
];

export default function CollectionsRail() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">مجموعه‌های منتخب</h2>

      <div className="flex gap-4 overflow-x-auto">
        {collections.map((c, i) => (
          <div
            key={i}
            className="min-w-[260px] card overflow-hidden cursor-pointer"
          >
            <img src={c.image} className="h-[160px] w-full object-cover" />
            <div className="p-3 font-medium">{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}