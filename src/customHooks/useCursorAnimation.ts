import { useRef, useCallback } from "react";

/**
 * Cursor animation values computed each frame
 */
export type TCursorAnimationState = {
  translateTransform: string;
  rotateTransform: string;
  scaleTransform: string;
};

/**
 * Configuration for cursor animation behavior
 */
type TUseCursorAnimationConfig = {
  speed: number;
  maxVelocityForRotation: number;
};

const DEFAULT_CONFIG: TUseCursorAnimationConfig = {
  speed: 0.1,
  maxVelocityForRotation: 20,
};

/**
 * Custom hook to manage cursor animation calculations
 * Encapsulates the complex math for smooth cursor movement, squeeze, and rotation
 *
 * @param config Optional configuration for animation behavior
 * @returns Object with cursor state refs and update function
 */
export function useCursorAnimation(
  config: Partial<TUseCursorAnimationConfig> = {}
) {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const currentScale = useRef(0);
  const currentAngle = useRef(0);

  /**
   * Update cursor position based on mouse movement
   */
  const updateMousePosition = useCallback((x: number, y: number) => {
    mouse.current.x = x;
    mouse.current.y = y;
  }, []);

  /**
   * Compute animation transforms for the current frame
   * This is an expensive operation that happens every frame
   */
  const computeAnimationFrame = useCallback((): TCursorAnimationState => {
    // MOVE - Smooth interpolation towards mouse position
    circle.current.x += (mouse.current.x - circle.current.x) * finalConfig.speed;
    circle.current.y += (mouse.current.y - circle.current.y) * finalConfig.speed;
    const translateTransform = `translate(${circle.current.x}px, ${circle.current.y}px)`;

    // SQUEEZE - Based on mouse velocity
    const deltaMouseX = mouse.current.x - previousMouse.current.x;
    const deltaMouseY = mouse.current.y - previousMouse.current.y;
    previousMouse.current.x = mouse.current.x;
    previousMouse.current.y = mouse.current.y;

    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      150
    );
    const scaleValue = (mouseVelocity / 150) * 0.5;
    currentScale.current += (scaleValue - currentScale.current) * finalConfig.speed;
    const scaleTransform = `scale(${1 + currentScale.current}, ${1 - currentScale.current})`;

    // ROTATE - Based on mouse direction
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;
    if (mouseVelocity > finalConfig.maxVelocityForRotation) {
      currentAngle.current = angle;
    }
    const rotateTransform = `rotate(${currentAngle.current}deg)`;

    return { translateTransform, rotateTransform, scaleTransform };
  }, [finalConfig.speed, finalConfig.maxVelocityForRotation]);

  /**
   * Apply computed transforms to element
   */
  const applyTransform = useCallback(
    (element: HTMLElement | null, transforms: TCursorAnimationState) => {
      if (element) {
        element.style.transform = `${transforms.translateTransform} ${transforms.rotateTransform} ${transforms.scaleTransform}`;
      }
    },
    []
  );

  return {
    mouse,
    previousMouse,
    circle,
    updateMousePosition,
    computeAnimationFrame,
    applyTransform,
  };
}
