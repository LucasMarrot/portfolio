import React from "react";
import styles from "./CarouselProject.module.scss";
import StuckGrid from "./StuckGrid/StuckGrid";

export type TProject = {
  id: number;
  primaryColor: string;
  keyWords: string[];
  leftContent: React.ReactNode;
  rightGifName?: string;
};

type TCarouselProjectProps = {
  project: TProject;
  onIsTriggerScrollChange?: (isTriggerScroll: boolean) => void;
};

const ZOOM_AUTOSCROLL_DELTA: number = 8000;
const ZOOM_AUTOSCROLL_STEP: number = 6;
const MAX_SCALE_VALUE: number = 16;
const SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS: number = 1.5;

export const CarouselProject = (props: TCarouselProjectProps): JSX.Element => {
  const [scale, setScale] = React.useState(1);
  const contentBoxRef = React.useRef<HTMLDivElement>(null);
  const isTriggerScroll = React.useRef<boolean>(false);
  const leftBoxRef = React.useRef<HTMLDivElement>(null);
  const rightBoxRef = React.useRef<HTMLDivElement>(null);

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

  const progressiveScroll = React.useCallback(
    (targetScroll: number, step: number = 5): void => {
      isTriggerScroll.current = true;
      props.onIsTriggerScrollChange?.(true);
      const slowdownFactor: number = 0.01;
      let currentScroll: number = 0;
      const interval = setInterval(() => {
        if (step > 0 && currentScroll >= targetScroll) clearInterval(interval);
        else if (step < 0 && currentScroll <= targetScroll) {
          clearInterval(interval);
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

  const handleScroll = React.useCallback(
    (event: WheelEvent): void => {
      event.preventDefault();
      if (event.deltaY > 1 && !isTriggerScroll.current)
        progressiveScroll(ZOOM_AUTOSCROLL_DELTA, ZOOM_AUTOSCROLL_STEP);
    },
    [isTriggerScroll, progressiveScroll]
  );

  const handleTouchMove = React.useCallback(
    (event: TouchEvent): void => {
      event.preventDefault();
      const touch: Touch = event.touches[0];
      if (touch.clientY > 1 && !isTriggerScroll.current)
        progressiveScroll(ZOOM_AUTOSCROLL_DELTA, ZOOM_AUTOSCROLL_STEP);
    },
    [isTriggerScroll, progressiveScroll]
  );

  React.useEffect(() => {
    const contentBox = contentBoxRef.current;
    if (contentBox) {
      contentBox.addEventListener("wheel", handleScroll);
      contentBox.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (contentBox) {
        contentBox.removeEventListener("wheel", handleScroll);
        contentBox.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, [handleScroll, handleTouchMove]);

  React.useEffect(() => {
    // Floating effect + mousemove effect
    // This effect is used to create a floating effect on the project boxes
    // and to rotate them based on the mouse position

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

  const animationTransform: string = `scale(${scale})`;
  const animationOpacity: number = 1 - scale / (MAX_SCALE_VALUE / 2);

  return (
    <div
      key={props.project.id}
      className={styles.carouselItem}
      style={{
        background:
          props.project.id % 2 === 0
            ? `linear-gradient(to left, ${props.project.primaryColor},var(--bg-color)) right`
            : `linear-gradient(to right, ${props.project.primaryColor},var(--bg-color)) left`,
      }}
    >
      <StuckGrid scale={scale} words={props.project.keyWords} />
      <div
        className={styles.contentBox}
        ref={contentBoxRef}
        style={{
          transform: animationTransform,
          opacity: animationOpacity,
        }}
      >
        <div className={styles.container}>
          <div ref={leftBoxRef} className={styles.left}>
            {props.project.leftContent}
          </div>
          <div className={styles.middle}>
            {scale < SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS && (
              <>
                <p>Scrollez pour entrer dans le projet</p>
                <p className={styles.arrow}>↓</p>
              </>
            )}
          </div>
          <div
            ref={rightBoxRef}
            className={styles.right}
            style={{
              backgroundImage: props.project.rightGifName
                ? `url(${require(`../../../assets/images/${props.project.rightGifName}`)})`
                : undefined,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
