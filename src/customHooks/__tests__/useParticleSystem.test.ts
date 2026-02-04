import { renderHook, act } from '@testing-library/react';
import { useParticleSystem } from '../useParticleSystem';

describe('useParticleSystem', () => {
  it('should be importable and exported correctly', () => {
    expect(useParticleSystem).toBeDefined();
    expect(typeof useParticleSystem).toBe('function');
  });

  it('should initialize with empty particles array', () => {
    const { result } = renderHook(() => useParticleSystem());
    
    expect(result.current.particles).toEqual([]);
  });

  it('should provide particle management methods', () => {
    const { result } = renderHook(() => useParticleSystem());
    
    expect(result.current.addParticle).toBeDefined();
    expect(result.current.updateParticles).toBeDefined();
    expect(result.current.clear).toBeDefined();
  });

  it('should add particles to system', () => {
    const { result } = renderHook(() => useParticleSystem());
    
    act(() => {
      result.current.addParticle(100, 100, 1, 1, 1);
    });

    expect(result.current.particles.length).toBeGreaterThan(0);
  });

  it('should respect max particles limit', () => {
    const { result } = renderHook(() => useParticleSystem({ maxParticles: 5 }));
    
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.addParticle(i * 10, i * 10, 0, 0, 1);
      }
    });

    expect(result.current.particles.length).toBeLessThanOrEqual(5);
  });

  it('should clear all particles', () => {
    const { result } = renderHook(() => useParticleSystem());
    
    act(() => {
      result.current.addParticle(100, 100, 0, 0, 1);
    });

    expect(result.current.particles.length).toBeGreaterThan(0);

    act(() => {
      result.current.clear();
    });

    expect(result.current.particles).toHaveLength(0);
  });
});
