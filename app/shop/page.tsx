"use client";

import { products } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { useState } from "react";

export default function ShopPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="section font-[Vazirmatn] bg-linear-to-b from-[#f7f5f0] to-[#efe7dd]">

      <div className="container-custom">

        {/* 🌿 Header (Shop identity like real boutique) */}
        <div className="text-center max-w-2xl mx-auto">

          <p className="text-sm text-[#2f6f5e] tracking-widest">
            فروشگاه دمنوش و آرامش
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3 text-[#1f2a44]">
            فروشگاه گل محمدی
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            انتخابی از دمنوش‌های طبیعی، گل‌های آرامش‌بخش و ترکیب‌های الهام‌گرفته از طبیعت ایران
          </p>

        </div>

        {/* 🌿 Search Bar (shop-like, centered card feel) */}
        <div className="mt-10 flex justify-center">

          <div className="w-full md:w-1/2 bg-white rounded-full shadow-sm border border-black/5 px-4 flex items-center">

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجوی دمنوش یا گل..."
              className="w-full p-3 outline-none bg-transparent"
            />

          </div>

        </div>

        {/* 🌿 Quick tags (real shop UX) */}
        <div className="mt-6 flex justify-center flex-wrap gap-3">

          {["آرامش", "خواب", "انرژی", "گل رز", "دمنوش گیاهی"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearch(tag)}
              className="px-4 py-2 text-sm rounded-full bg-white border border-black/5 text-[#2f6f5e] hover:bg-[#2f6f5e] hover:text-white transition"
            >
              {tag}
            </button>
          ))}

        </div>

        {/* 🌿 Products Grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

        {/* 🌿 Empty State (real shop feeling) */}
        {filtered.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">
              محصولی برای جستجوی شما پیدا نشد 🍃
            </p>

            <button
              onClick={() => setSearch("")}
              className="mt-4 px-6 py-3 rounded-full bg-[#2f6f5e] text-white hover:opacity-90 transition"
            >
              مشاهده همه محصولات
            </button>
          </div>
        )}

      </div>
    </div>
  );
}