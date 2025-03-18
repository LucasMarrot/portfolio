import React from "react";
import styles from "./CarouselProject.module.scss";

export type TProject = {
  id: string;
  backgroundColor: string;
  content: React.ReactNode;
};

type TCarouselProjectProps = {
  project: TProject;
};

export const CarouselProject = (props: TCarouselProjectProps): JSX.Element => {
  const [scale, setScale] = React.useState(1);
  const contentBoxRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (event: WheelEvent) => {
    setScale((prevScale) => Math.max(1, prevScale + event.deltaY * 0.01));
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    setScale((prevScale) => Math.max(1, prevScale + touch.clientY * 0.01));
  };

  React.useEffect(() => {
    const contentBox = contentBoxRef.current;
    if (contentBox) {
      contentBox.addEventListener("wheel", handleScroll);
    }
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      if (contentBox) {
        contentBox.removeEventListener("wheel", handleScroll);
      }
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div
      key={props.project.id}
      className={styles.carouselItem}
      style={{ backgroundColor: props.project.backgroundColor }}
    >
      <div
        className={styles.contentBox}
        ref={contentBoxRef}
        style={{ transform: `scale(${scale})` }}
      >
        {props.project.content}
      </div>
    </div>
  );
};
