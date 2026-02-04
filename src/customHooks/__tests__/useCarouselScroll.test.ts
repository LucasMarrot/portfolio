import { renderHook, act } from '@testing-library/react';
import { useCarouselScroll } from '../useCarouselScroll';

describe('useCarouselScroll', () => {
  const mockConfig = {
    totalSlides: 5,
    slideWidth: 300,
  };

  it('should initialize with correct state', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.scrollPosition).toBe(0);
  });

  it('should scroll to a specific slide', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    act(() => {
      result.current.scrollToSlide(2);
    });

    expect(result.current.currentIndex).toBe(2);
    expect(result.current.scrollPosition).toBe(600); // 2 * 300
  });

  it('should prevent scrolling beyond bounds', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    act(() => {
      result.current.scrollToSlide(10); // Beyond total slides
    });

    expect(result.current.currentIndex).toBe(0); // Should not change
  });

  it('should navigate to next slide', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    act(() => {
      result.current.nextSlide();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should navigate to previous slide', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    act(() => {
      result.current.scrollToSlide(2);
    });

    act(() => {
      result.current.prevSlide();
    });

    expect(result.current.currentIndex).toBe(1);
  });

  it('should clamp at boundaries on navigation', () => {
    const { result } = renderHook(() => useCarouselScroll(mockConfig));
    
    act(() => {
      result.current.prevSlide(); // From index 0
    });

    expect(result.current.currentIndex).toBe(0);
  });
});
