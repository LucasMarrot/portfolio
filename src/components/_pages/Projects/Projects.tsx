import Header from "../../Header/Header";
import { ProjectCard } from "../../Project/Project";
import { TProject } from "../../ProjectsCarousel/CarouselProject/CarouselProject";
import { ProjectsCarousel } from "../../ProjectsCarousel/ProjectsCarousel";
import { getLogo } from "./Projects.utils";

const items = [
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
  "oklch()",
  "scroll()",
  "text-box-trim",
  "pow()",
  "@property",
  "top-layer",
  "@view-transition",
  "var()",
  "clamp()",
  "view()",
];

export default function Projects(): JSX.Element {
  const projects: TProject[] = [
    {
      id: 1,
      primaryColor: "#1c719c",
      leftContent: (
        <ProjectCard
          logo={getLogo("algoForge")}
          title={"AlgoForge"}
          description={
            "Un éditeur graphique interactif permettant de concevoir des algorithmes."
          }
          colors={{ color: "#F2F5F8", fill: "#F2F5F8" }}
          fontFamily={"Roboto"}
        />
      ),
      rightGifName: "DEMO_ALGOFORGE.gif",
      keyWords: items,
    },
    {
      id: 2,
      primaryColor: "#CB161B",
      leftContent: (
        <ProjectCard
          logo={getLogo("clim64-40")}
          title={"Clim 64-40"}
          description={
            "Un site vitrine d’un artisan climaticien permettant de découvrir ses services, ses réalisations et de le contacter."
          }
          colors={{ color: "#F4F5F6", fill: "transparent" }}
          fontFamily={"Expletus Sans"}
        />
      ),
      rightGifName: "DEMO_CLIM64-40.gif",
      keyWords: items,
    },
  ];
  return (
    <main>
      <Header />
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
