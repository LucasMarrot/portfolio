import Header from "../../Header/Header";
import { TProject } from "../../ProjectsCarousel/CarouselProject/CarouselProject";
import { ProjectsCarousel } from "../../ProjectsCarousel/ProjectsCarousel";

export default function Projects(): JSX.Element {
  const projects: TProject[] = [
    {
      id: "1",
      backgroundColor: "#1e2824",
      content: <h1 className="text-4xl font-bold">Projet 1</h1>,
    },
    {
      id: "2",
      backgroundColor: "#5d3c18",
      content: <h1 className="text-4xl font-bold">Projet 2</h1>,
    },
    {
      id: "3",
      backgroundColor: "#230000",
      content: <h1 className="text-4xl font-bold">Projet 3</h1>,
    },
  ];
  return (
    <main>
      <Header />
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
