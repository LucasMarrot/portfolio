import React, { useRef, useState, useEffect } from "react";
import styles from "./ProjectsCarousel.module.scss";
import { CarouselArrowButton } from "./CarouselArrowButton/CarouselArrowButton";
import { CarouselIndicators } from "./CarouselIndicators/CarouselIndicators";

export type TProject = {
  id: string;
  backgroundColor: string;
  content: React.ReactNode;
};

interface TProjectsCarouselProps {
  projects: TProject[];
}

export const ProjectsCarousel = (
  props: TProjectsCarouselProps
): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollToSlide = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * index,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.carouselWrapper}>
      <div ref={containerRef} className={styles.carouselContainer}>
        <CarouselArrowButton
          position="left"
          activeIndex={activeIndex}
          projects={props.projects}
          scrollToSlide={scrollToSlide}
        />
        {props.projects.map((project) => (
          <div
            key={project.id}
            className={styles.carouselItem}
            style={{ backgroundColor: project.backgroundColor }}
          >
            <div className={styles.contentBox}>{project.content}</div>
          </div>
        ))}
        <CarouselArrowButton
          position="right"
          activeIndex={activeIndex}
          projects={props.projects}
          scrollToSlide={scrollToSlide}
        />
      </div>
      <CarouselIndicators
        scrollToSlide={scrollToSlide}
        projects={props.projects}
        activeIndex={activeIndex}
      />
    </div>
  );
};
