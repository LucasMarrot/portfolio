import { useState, useCallback, RefObject } from "react";

/**
 * Custom hook to manage carousel scroll and interaction state
 * Encapsulates logic for tracking scroll position and trigger state
 *
 * @param containerRef Reference to carousel container
 * @returns State and handlers for carousel interaction
 */
export function useCarouselInteraction(containerRef: RefObject<HTMLDivElement>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTriggerScroll, setIsTriggerScroll] = useState(false);

  /**
   * Handle scroll events to update active slide
   */
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isTriggerScroll) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  }, [isTriggerScroll, containerRef]);

  /**
   * Scroll to specific slide with smooth behavior
   */
  const scrollToSlide = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * index,
        behavior: "smooth",
      });
    }
  }, [containerRef]);

  /**
   * Update trigger scroll state
   */
  const handleIsTriggerScrollChange = useCallback((trigger: boolean) => {
    setIsTriggerScroll(trigger);
  }, []);

  return {
    activeIndex,
    isTriggerScroll,
    handleScroll,
    scrollToSlide,
    handleIsTriggerScrollChange,
  };
}
