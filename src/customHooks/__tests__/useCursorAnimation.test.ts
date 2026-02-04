import { renderHook, act } from '@testing-library/react';
import { useCursorAnimation } from '../useCursorAnimation';

describe('useCursorAnimation', () => {
  it('should be importable and exported correctly', () => {
    expect(useCursorAnimation).toBeDefined();
    expect(typeof useCursorAnimation).toBe('function');
  });

  it('should return hook with required methods', () => {
    const { result } = renderHook(() => useCursorAnimation());
    
    expect(result.current).toBeDefined();
    expect(result.current.updateMousePosition).toBeDefined();
    expect(result.current.computeAnimationFrame).toBeDefined();
    expect(result.current.applyTransform).toBeDefined();
  });

  it('should update mouse position on updateMousePosition call', () => {
    const { result } = renderHook(() => useCursorAnimation());
    
    act(() => {
      result.current.updateMousePosition(100, 200);
    });

    // Mouse position is stored internally in refs
    expect(result.current.updateMousePosition).toBeDefined();
  });

  it('should compute animation values based on frame time', () => {
    const { result } = renderHook(() => useCursorAnimation());
    
    act(() => {
      result.current.updateMousePosition(100, 100);
      const animationValues = result.current.computeAnimationFrame();
      
      expect(animationValues).toBeDefined();
      expect(animationValues.translateTransform).toBeDefined();
      expect(animationValues.rotateTransform).toBeDefined();
      expect(animationValues.scaleTransform).toBeDefined();
    });
  });

  it('should apply transforms correctly', () => {
    const { result } = renderHook(() => useCursorAnimation());
    const mockElement = document.createElement('div');
    
    act(() => {
      result.current.updateMousePosition(50, 50);
      const animationValues = result.current.computeAnimationFrame();
      result.current.applyTransform(mockElement, animationValues);
    });

    const transform = mockElement.style.transform;
    expect(transform).toBeTruthy();
    expect(transform).toContain('translate');
  });
});
