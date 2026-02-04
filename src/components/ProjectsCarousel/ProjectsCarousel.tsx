import React, { useCallback, useMemo } from "react";
import styles from "./ProjectsCarousel.module.scss";
import { CarouselArrowButton } from "./CarouselArrowButton/CarouselArrowButton";
import { CarouselIndicators } from "./CarouselIndicators/CarouselIndicators";
import { CarouselProject, TProject } from "./CarouselProject/CarouselProject";

type TProjectsCarouselProps = {
  projects: TProject[];
};

export const ProjectsCarousel = (
  props: TProjectsCarouselProps
): JSX.Element => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isTriggerScroll, setIsTriggerScroll] = React.useState(false);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || isTriggerScroll) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  }, [isTriggerScroll]);

  const scrollToSlide = useCallback((index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * index,
        behavior: "smooth",
      });
    }
  }, []);

  const handleIsTriggerScrollChange = useCallback((trigger: boolean) => {
    setIsTriggerScroll(trigger);
  }, []);

  const containerClass = useMemo(
    () =>
      isTriggerScroll
        ? styles.carouselContainerDisableScroll
        : styles.carouselContainer,
    [isTriggerScroll]
  );

  React.useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.carouselWrapper}>
      <div ref={containerRef} className={containerClass}>
        {!isTriggerScroll && (
          <CarouselArrowButton
            position="left"
            activeIndex={activeIndex}
            projects={props.projects}
            scrollToSlide={scrollToSlide}
          />
        )}
        {props.projects.map((project) => (
          <CarouselProject
            key={project.id}
            project={project}
            onIsTriggerScrollChange={handleIsTriggerScrollChange}
          />
        ))}
        {!isTriggerScroll && (
          <CarouselArrowButton
            position="right"
            activeIndex={activeIndex}
            projects={props.projects}
            scrollToSlide={scrollToSlide}
          />
        )}
      </div>
      {!isTriggerScroll && (
        <CarouselIndicators
          scrollToSlide={scrollToSlide}
          projects={props.projects}
          activeIndex={activeIndex}
        />
      )}
    </div>
  );
};
