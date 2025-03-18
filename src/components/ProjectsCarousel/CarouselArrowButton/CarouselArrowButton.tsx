import { InteractiveType } from "../../../contexts/InteractiveContext";
import InteractiveObject from "../../_commons/InteractiveObject/InteractiveObject";
import { TProject } from "../CarouselProject/CarouselProject";
import styles from "./CarouselArrowButton.module.scss";

type TCarouselArrowButtonProps = {
  projects: TProject[];
  position: "left" | "right";
  activeIndex: number;
  scrollToSlide: (index: number) => void;
};

export const CarouselArrowButton = (
  props: TCarouselArrowButtonProps
): JSX.Element => {
  const handlePrevClick = () => {
    if (props.activeIndex > 0) {
      props.scrollToSlide(props.activeIndex - 1);
    } else {
      props.scrollToSlide(props.projects.length - 1);
    }
  };

  const handleNextClick = () => {
    if (props.activeIndex < props.projects.length - 1) {
      props.scrollToSlide(props.activeIndex + 1);
    } else {
      props.scrollToSlide(0);
    }
  };

  return props.position === "left" ? (
    <InteractiveObject
      type={InteractiveType.CLICK}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: "5vmax",
        zIndex: 10,
      }}
    >
      <button className={styles.navButton} onClick={handlePrevClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="ArrowLeft"
          data-name="ArrowLeft"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <path d="M10,22.03c-.77,0-1.51-.3-2.09-.88L1.18,14.82c-1.57-1.57-1.57-4.09-.02-5.64,0,0,.01-.01,.02-.02L7.93,2.81c.84-.85,2.09-1.1,3.22-.63s1.84,1.52,1.85,2.74v2.06h7.03c2.19,0,3.97,1.8,3.97,4.01v1.98c0,2.21-1.78,4.01-3.97,4.01h-7.03v2.06c0,1.23-.71,2.28-1.85,2.75-.38,.16-.77,.23-1.15,.23Z" />
        </svg>
      </button>
    </InteractiveObject>
  ) : (
    <InteractiveObject
      type={InteractiveType.CLICK}
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: "5vmax",
        zIndex: 10,
      }}
    >
      <button className={styles.navButton} onClick={handleNextClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="ArrowRight"
          data-name="ArrowRight"
          viewBox="0 0 24 24"
          width="32"
          height="32"
        >
          <path d="M14,22.03c-.39,0-.78-.08-1.16-.23-1.13-.47-1.84-1.52-1.85-2.75v-2.06H3.97c-2.19,0-3.97-1.8-3.97-4.01v-1.98c0-2.21,1.78-4.01,3.97-4.01h7.03v-2.06c0-1.23,.71-2.28,1.85-2.75,1.13-.47,2.38-.22,3.24,.65l6.72,6.33,.02,.02c1.55,1.55,1.55,4.07,0,5.62l-6.77,6.37c-.56,.56-1.3,.86-2.06,.86Z" />
        </svg>
      </button>
    </InteractiveObject>
  );
};
