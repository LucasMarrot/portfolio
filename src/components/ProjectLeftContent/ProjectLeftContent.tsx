import { ProjectCard } from "../Project/Project";
import { useStrings } from "../../customHooks/useStrings";
import { getProjectData } from "./ProjectLeftContent.utils";
import { TProjectName } from "./ProjectLeftContent.types";

type TProjectLeftContentProps = {
  name: TProjectName;
};

export const ProjectLeftContent = ({
  name,
}: TProjectLeftContentProps): JSX.Element => {
  const strings = useStrings();
  const projectData = getProjectData(name, strings);

  return (
    <ProjectCard
      logo={projectData.logo}
      title={projectData.title}
      description={projectData.description}
      colors={projectData.colors}
      fontFamily={projectData.fontFamily}
    />
  );
};
