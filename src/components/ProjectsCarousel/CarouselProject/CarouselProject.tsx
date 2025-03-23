import React from "react";
import styles from "./CarouselProject.module.scss";
import StuckGrid from "./StuckGrid/StuckGrid";

export type TProject = {
  id: string;
  backgroundColor: string;
  content: React.ReactNode;
};

type TCarouselProjectProps = {
  project: TProject;
};

const ZOOM_AUTOSCROLL_DELTA: number = 8000;
const ZOOM_AUTOSCROLL_STEP: number = 6;
const MAX_SCALE_VALUE: number = 16;

export const CarouselProject = (props: TCarouselProjectProps): JSX.Element => {
  const [scale, setScale] = React.useState(1);
  const contentBoxRef = React.useRef<HTMLDivElement>(null);
  const isTriggerScroll = React.useRef<boolean>(false);

  const triggerAutoScroll = (deltaYTarget: number): void => {
    if (contentBoxRef.current) {
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
    []
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
    if (contentBox) contentBox.addEventListener("wheel", handleScroll);

    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      if (contentBox) contentBox.removeEventListener("wheel", handleScroll);

      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleScroll, handleTouchMove]);

  const animationTransform: string = `scale(${scale})`;
  const animationOpacity: number = 1 - scale / (MAX_SCALE_VALUE / 2);

  return (
    <div
      key={props.project.id}
      className={styles.carouselItem}
      style={{
        backgroundColor: props.project.backgroundColor,
      }}
    >
      <StuckGrid scale={scale} />
      <div
        className={styles.contentBox}
        ref={contentBoxRef}
        style={{
          transform: animationTransform,
          opacity: animationOpacity,
        }}
      >
        {props.project.content}
      </div>
    </div>
  );
};
