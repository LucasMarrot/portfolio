import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_SCALE_VALUE: number = 16;
export const SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS: number = 1.5;

/** Throttle interval (ms) for React state updates to StuckGrid */
const SCALE_STATE_THROTTLE_MS: number = 150;

type TUseProjectZoomAnimationProps = {
  readonly onIsTriggerScrollChange?: (isTriggerScroll: boolean) => void;
  readonly onAnimationComplete?: () => void;
};

type TUseProjectZoomAnimationReturn = {
  readonly scale: number;
  readonly contentBoxRef: React.RefObject<HTMLDivElement>;
  readonly leftBoxRef: React.RefObject<HTMLDivElement>;
  readonly rightBoxRef: React.RefObject<HTMLDivElement>;
};

/**
 * Custom hook to manage project zoom animation using GSAP.
 *
 * Performance strategy:
 * - Transform & opacity are applied directly to the DOM via contentBoxRef (60fps)
 * - React scale state is throttled (~15fps) — only used by StuckGrid for word appearances
 */
export const useProjectZoomAnimation = (
  props: TUseProjectZoomAnimationProps
): TUseProjectZoomAnimationReturn => {
  const [scale, setScale] = useState(1);

  const contentBoxRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const lastStateUpdateRef = useRef<number>(0);

  // Trigger GSAP zoom animation
  const triggerZoomAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    props.onIsTriggerScrollChange?.(true);

    const animationObject = { scale: 1 };

    gsap.to(animationObject, {
      scale: MAX_SCALE_VALUE,
      duration: 5,
      ease: "none",
      onUpdate: () => {
        const currentScale = animationObject.scale;

        // Direct DOM manipulation for smooth 60fps animation
        if (contentBoxRef.current) {
          contentBoxRef.current.style.transform = `scale(${currentScale})`;
          contentBoxRef.current.style.opacity = String(
            Math.max(0, 1 - currentScale / (MAX_SCALE_VALUE / 2))
          );
        }

        // Throttled React state update for StuckGrid word appearances (~15fps)
        const now = performance.now();
        if (now - lastStateUpdateRef.current > SCALE_STATE_THROTTLE_MS) {
          lastStateUpdateRef.current = now;
          setScale(currentScale);
        }
      },
      onComplete: () => {
        setScale(MAX_SCALE_VALUE);
        isAnimatingRef.current = false;
        props.onIsTriggerScrollChange?.(false);
        props.onAnimationComplete?.();
      },
    });
  }, [props]);

  // Wheel event handler
  const handleScroll = useCallback(
    (event: WheelEvent): void => {
      if (event.deltaY > 1 && !isAnimatingRef.current) {
        event.preventDefault();
        triggerZoomAnimation();
      }
    },
    [triggerZoomAnimation]
  );

  // Touch move event handler
  const handleTouchMove = useCallback(
    (event: TouchEvent): void => {
      if (!isAnimatingRef.current) {
        event.preventDefault();
        triggerZoomAnimation();
      }
    },
    [triggerZoomAnimation]
  );

  // Setup wheel and touch listeners
  useEffect(() => {
    const contentBox = contentBoxRef.current;
    if (contentBox) {
      contentBox.addEventListener("wheel", handleScroll as EventListener, {
        passive: false,
      });
      contentBox.addEventListener("touchmove", handleTouchMove as EventListener, {
        passive: false,
      });
    }

    return () => {
      if (contentBox) {
        contentBox.removeEventListener("wheel", handleScroll as EventListener);
        contentBox.removeEventListener("touchmove", handleTouchMove as EventListener);
      }
    };
  }, [handleScroll, handleTouchMove]);

  // Setup floating effect and mousemove listeners
  useEffect(() => {
    const left: HTMLDivElement | null = leftBoxRef.current;
    const right: HTMLDivElement | null = rightBoxRef.current;

    const baseRotateY: number = 25;
    const maxOffsetY: number = 10;
    const maxOffsetX: number = 5;

    let offsetX: number = 0;
    let offsetY: number = 0;
    let targetOffsetX: number = 0;
    let targetOffsetY: number = 0;
    let lastMoveTime: number = Date.now();

    let floatTime: number = 0;
    const floatSpeed: number = 0.0005;
    const floatAmplitude: number = 4;

    const animate = () => {
      const now: number = Date.now();
      const timeSinceMove: number = now - lastMoveTime;

      offsetX += (targetOffsetX - offsetX) * 0.1;
      offsetY += (targetOffsetY - offsetY) * 0.1;

      if (timeSinceMove > 2000) {
        floatTime += 16;
      } else {
        floatTime = 0;
      }

      const floatX: number = Math.sin(floatTime * floatSpeed) * floatAmplitude;
      const floatYL: number = Math.cos(floatTime * floatSpeed) * floatAmplitude;
      const floatYR: number =
        Math.sin(floatTime * floatSpeed * 1.1) * floatAmplitude;

      const rotX: number = -offsetY * maxOffsetX + floatX;
      const rotYLeft: number = baseRotateY + offsetX * maxOffsetY + floatYL;
      const rotYRight: number = -baseRotateY - offsetX * maxOffsetY + floatYR;

      if (left)
        left.style.transform = `perspective(800px) rotateY(${rotYLeft}deg) rotateX(${rotX}deg) scale(1.2)`;

      if (right)
        right.style.transform = `perspective(800px) rotateY(${rotYRight}deg) rotateX(${rotX}deg) scale(1.2)`;

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      const centerX: number = window.innerWidth / 2;
      const centerY: number = window.innerHeight / 2;
      targetOffsetX = (e.clientX - centerX) / centerX;
      targetOffsetY = (e.clientY - centerY) / centerY;
      lastMoveTime = Date.now();
    };

    const handleMouseLeave = (): void => {
      targetOffsetX = 0;
      targetOffsetY = 0;
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    animate();

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return {
    scale,
    contentBoxRef,
    leftBoxRef,
    rightBoxRef,
  };
};
