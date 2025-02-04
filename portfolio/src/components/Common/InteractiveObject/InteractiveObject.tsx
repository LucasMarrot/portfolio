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
};

export default function InteractiveObject({
  children,
  type,
  text,
}: InteractiveObjectProps): JSX.Element {
  const { setInteractiveState } = useInteractive();
  const divRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return;

      const rect = divRef.current.getBoundingClientRect();
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        setInteractiveState({ type, text });
      } else {
        setInteractiveState({ type: null });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [type, text, setInteractiveState]);

  function handleInteraction(): void {
    //TODO: Add interaction logic
    console.error("OnClick: Not implemented");
  }

  return (
    <div
      ref={divRef}
      className={`${styles.interactive}`}
      onClick={handleInteraction}
      data-interaction={type}
      data-text={text}
    >
      {children}
    </div>
  );
}
