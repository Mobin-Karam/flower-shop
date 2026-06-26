// CarouselControls Component - Navigation arrows and controls
"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  className?: string;
  showOnMobile?: boolean;
}

const buttonVariants = {
  initial: { opacity: 0.6, scale: 1 },
  hover: { opacity: 1, scale: 1.1 },
  tap: { scale: 0.95 },
  disabled: { opacity: 0.3, cursor: "not-allowed" },
};

export function CarouselControls({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  className = "",
  showOnMobile = false,
}: CarouselControlsProps) {
  const mobileClass = showOnMobile ? "" : "hidden md:flex";

  return (
    <div
      className={`flex gap-2 items-center justify-center ${mobileClass} ${className}`}
      role="group"
      aria-label="Carousel controls"
    >
      {/* Previous Button */}
      <motion.button
        onClick={onPrev}
        disabled={!canScrollPrev}
        variants={buttonVariants}
        initial="initial"
        whileHover={canScrollPrev ? "hover" : "disabled"}
        whileTap={canScrollPrev ? "tap" : undefined}
        className={`p-2 md:p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 ${
          canScrollPrev
            ? "bg-white hover:bg-black hover:text-white cursor-pointer"
            : "bg-gray-100 cursor-not-allowed opacity-50"
        }`}
        aria-label="Previous slide"
        aria-disabled={!canScrollPrev}
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </motion.button>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canScrollNext}
        variants={buttonVariants}
        initial="initial"
        whileHover={canScrollNext ? "hover" : "disabled"}
        whileTap={canScrollNext ? "tap" : undefined}
        className={`p-2 md:p-3 rounded-full border-2 border-gray-300 hover:border-black transition-colors duration-300 ${
          canScrollNext
            ? "bg-white hover:bg-black hover:text-white cursor-pointer"
            : "bg-gray-100 cursor-not-allowed opacity-50"
        }`}
        aria-label="Next slide"
        aria-disabled={!canScrollNext}
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </motion.button>
    </div>
  );
}

// Floating Controls (positioned on carousel)
interface FloatingCarouselControlsProps extends Omit<
  CarouselControlsProps,
  "showOnMobile"
> {
  position?: "bottom" | "side";
  variant?: "light" | "dark";
}

export function FloatingCarouselControls({
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
  position = "bottom",
  variant = "light",
  className = "",
}: FloatingCarouselControlsProps) {
  const bgClass =
    variant === "dark"
      ? "bg-black/60 hover:bg-black/80"
      : "bg-white/80 hover:bg-white";
  const textClass = variant === "dark" ? "text-white" : "text-black";

  const positionClass =
    position === "bottom"
      ? "absolute bottom-4 left-1/2 -translate-x-1/2"
      : "absolute right-4 top-1/2 -translate-y-1/2";

  return (
    <div
      className={`${positionClass} flex gap-3 z-40 ${className}`}
      role="group"
      aria-label="Carousel controls"
    >
      {/* Previous Button */}
      <motion.button
        onClick={onPrev}
        disabled={!canScrollPrev}
        variants={buttonVariants}
        initial="initial"
        whileHover={canScrollPrev ? "hover" : "disabled"}
        whileTap={canScrollPrev ? "tap" : undefined}
        className={`p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${bgClass} ${textClass} ${
          !canScrollPrev ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Previous slide"
        aria-disabled={!canScrollPrev}
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!canScrollNext}
        variants={buttonVariants}
        initial="initial"
        whileHover={canScrollNext ? "hover" : "disabled"}
        whileTap={canScrollNext ? "tap" : undefined}
        className={`p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${bgClass} ${textClass} ${
          !canScrollNext ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
        }`}
        aria-label="Next slide"
        aria-disabled={!canScrollNext}
      >
        <ChevronRight size={24} />
      </motion.button>
    </div>
  );
}
