"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { products } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";

export default function ProductClient({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const totalPrice = product.price * qty;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `سلام من میخوام :
• محصول: ${product.name}
• تعداد: ${qty}
• مجموع: ${totalPrice}$
`,
  );

  return (
    <div className="section">
      <div className="container-custom grid md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <div className="relative h-100 md:h-125 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
              {product.category}
            </span>

            <span className="text-xs text-green-600">In Stock</span>
          </div>

          <h1 className="text-4xl font-bold mt-3">{product.name}</h1>

          {/* Fake rating (Amazon style) */}
          <div className="text-yellow-500 mt-2">
            ★★★★☆ <span className="text-gray-500">(124 reviews)</span>
          </div>

          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Price */}
          <p className="text-3xl text-pink-700 font-bold mt-6">
            {formatPrice(product.price)}
          </p>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span className="text-lg font-semibold">{qty}</span>

            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          {/* Total */}
          <p className="mt-3 text-gray-700">
            جمع کل: <b>{formatPrice(totalPrice)}</b>
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={handleAddToCart} className="btn-primary">
              اضافه کردن {qty} به سبد خرید
            </button>

            <a
              href={`https://wa.me/989123456789?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border rounded-full"
            >
              خرید از واتساپ
            </a>

            <button
              onClick={() => setLiked(!liked)}
              className="px-4 py-3 border rounded-full"
            >
              {liked ? "❤️ Saved" : "🤍 Wishlist"}
            </button>

            <button
              onClick={() =>
                navigator.share?.({
                  title: product.name,
                  text: product.description,
                  url: window.location.href,
                })
              }
              className="px-4 py-3 border rounded-full"
            >
              Share
            </button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                className="border rounded-2xl p-4 hover:shadow-lg transition"
              >
                <div className="relative h-40 rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="font-semibold mt-3">{item.name}</h3>

                <p className="text-pink-700 font-bold">
                  {formatPrice(item.price)}
                </p>

                <a
                  href={`/shop/${item.slug}`}
                  className="text-sm text-blue-600 mt-2 inline-block"
                >
                  View Product →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
