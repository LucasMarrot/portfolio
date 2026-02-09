import { useMemo } from "react";
import styles from "./CarouselProject.module.scss";
import StuckGrid from "./StuckGrid/StuckGrid";
import {
  ProjectDetails,
  TProjectLinks,
  TPrimaryColor,
} from "./ProjectDetails/ProjectDetails";
import { TTechnologyNames } from "./TechnologyItem/TechnologyItem.utils";
import { useStrings } from "../../../customHooks/useStrings";
import {
  useCarouselProject,
  MAX_SCALE_VALUE,
  SCALE_VALUE_WHEN_MIDDLE_DISAPPEARS,
} from "../../../customHooks/useCarouselProject";

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
  const {
    scale,
    contentBoxRef,
    leftBoxRef,
    rightBoxRef,
    animationTransform,
    animationOpacity,
  } = useCarouselProject({
    onIsTriggerScrollChange: props.onIsTriggerScrollChange,
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
    <>
      {scale < MAX_SCALE_VALUE ? (
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
            style={{
              transform: animationTransform,
              opacity: animationOpacity,
            }}
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
      ) : (
        <div
          key={props.project.id}
          className={styles.innerCarouselItem}
          style={{
            background: backgroundGradient,
          }}
        >
          <ProjectDetails
            title={props.project.title}
            year={props.project.year}
            technologies={props.project.technologies}
            description={props.project.description}
            links={props.project.links}
            logo={props.project.logo}
          />
        </div>
      )}
    </>
  );
};
