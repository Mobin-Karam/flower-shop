// CarouselIndicators Component - Slide dots/indicators
'use client';

import { motion } from 'framer-motion';

interface CarouselIndicatorsProps {
  totalSlides: number;
  activeIndex: number;
  onIndicatorClick: (index: number) => void;
  className?: string;
  variant?: 'dots' | 'bars' | 'numbers';
  showLabels?: boolean;
}

const dotVariants = {
  inactive: {
    width: '8px',
    opacity: 0.5,
    transition: { duration: 0.3 },
  },
  active: {
    width: '24px',
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const barVariants = {
  inactive: {
    height: '3px',
    opacity: 0.4,
    transition: { duration: 0.3 },
  },
  active: {
    height: '4px',
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

export function CarouselIndicators({
  totalSlides,
  activeIndex,
  onIndicatorClick,
  className = '',
  variant = 'dots',
  showLabels = false,
}: CarouselIndicatorsProps) {
  if (totalSlides === 0) return null;

  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      role="group"
      aria-label="Slide indicators"
    >
      {variant === 'dots' && (
        <div className="flex gap-2">
          {[...Array(totalSlides)].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onIndicatorClick(index)}
              variants={dotVariants}
              animate={activeIndex === index ? 'active' : 'inactive'}
              className={`rounded-full transition-colors duration-300 ${
                activeIndex === index ? 'bg-black' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
              style={{ minWidth: '8px', height: '8px' }}
            />
          ))}
        </div>
      )}

      {variant === 'bars' && (
        <div className="flex gap-2 w-full max-w-xs px-4">
          {[...Array(totalSlides)].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => onIndicatorClick(index)}
              variants={barVariants}
              animate={activeIndex === index ? 'active' : 'inactive'}
              className={`flex-1 rounded transition-colors duration-300 ${
                activeIndex === index ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
              style={{ minHeight: '3px' }}
            />
          ))}
        </div>
      )}

      {variant === 'numbers' && (
        <div className="flex items-center gap-2 text-sm md:text-base font-semibold">
          <span className="text-black">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">
            {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
}

// Thumbnail Indicators
interface ThumbnailIndicatorsProps {
  slides: Array<{ id: string; image: { src: string; alt: string } }>;
  activeIndex: number;
  onThumbnailClick: (index: number) => void;
  className?: string;
}

export function ThumbnailIndicators({
  slides,
  activeIndex,
  onThumbnailClick,
  className = '',
}: ThumbnailIndicatorsProps) {
  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-2 ${className}`}
      role="group"
      aria-label="Thumbnail indicators"
    >
      {slides.map((slide, index) => (
        <motion.button
          key={slide.id}
          onClick={() => onThumbnailClick(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
            activeIndex === index ? 'border-black' : 'border-gray-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={activeIndex === index ? 'true' : 'false'}
        >
          <img
            src={slide.image.src}
            alt={slide.image.alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.button>
      ))}
    </div>
  );
}

// Progress Bar Indicator
interface ProgressIndicatorProps {
  activeIndex: number;
  totalSlides: number;
  className?: string;
  height?: 'sm' | 'md' | 'lg';
}

export function ProgressIndicator({
  activeIndex,
  totalSlides,
  className = '',
  height = 'sm',
}: ProgressIndicatorProps) {
  const progress = ((activeIndex + 1) / totalSlides) * 100;
  const heightClass = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }[height];

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${heightClass} ${className}`}
      role="progressbar"
      aria-label="Carousel progress"
      aria-valuenow={activeIndex + 1}
      aria-valuemin={1}
      aria-valuemax={totalSlides}
    >
      <motion.div
        className="h-full bg-black rounded-full"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
}