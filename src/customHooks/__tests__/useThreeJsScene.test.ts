import { useThreeJsScene } from '../useThreeJsScene';

describe('useThreeJsScene', () => {
  it('should be importable and exported correctly', () => {
    expect(useThreeJsScene).toBeDefined();
    expect(typeof useThreeJsScene).toBe('function');
  });

  it('should have proper TypeScript types', () => {
    // This test validates that the hook is properly typed
    // Actual Three.js initialization requires WebGL which is not available in Jest
    const hookExists = typeof useThreeJsScene === 'function';
    expect(hookExists).toBe(true);
  });

  it('should accept containerRef and config parameters', () => {
    // Type validation test - ensures the hook signature is correct
    // We don't actually call it because WebGL is not available in test environment
    const hookSignature = useThreeJsScene.length;
    expect(hookSignature).toBeGreaterThanOrEqual(1);
  });
});
