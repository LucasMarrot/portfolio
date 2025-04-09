import React from "react";
import styles from "./ProjectDetails.module.scss";
import { TechnologyItem } from "../TechnologyItem/TechnologyItem";
import { ProjectLink } from "../ProjectLink/ProjectLink";
import { TTechnologyNames } from "../TechnologyItem/TechnologyItem.utils";
import InteractiveObject from "../../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../../contexts/InteractiveContext";

type TProjectLinks = {
  browser?: {
    text: string;
    link: string;
  };
  github?: {
    text: string;
    link: string;
  };
  wiki?: {
    text: string;
    link: string;
  };
};

interface ProjectDetailsProps {
  title: string;
  year: string;
  technologies: TTechnologyNames[];
  description: string;
  links: TProjectLinks;
  primaryColor: string;
  projectId: number;
  logo: string;
}

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
        dangerouslySetInnerHTML={{ __html: logo }}
        className={styles.logoContainer}
        style={{
          background:
            projectId % 2 !== 0
              ? `linear-gradient(to left, ${primaryColor},var(--bg-color)) right`
              : `linear-gradient(to right, ${primaryColor},var(--bg-color)) left`,
        }}
      />

      <div className={styles.headerContainer}>
        <h1>{title}</h1>
        <h1>{year}</h1>
      </div>

      <div className={styles.section}>
        <h2>Technologies</h2>
        <div className={styles.technologiesGrid}>
          {technologies.map((tech) => (
            <TechnologyItem key={tech} name={tech} />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Description</h2>
        <div className={styles.description}>
          <p>{description}</p>
        </div>
      </div>

      <div className={styles.linksContainer}>
        {links.browser && (
          <ProjectLink
            type="browser"
            text={links.browser.text}
            link={links.browser.link}
          />
        )}
        {links.github && (
          <ProjectLink
            type="github"
            text={links.github.text}
            link={links.github.link}
          />
        )}
        {links.wiki && (
          <ProjectLink
            type="wiki"
            text={links.wiki.text}
            link={links.wiki.link}
          />
        )}
      </div>
    </div>
  );
};
