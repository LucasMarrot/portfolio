import strings from "./Project.module.scss";

export type TProjectCardProps = {
  logo: string;
  title: string;
  description: string;
  colors?: { color: string; fill: string };
  fontFamily?: string;
};

export const ProjectCard = ({
  logo,
  title,
  description,
  colors = { color: "white", fill: "transparent" },
  fontFamily = "Roboto",
}: TProjectCardProps): JSX.Element => {
  return (
    <div
      className={strings.projectCard}
      style={{ color: colors.color, fill: colors.fill }}
    >
      <div
        className={strings.projectCardContent}
        dangerouslySetInnerHTML={{ __html: logo }}
      />
      <h1 className={strings.projectCardTitle} style={{ fontFamily }}>
        {title}
      </h1>
      <p className={strings.projectCardDescription}>{description}</p>
    </div>
  );
};
