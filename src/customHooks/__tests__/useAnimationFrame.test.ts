import { renderHook } from '@testing-library/react';
import { useAnimationFrame } from '../useAnimationFrame';

describe('useAnimationFrame', () => {
  it('should be importable and exported correctly', () => {
    expect(useAnimationFrame).toBeDefined();
    expect(typeof useAnimationFrame).toBe('function');
  });

  it('should return hook with required methods', () => {
    const onFrame = jest.fn();
    const { result } = renderHook(() => 
      useAnimationFrame({
        onFrame,
        enabled: false,
      })
    );

    expect(result.current).toBeDefined();
    expect(result.current.start).toBeDefined();
    expect(result.current.stop).toBeDefined();
  });

  it('should provide start and stop methods', () => {
    const onFrame = jest.fn();
    const { result } = renderHook(() => 
      useAnimationFrame({
        onFrame,
        enabled: false,
      })
    );

    expect(typeof result.current.start).toBe('function');
    expect(typeof result.current.stop).toBe('function');
  });
});
