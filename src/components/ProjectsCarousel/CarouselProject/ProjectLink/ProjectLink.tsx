import { getLinkIcon, TLinkIcon } from "./ProjectLink.utils";
import styles from "./ProjectLink.module.scss";
import InteractiveObject from "../../../_commons/InteractiveObject/InteractiveObject";
import { InteractiveType } from "../../../../contexts/InteractiveContext";

type TProjectLinkProps = {
  type: TLinkIcon;
  text: string;
  link: string;
};

export const ProjectLink = ({
  type,
  text,
  link,
}: TProjectLinkProps): JSX.Element => {
  return (
    <InteractiveObject type={InteractiveType.CLICK}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.projectLink}
      >
        <div className={styles.projectLinkContainer}>
          <div
            dangerouslySetInnerHTML={{
              __html: getLinkIcon(type),
            }}
            className={styles.logo}
          />
          <h3>{text}</h3>
        </div>
      </a>
    </InteractiveObject>
  );
};
