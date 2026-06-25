const banners = [
  { src: "/banners/b1.jpg", span: "col-span-2" },
  { src: "/banners/b2.jpg", span: "col-span-1" },
  { src: "/banners/b3.jpg", span: "col-span-1" },
];

export default function BannerGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {banners.map((b, i) => (
        <div key={i} className={`card overflow-hidden ${b.span}`}>
          <img src={b.src} className="w-full h-[180px] object-cover" />
        </div>
      ))}
    </div>
  );
}