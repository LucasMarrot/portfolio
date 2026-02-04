import { useEffect, useRef, useCallback } from "react";
import { Clock } from "three";

/**
 * Configuration for animation frame management
 */
type TUseAnimationFrameConfig = {
  onFrame: (deltaTime: number) => void;
  enabled?: boolean;
};

/**
 * Custom hook to manage animation frame loop with Three.js Clock
 * Provides delta time calculation and frame management
 *
 * @param config Configuration for animation frame
 * @returns Animation state and controls
 */
export function useAnimationFrame(config: TUseAnimationFrameConfig) {
  const clockRef = useRef(new Clock());
  const animationIdRef = useRef<number | null>(null);
  const isRunningRef = useRef(false);

  /**
   * Start animation loop
   */
  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    clockRef.current.start();

    const animate = () => {
      if (!isRunningRef.current) return;

      const deltaTime = clockRef.current.getDelta();
      config.onFrame(deltaTime);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
  }, [config]);

  /**
   * Stop animation loop
   */
  const stop = useCallback(() => {
    isRunningRef.current = false;
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  /**
   * Automatic cleanup on unmount
   */
  useEffect(() => {
    const enabled = config.enabled !== false;
    if (enabled) {
      start();
    }

    return () => {
      stop();
    };
  }, [config.enabled, start, stop]);

  return {
    isRunning: isRunningRef.current,
    start,
    stop,
  };
}
