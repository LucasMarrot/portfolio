import Header from "../../Header/Header";
import { TProject } from "../../ProjectsCarousel/CarouselProject/CarouselProject";
import { ProjectsCarousel } from "../../ProjectsCarousel/ProjectsCarousel";
import { getLogo, getProjectLeftContent } from "./Projects.utils";

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

const algoForgeKeyWordsFR = [
  "application",
  "web",
  "gratuite",
  "open source",
  "algorithmes",
  "étudiants",
  "simplicité",
  "rapidité",
  "IUT",
  "Bayonne",
  "formalisme",
  "dynamique",
  "export",
  "raccourcis",
  "collaboratif",
  "éco-responsabilité",
  "performance",
  "Jokin",
  "JS",
  "TS",
  "HTML",
  "CSS",
  "SCSS",
  "Svelte",
  "Bun",
  "accessibilité",
  "design",
  "développement",
  "GitHub",
  "projet",
];

const algoForgeKeyWordsEN = [
  "application",
  "web",
  "free",
  "open source",
  "algorithms",
  "students",
  "simplicity",
  "speed",
  "IUT",
  "Bayonne",
  "formalism",
  "dynamic",
  "export",
  "shortcuts",
  "collaborative",
  "eco-responsibility",
  "performance",
  "education",
  "JS",
  "TS",
  "HTML",
  "CSS",
  "SCSS",
  "Svelte",
  "Bun",
  "accessibility",
  "design",
  "development",
  "GitHub",
  "project",
];

export default function Projects(): JSX.Element {
  const projects: TProject[] = [
    {
      id: 1,
      title: "AlgoForge",
      year: "2025",
      technologies: ["JS", "TS", "HTML", "CSS", "SCSS", "SVELTE", "BUN"],
      description:
        "AlgoForge est une application web gratuite et open source de conception d'algorithmes, pensée par et pour les étudiants. Elle se distingue par sa simplicité, sa rapidité, et son respect du formalisme de l'IUT de Bayonne. Accessible depuis n'importe quel appareil, elle propose une interface dynamique, un rendu fidèle à l'export, des raccourcis pratiques, et des fonctionnalités collaboratives. Nous avons misé sur l'éco-responsabilité et la performance, guidant le choix de nos technologies et de notre approche.",
      links: {
        browser: {
          text: "Algoforge site web",
          link: "https://algoforge.fr/",
        },
        github: {
          text: "Algoforge github",
          link: "https://github.com/Bing-Chill-inc/Algoforge-main",
        },
        wiki: {
          text: "Algoforge wiki",
          link: "https://bing-chill-inc.github.io/wikiforge/",
        },
      },
      logo: getLogo("algoForge"),
      primaryColor: "#1c719c",
      leftContent: getProjectLeftContent("algoForge"),
      rightGifName: "DEMO_ALGOFORGE.gif",
      keyWords: algoForgeKeyWordsFR,
    },
    {
      id: 2,
      title: "Clim 64-40",
      year: "2024",
      technologies: [],
      description: "",
      links: {},
      logo: getLogo("clim64-40"),
      primaryColor: "#CB161B",
      leftContent: getProjectLeftContent("clim64-40"),
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
