import React, { useMemo } from "react";
import styles from "./ProjectDetails.module.scss";
import { TechnologyItem } from "../TechnologyItem/TechnologyItem";
import { ProjectLink } from "../ProjectLink/ProjectLink";
import { TTechnologyNames } from "../TechnologyItem/TechnologyItem.utils";
import InteractiveObject from "../../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../../contexts/InteractiveContext";
import { useStrings } from "../../../../customHooks/useStrings";

/**
 * Branded type for URL strings
 */
type TUrl = string & { readonly __brand: "Url" };

const brandUrl = (url: string): TUrl => url as TUrl;

/**
 * Project link with required URL and optional display text
 */
type TProjectLink = {
  text: string;
  link: TUrl;
};

/**
 * Project links collection requiring at least one link source
 */
export type TProjectLinks = {
  browser?: TProjectLink;
  github?: TProjectLink;
  wiki?: TProjectLink;
} & (
  | { browser: TProjectLink }
  | { github: TProjectLink }
  | { wiki: TProjectLink }
);

/**
 * Branded type for primary project color (hex format)
 */
export type TPrimaryColor = string & { readonly __brand: "PrimaryColor" };

const brandPrimaryColor = (color: string): TPrimaryColor =>
  color as TPrimaryColor;

interface ProjectDetailsProps {
  readonly title: string;
  readonly year: string;
  readonly technologies: readonly TTechnologyNames[];
  readonly description: string;
  readonly links: TProjectLinks;
  readonly primaryColor: TPrimaryColor;
  readonly projectId: number;
  readonly logo: JSX.Element;
}

export { brandUrl, brandPrimaryColor };

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  year,
  technologies,
  description,
  links,
  primaryColor,
  projectId,
  logo,
}) => {
  const strings = useStrings();

  const backgroundGradient = useMemo(
    () =>
      projectId % 2 !== 0
        ? `linear-gradient(to left, ${primaryColor},var(--bg-color)) right`
        : `linear-gradient(to right, ${primaryColor},var(--bg-color)) left`,
    [projectId, primaryColor],
  );

  return (
    <div className={styles.projectDetails}>
      <InteractiveObject
        type={InteractiveType.CLICK}
        className={styles.closeButtonContainer}
      >
        <button
          onClick={() => window.location.reload()}
          className={styles.closeButton}
        >
          X
        </button>
      </InteractiveObject>

      <div
        className={styles.logoContainer}
        style={{
          background: backgroundGradient,
        }}
      >
        {logo}
      </div>

      <div className={styles.headerContainer}>
        <h1>{title.toUpperCase()}</h1>
        <h1>{year}</h1>
      </div>

      <div className={styles.section}>
        <h2>{strings.technologiesLabel}</h2>
        <div className={styles.technologiesGrid}>
          {technologies.map((tech) => (
            <TechnologyItem key={tech} name={tech} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>{strings.descriptionLabel}</h2>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>

      <div className={styles.linksContainer}>
        {links.browser && (
          <ProjectLink
            type="browser"
            text={links.browser.text || strings.links.browser}
            link={links.browser.link}
          />
        )}
        {links.github && (
          <ProjectLink
            type="github"
            text={links.github.text || strings.links.github}
            link={links.github.link}
          />
        )}
        {links.wiki && (
          <ProjectLink
            type="wiki"
            text={links.wiki.text || strings.links.wiki}
            link={links.wiki.link}
          />
        )}
      </div>
    </div>
  );
};
