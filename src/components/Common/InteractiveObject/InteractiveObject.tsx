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

  React.useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      setInteractiveState({ type, text });
    };

    const handleMouseLeave = () => {
      setInteractiveState({ type: null });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [type, text, setInteractiveState]);

  return (
    <div
      ref={divRef}
      className={`${styles.interactive} ${className}`}
      onClick={() => {}} // TODO: Add interaction logic
      data-interaction={type}
      data-text={text}
      style={style}
    >
      {children}
    </div>
  );
}
