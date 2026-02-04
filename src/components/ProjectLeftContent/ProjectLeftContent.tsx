import React, { useMemo } from "react";
import { ProjectCard } from "../Project/Project";
import { useStrings } from "../../customHooks/useStrings";
import { getProjectData } from "./ProjectLeftContent.utils";
import { TProjectName } from "./ProjectLeftContent.types";

type TProjectLeftContentProps = {
  readonly name: TProjectName;
};

export const ProjectLeftContent = React.memo(
  ({ name }: TProjectLeftContentProps): JSX.Element => {
    const strings = useStrings();

    const projectData = useMemo(
      () => getProjectData(name, strings),
      [name, strings]
    );

    return (
      <ProjectCard
        logo={projectData.logo}
        title={projectData.title}
        description={projectData.description}
        colors={projectData.colors}
        fontFamily={projectData.fontFamily}
      />
    );
  }
);

ProjectLeftContent.displayName = "ProjectLeftContent";
