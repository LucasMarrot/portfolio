import React from "react";
import {
  InteractiveType,
  useInteractive,
} from "../../../contexts/InteractiveContext";
import styles from "./InteractiveObject.module.scss";

type InteractiveObjectProps = {
  children: React.ReactNode;
  type: InteractiveType;
  text?: string;
  style?: React.CSSProperties;
  className?: string;
};

export default function InteractiveObject({
  children,
  type,
  text,
  style,
  className,
}: InteractiveObjectProps): JSX.Element {
  const { setInteractiveState } = useInteractive();
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = React.useState(false);

  React.useEffect(() => {
    // Manage the different states of the interactive object depending on mobile or desktop
    // Desktop
    const element = divRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setTimeout(() => {
        if (isTouched) return;
        setInteractiveState({ type, text });
      }, 10);
    };

    const handleMouseLeave = () => {
      setTimeout(() => {
        if (isTouched) return;
        setInteractiveState({ type: null });
      }, 10);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    // Mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (!isTouched) {
        element.querySelectorAll("*").forEach((child) => {
          (child as HTMLElement).style.pointerEvents = "none";
        });
        setIsTouched(true);
      } else {
        element.querySelectorAll("*").forEach((child) => {
          (child as HTMLElement).style.pointerEvents = "auto";
        });
        setIsTouched(false);
        setInteractiveState({ type: null });
      }
    };

    element.addEventListener("touchstart", handleTouchStart);

    const handleOutsideTouch = (e: TouchEvent) => {
      if (element && !element.contains(e.target as Node)) {
        setIsTouched(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideTouch);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", handleOutsideTouch);
      element.removeEventListener("touchstart", handleTouchStart);
      setInteractiveState({ type: null });
    };
  }, [type, text, setInteractiveState, isTouched]);

  return (
    <div
      ref={divRef}
      className={`${styles.interactive} ${className}`}
      onClick={() => {}} // TODO : Add the good action here
      data-interaction={type}
      data-text={text}
      style={style}
    >
      {children}
    </div>
  );
}
