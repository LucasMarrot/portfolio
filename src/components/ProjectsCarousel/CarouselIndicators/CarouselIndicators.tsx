import { TProject } from "../ProjectsCarousel";
import styles from "./CarouselIndicators.module.scss";

type TCarouselIndicatorsProps = {
  projects: TProject[];
  activeIndex: number;
  scrollToSlide: (index: number) => void;
};

export const CarouselIndicators = (
  props: TCarouselIndicatorsProps
): JSX.Element => {
  return (
    <div className={styles.indicators}>
      {props.projects.map((_, index) => (
        <div
          key={index}
          className={`${styles.indicator} ${
            props.activeIndex === index && styles.activeIndicator
          }`}
          onClick={() => props.scrollToSlide(index)}
        />
      ))}
    </div>
  );
};
