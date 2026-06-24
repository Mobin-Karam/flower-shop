"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { formatPrice } from "../../../lib/format";
import { products } from "../../../lib/products";
import { useCartStore } from "../../../store/cart-store";

export default function ProductClient({ product }: { product: any }) {
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id,
  );

  const totalPrice = product.price * qty;

  const discountPercent = useMemo(() => {
    if (!product.originalPrice) return 0;
    return Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    );
  }, [product]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
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

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestseller && (
              <span className="text-xs bg-orange-500 text-white px-3 py-1 rounded-full">
                پرفروش
              </span>
            )}

            {product.isNew && (
              <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full">
                جدید
              </span>
            )}

            {discountPercent > 0 && (
              <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full">
                %{discountPercent} تخفیف
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow"
          >
            {liked ? "❤️" : "🤍"}
          </button>
        </div>

        {/* DETAILS */}
        <div>
          {/* Category + Stock */}
          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full">
              {product.category}
            </span>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock ? "موجود" : "ناموجود"}
            </span>
          </div>

          <h1 className="text-4xl font-bold mt-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.floor(product.rating || 4))}
              {"☆".repeat(5 - Math.floor(product.rating || 4))}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.reviewCount || 0} نظر)
            </span>
          </div>

          <p className="text-gray-600 mt-4">{product.description}</p>

          {/* Price */}
          <div className="mt-6">
            <p className="text-3xl text-pink-700 font-bold">
              {formatPrice(product.price)}
            </p>

            {product.originalPrice && (
              <p className="text-gray-400 line-through text-sm mt-1">
                {formatPrice(product.originalPrice)}
              </p>
            )}

            <p className="text-green-600 text-sm mt-1">ارسال رایگان ✨</p>
          </div>

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
              افزودن {qty} عدد به سبد خرید
            </button>

            <a
              href={`https://wa.me/989123456789?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border rounded-full"
            >
              خرید از واتساپ
            </a>

            <button className="px-4 py-3 border rounded-full">
              {liked ? "❤️ ذخیره شد" : "🤍 علاقه‌مندی"}
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
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">محصولات مشابه</h2>

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
                  مشاهده محصول →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
