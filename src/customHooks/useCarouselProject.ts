import { useCallback, useEffect, useRef, useState } from "react";
import { TUseCarouselProjectReturn, TUseCarouselProjectProps } from "./useCarouselProject.types";

// Constants
const ZOOM_AUTOSCROLL_DELTA: number = 8000;
const ZOOM_AUTOSCROLL_STEP: number = 6;
const MAX_SCALE_VALUE: number = 16;
const SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS: number = 1.5;

/**
 * Custom hook to manage carousel project animations and interactions
 * Extracts: scale state, auto-scroll logic, floating effects, event handlers
 */
export const useCarouselProject = (
  props: TUseCarouselProjectProps
): TUseCarouselProjectReturn => {
  const [scale, setScale] = useState(1);
  const [isTriggerScroll, setIsTriggerScroll] = useState(false);

  const contentBoxRef = useRef<HTMLDivElement>(null);
  const isTriggerScrollRef = useRef<boolean>(false);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);

  // Trigger auto scroll with wheel event
  const triggerAutoScroll = (deltaYTarget: number): void => {
    if (contentBoxRef.current) {
      contentBoxRef.current.style.pointerEvents = "none";
      const evt: WheelEvent = new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        deltaY: deltaYTarget,
      });
      contentBoxRef.current.dispatchEvent(evt);
    }
  };

  // Progressive scroll animation
  const progressiveScroll = useCallback(
    (targetScroll: number, step: number = 5): void => {
      isTriggerScrollRef.current = true;
      setIsTriggerScroll(true);
      props.onIsTriggerScrollChange?.(true);

      const slowdownFactor: number = 0.01;
      let currentScroll: number = 0;

      const interval = setInterval(() => {
        if (step > 0 && currentScroll >= targetScroll) {
          clearInterval(interval);
          isTriggerScrollRef.current = false;
          setIsTriggerScroll(false);
          props.onIsTriggerScrollChange?.(false);
        } else if (step < 0 && currentScroll <= targetScroll) {
          clearInterval(interval);
          isTriggerScrollRef.current = false;
          setIsTriggerScroll(false);
          props.onIsTriggerScrollChange?.(false);
        } else {
          currentScroll += step;
          triggerAutoScroll(step);
          setScale((prevScale) =>
            Math.max(1, prevScale + step * slowdownFactor)
          );
        }
      }, 20);
    },
    [props]
  );

  // Wheel event handler
  const handleScroll = useCallback(
    (event: WheelEvent): void => {
      event.preventDefault();
      if (event.deltaY > 1 && !isTriggerScrollRef.current) {
        progressiveScroll(ZOOM_AUTOSCROLL_DELTA, ZOOM_AUTOSCROLL_STEP);
      }
    },
    [progressiveScroll]
  );

  // Touch move event handler
  const handleTouchMove = useCallback(
    (event: TouchEvent): void => {
      event.preventDefault();
      const touch: Touch = event.touches[0];
      if (touch.clientY > 1 && !isTriggerScrollRef.current) {
        progressiveScroll(ZOOM_AUTOSCROLL_DELTA, ZOOM_AUTOSCROLL_STEP);
      }
    },
    [progressiveScroll]
  );

  // Setup wheel and touch listeners
  useEffect(() => {
    const contentBox = contentBoxRef.current;
    if (contentBox) {
      contentBox.addEventListener("wheel", handleScroll as EventListener);
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

  // Calculate animation values
  const animationTransform: string = `scale(${scale})`;
  const animationOpacity: number = 1 - scale / (MAX_SCALE_VALUE / 2);

  return {
    scale,
    contentBoxRef,
    leftBoxRef,
    rightBoxRef,
    animationTransform,
    animationOpacity,
    isTriggerScroll,
  };
};

// Export constants for reuse if needed
export {
  ZOOM_AUTOSCROLL_DELTA,
  ZOOM_AUTOSCROLL_STEP,
  MAX_SCALE_VALUE,
  SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS,
};
