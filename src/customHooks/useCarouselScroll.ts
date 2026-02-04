import { useState, useCallback, useRef } from "react";

/**
 * Configuration for carousel scroll behavior
 */
type TUseCarouselScrollConfig = {
  totalSlides: number;
  slideWidth?: number;
  snapThreshold?: number;
};

/**
 * Custom hook to manage carousel scroll behavior
 * Encapsulates scroll position, snapping, and navigation logic
 *
 * @param config Configuration for carousel scroll
 * @returns Carousel state and navigation methods
 */
export function useCarouselScroll(config: TUseCarouselScrollConfig) {
  const {
    totalSlides,
    slideWidth = 0,
  } = config;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  /**
   * Scroll to a specific slide index
   */
  const scrollToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) return;

      setCurrentIndex(index);
      const newPosition = index * slideWidth;
      setScrollPosition(newPosition);

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = newPosition;
      }
    },
    [totalSlides, slideWidth]
  );

  /**
   * Handle scroll event and determine current slide
   */
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const position = container.scrollLeft;
      setScrollPosition(position);

      if (slideWidth > 0) {
        const exactIndex = position / slideWidth;
        const newIndex = Math.round(exactIndex);
        const snapped = Math.max(0, Math.min(newIndex, totalSlides - 1));

        setCurrentIndex(snapped);
      }
    },
    [slideWidth, totalSlides]
  );

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    const nextIndex = Math.min(currentIndex + 1, totalSlides - 1);
    scrollToSlide(nextIndex);
  }, [currentIndex, totalSlides, scrollToSlide]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToSlide(prevIndex);
  }, [currentIndex, scrollToSlide]);

  return {
    currentIndex,
    scrollPosition,
    scrollContainerRef,
    scrollToSlide,
    handleScroll,
    nextSlide,
    prevSlide,
    isScrolling: isScrollingRef.current,
  };
}
