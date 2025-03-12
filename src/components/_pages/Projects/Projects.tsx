import Header from "../../Header/Header";
import {
  ProjectCarousel,
  TProject,
} from "../../ProjectCarousel/ProjectCarousel";

export default function Projects(): JSX.Element {
  const projects: TProject[] = [
    {
      id: "1",
      backgroundColor: "#ffadad",
      content: <h1 className="text-4xl font-bold">Projet 1</h1>,
    },
    {
      id: "2",
      backgroundColor: "#ffd6a5",
      content: <h1 className="text-4xl font-bold">Projet 2</h1>,
    },
    {
      id: "3",
      backgroundColor: "#fdffb6",
      content: <h1 className="text-4xl font-bold">Projet 3</h1>,
    },
  ];
  return (
    <main>
      <Header />
      <ProjectCarousel projects={projects} />
    </main>
  );
}
