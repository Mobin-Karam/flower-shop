"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../../store/cart-store";

import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";

import { ShoppingBag } from "lucide-react";

import { products } from "@/lib/products";
import { Product } from "@/lib/types";

/* -------------------- RECOMMENDER -------------------- */
function getRecommendations(cartItems: { product: Product }[], limit = 4) {
  const cartProducts = cartItems.map((i) => i.product);
  const cartIds = new Set(cartProducts.map((p) => p.id));

  return products
    .filter((p) => !cartIds.has(p.id))
    .map((p) => {
      let score = 0;

      for (const c of cartProducts) {
        if (p.category === c.category) score += 5;
        if (p.subcategory === c.subcategory) score += 3;

        const matchTags =
          p.tags?.filter((t) => c.tags?.includes(t)).length || 0;

        score += matchTags * 2;
      }

      if (p.isFeatured) score += 1;
      if (p.isBestseller) score += 1;

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/* -------------------- ANIMATION VARIANTS -------------------- */
const buttonVariants = {
  circle: {
    width: 56,
    borderRadius: 999,
  },
  expanded: {
    width: 360,
    borderRadius: 999,
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut" as any,
    },
  },
};

export default function CartCTADesktop() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((t, i) => t + i.quantity, 0);

  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"circle" | "expanded">("circle");

  const prevCount = useRef(0);

  const recommended = useMemo(() => {
    return getRecommendations(items.map((i) => ({ product: i.product })));
  }, [items]);

  /* auto open on cart change */
  useEffect(() => {
    if (totalItems !== prevCount.current) {
      setOpen(true);
      setStage("expanded");

      const t = setTimeout(() => {
        setOpen(false);
        setStage("circle");
      }, 5000);

      return () => clearTimeout(t);
    }

    prevCount.current = totalItems;
  }, [totalItems]);

  if (totalItems === 0) return null;

  const RecommendationPanel = (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">پیشنهاد برای شما</h3>
            <span className="text-xs text-muted-foreground">
              بر اساس سبد خرید
            </span>
          </div>

          <div className="space-y-2">
            {recommended.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border rounded-xl p-2 hover:bg-muted cursor-pointer"
                onClick={() => router.push(`/product/${item.slug}`)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />

                <div className="flex-1 text-sm">
                  <div>{item.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.price.toLocaleString()} تومان
                  </div>
                </div>

                <Button size="sm">مشاهده</Button>
              </div>
            ))}
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => router.push("/cart")}>سبد</Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/checkout")}
            >
              پرداخت
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-end px-4">
      <div className="relative">
        <motion.button
          layout
          variants={buttonVariants}
          animate={stage}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={() => {
            setOpen((v) => !v);
            setStage((v) => (v === "circle" ? "expanded" : "circle"));
          }}
          className="h-14 bg-primary text-primary-foreground shadow-lg flex items-center justify-between px-4 overflow-hidden"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <span>{totalItems}</span>
          </div>

          {stage === "expanded" && <span className="text-sm">پیشنهادها</span>}
        </motion.button>

        <div className="absolute bottom-full mb-3 w-90">
          {RecommendationPanel}
        </div>
      </div>
    </div>
  );
}
