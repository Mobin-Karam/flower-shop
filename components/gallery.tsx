import Image from "next/image";
import SectionTitle from "./section-title";

const images = [
  "/flowers/rose-1.jpg",
  "/flowers/rose-2.jpg",
];

export default function Gallery() {
  return (
    <section className="section bg-gradient-to-b from-rose-50 to-white font-[Vazirmatn]">

      <div className="container-custom">

        <SectionTitle
          title="گالری گل‌ها"
          subtitle="گل‌هایی تازه، چیده شده با عشق و الهام ایرانی"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-60 rounded-[28px] overflow-hidden shadow-md group"
            >
              <Image
                src={image}
                alt="flower"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition" />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}