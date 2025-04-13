import Header from "../../Header/Header";
import { TProject } from "../../ProjectsCarousel/CarouselProject/CarouselProject";
import { ProjectsCarousel } from "../../ProjectsCarousel/ProjectsCarousel";
import { getLogo, getProjectLeftContent } from "./Projects.utils";

const clim6440KeyWordsFR = [
  "Climaticien",
  "Artisanat",
  "Identité visuelle",
  "Logo",
  "Charte graphique",
  "Design",
  "Illustration",
  "Adobe Illustrator",
  "Site vitrine",
  "WIX",
  "CMS",
  "Responsive",
  "UX",
  "UI",
  "Communication visuelle",
  "Carte de visite",
  "Flyer",
  "Supports imprimés",
  "Supports numériques",
  "Refonte graphique",
  "Branding",
  "Création de contenu",
  "Web design",
  "Présence en ligne",
  "Autonomie client",
  "Conception graphique",
  "Design système",
  "Architecture de site",
  "Accessibilité web",
  "Référencement local",
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
          text: "Consulter le site web",
          link: "https://algoforge.fr/",
        },
        github: {
          text: "Consulter le Github",
          link: "https://github.com/Bing-Chill-inc/Algoforge-main",
        },
        wiki: {
          text: "Consulter le wiki",
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
      technologies: ["ILLUSTRATOR", "WIX"],
      description:
        "Clim 64-40 est le site vitrine d’un artisan climaticien, un projet que j’ai mené en deux grandes étapes. La première partie concernait le design : création du logo et élaboration d’une charte graphique complète, avec toute la réflexion autour de l’identité visuelle de l’entreprise. J’ai ensuite appliqué cette charte aussi bien sur des supports physiques (cartes de visite, flyers) que numériques, avec la conception du site web. Comme l’objectif était que l’artisan puisse modifier son site facilement et rapidement, le choix s’est porté sur un CMS, en l’occurrence WIX.",
      links: {
        browser: {
          text: "Consulter le site web",
          link: "https://clim64-40.fr/",
        },
      },
      logo: getLogo("clim64-40"),
      primaryColor: "#CB161B",
      leftContent: getProjectLeftContent("clim64-40"),
      rightGifName: "DEMO_CLIM64-40.gif",
      keyWords: clim6440KeyWordsFR,
    },
  ];
  return (
    <main>
      <Header />
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
