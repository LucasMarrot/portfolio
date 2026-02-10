import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CarouselProject.module.scss";
import StuckGrid from "./StuckGrid/StuckGrid";
import {
  TProjectLinks,
  TPrimaryColor,
} from "./ProjectDetails/ProjectDetails";
import { TTechnologyNames } from "./TechnologyItem/TechnologyItem.utils";
import { useStrings } from "../../../customHooks/useStrings";
import {
  useProjectZoomAnimation,
  SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS,
} from "../../../customHooks/useProjectZoomAnimation";

/**
 * Core project data structure with stricter typing
 * - primaryColor: branded type to prevent type confusion
 * - keyWords: readonly array to enforce immutability
 */
export type TProject = {
  readonly id: number;
  readonly primaryColor: TPrimaryColor;
  readonly keyWords: readonly string[];
  readonly leftContent: JSX.Element;
  readonly rightGifName?: string;
  readonly title: string;
  readonly year: string;
  readonly technologies: readonly TTechnologyNames[];
  readonly description: string;
  readonly links: TProjectLinks;
  readonly logo: JSX.Element;
};

type TCarouselProjectProps = {
  project: TProject;
  onIsTriggerScrollChange?: (isTriggerScroll: boolean) => void;
};

export const CarouselProject = (props: TCarouselProjectProps): JSX.Element => {
  const strings = useStrings();
  const navigate = useNavigate();

  const {
    scale,
    contentBoxRef,
    leftBoxRef,
    rightBoxRef,
  } = useProjectZoomAnimation({
    onIsTriggerScrollChange: props.onIsTriggerScrollChange,
    onAnimationComplete: () => {
      navigate(`/projects/${props.project.id}`);
    },
  });

  const backgroundGradient = useMemo(
    () =>
      props.project.id % 2 === 0
        ? `linear-gradient(to left, ${props.project.primaryColor},var(--bg-color)) right`
        : `linear-gradient(to right, ${props.project.primaryColor},var(--bg-color)) left`,
    [props.project.id, props.project.primaryColor],
  );

  const backgroundImage = useMemo(
    () =>
      props.project.rightGifName
        ? `url(${require(`../../../assets/images/${props.project.rightGifName}`)})`
        : undefined,
    [props.project.rightGifName],
  );

  return (
    <div
      key={props.project.id}
      className={styles.carouselItem}
      style={{
        background: backgroundGradient,
      }}
    >
      {scale > 1 && (
        <StuckGrid scale={scale} words={props.project.keyWords} />
      )}
      <div
        className={styles.contentBox}
        ref={contentBoxRef}
      >
        <div className={styles.container}>
          <div ref={leftBoxRef} className={styles.left}>
            {props.project.leftContent}
          </div>
          <div className={styles.middle}>
            {scale < SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS && (
              <>
                <p>{strings.carouselProjects.scrollToExploreTheProject}</p>
                <p className={styles.arrow}>↓</p>
              </>
            )}
          </div>
          <div
            ref={rightBoxRef}
            className={styles.right}
            style={{
              backgroundImage,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
