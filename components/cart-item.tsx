"use client"

import Image from "next/image"
import { CartItem as Item }
from "../lib/types"

import {
  useCartStore,
} from "../store/cart-store"

import { formatPrice }
from "../lib/format"

import { Minus, Plus, Trash }
from "lucide-react"

type Props = {
  item: Item
}

export default function CartItem({
  item,
}: Props) {
  const increase =
    useCartStore(
      s => s.increase
    )

  const decrease =
    useCartStore(
      s => s.decrease
    )

  const remove =
    useCartStore(
      s => s.removeItem
    )

  return (
    <div
      className="
      flex
      gap-4
      p-4
      border
      rounded-2xl
      bg-white
      "
    >
      <div
        className="
        relative
        w-24
        h-24
        "
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500">
          {formatPrice(item.price)}
        </p>

        <div
          className="
          flex
          items-center
          gap-3
          mt-3
          "
        >
          <button
            onClick={() =>
              decrease(item.id)
            }
            className="p-2 border rounded-lg"
          >
            <Minus size={16} />
          </button>

          <span>
            {item.quantity}
          </span>

          <button
            onClick={() =>
              increase(item.id)
            }
            className="p-2 border rounded-lg"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={() =>
              remove(item.id)
            }
            className="
            ml-auto
            text-red-500
            "
          >
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}