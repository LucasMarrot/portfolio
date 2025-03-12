import React, { useRef, useState, useEffect } from "react";
import styles from "./ProjectCarousel.module.scss";

export type TProject = {
  id: string;
  backgroundColor: string;
  content: React.ReactNode;
};

interface TProjectCarouselProps {
  projects: TProject[];
}

export const ProjectCarousel = (props: TProjectCarouselProps): JSX.Element => {
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

  const handlePrevClick = () => {
    if (activeIndex > 0) {
      scrollToSlide(activeIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (activeIndex < props.projects.length - 1) {
      scrollToSlide(activeIndex + 1);
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
        {props.projects.map((project) => (
          <div
            key={project.id}
            className={styles.carouselItem}
            style={{ backgroundColor: project.backgroundColor }}
          >
            <div className={styles.contentBox}>{project.content}</div>
          </div>
        ))}
      </div>
      <div className={styles.indicators}>
        {props.projects.map((_, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${
              activeIndex === index && styles.activeIndicator
            }`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
      <button className={styles.navButton} onClick={handlePrevClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="512"
          height="512"
        >
          <path d="M10,22.03c-.77,0-1.51-.3-2.09-.88L1.18,14.82c-1.57-1.57-1.57-4.09-.02-5.64,0,0,.01-.01,.02-.02L7.93,2.81c.84-.85,2.09-1.1,3.22-.63s1.84,1.52,1.85,2.74v2.06h7.03c2.19,0,3.97,1.8,3.97,4.01v1.98c0,2.21-1.78,4.01-3.97,4.01h-7.03v2.06c0,1.23-.71,2.28-1.85,2.75-.38,.16-.77,.23-1.15,.23Z" />
        </svg>
      </button>
      <button className={styles.navButton} onClick={handleNextClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          data-name="Layer 1"
          viewBox="0 0 24 24"
          width="512"
          height="512"
        >
          <path d="M14,22.03c-.39,0-.78-.08-1.16-.23-1.13-.47-1.84-1.52-1.85-2.75v-2.06H3.97c-2.19,0-3.97-1.8-3.97-4.01v-1.98c0-2.21,1.78-4.01,3.97-4.01h7.03v-2.06c0-1.23,.71-2.28,1.85-2.75,1.13-.47,2.38-.22,3.24,.65l6.72,6.33,.02,.02c1.55,1.55,1.55,4.07,0,5.62l-6.77,6.37c-.56,.56-1.3,.86-2.06,.86Z" />
        </svg>
      </button>
    </div>
  );
};
