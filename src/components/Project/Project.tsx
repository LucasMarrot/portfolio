import styles from "./Project.module.scss";
import {
  TProjectColors,
  TFontFamily,
  brandColorHex,
  brandFontFamily,
} from "../ProjectLeftContent/ProjectLeftContent.types";

export type TProjectCardProps = {
  logo: JSX.Element;
  title: string;
  description: string;
  colors?: TProjectColors;
  fontFamily?: TFontFamily;
};

export const ProjectCard = ({
  logo,
  title,
  description,
  colors = {
    color: brandColorHex("white"),
    fill: brandColorHex("transparent"),
  },
  fontFamily = brandFontFamily("Roboto"),
}: TProjectCardProps): JSX.Element => {
  return (
    <div
      className={styles.projectCard}
      style={{ color: colors.color, fill: colors.fill }}
    >
      <div className={styles.projectCardContent}>{logo}</div>
      <h1 className={styles.projectCardTitle} style={{ fontFamily }}>
        {title}
      </h1>
      <p className={styles.projectCardDescription}>{description}</p>
    </div>
  );
};
