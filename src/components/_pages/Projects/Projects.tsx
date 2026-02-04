import { useMemo } from "react";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useStrings } from "../../../customHooks/useStrings";
import Header from "../../Header/Header";
import { ProjectLeftContent } from "../../ProjectLeftContent/ProjectLeftContent";
import { getLogo } from "../../ProjectLeftContent/ProjectLeftContent.utils";
import { TProject } from "../../ProjectsCarousel/CarouselProject/CarouselProject";
import { ProjectsCarousel } from "../../ProjectsCarousel/ProjectsCarousel";
import {
  brandPrimaryColor,
  brandUrl,
} from "../../ProjectsCarousel/CarouselProject/ProjectDetails/ProjectDetails";

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

const clim6440KeyWordsEN = [
  "Climatician",
  "Artisan",
  "Visual identity",
  "Logo",
  "Chart design",
  "Branding",
  "Web design",
  "Online presence",
  "Client autonomy",
  "Graphic design",
  "System design",
  "Site architecture",
  "Web accessibility",
  "Local SEO",
  "Graphic redesign",
  "Content creation",
  "Printed materials",
  "Digital materials",
  "Business card",
  "Flyer",
  "Adobe Illustrator",
  "WIX",
  "CMS",
  "Responsive",
  "UX",
  "UI",
  "Visual communication",
  "Branding",
  "Graphic design",
  "Design system",
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
  const { language } = useLanguage();
  const strings = useStrings();

  const projects: TProject[] = useMemo(
    () => [
      {
        id: 1,
        title: "AlgoForge",
        year: "2025",
        technologies: ["JS", "TS", "HTML", "CSS", "SCSS", "SVELTE", "BUN"],
        description: strings.projects.algoForge.description,
        links: {
          browser: {
            text: "Visit",
            link: brandUrl("https://algoforge.fr/"),
          },
          github: {
            text: "GitHub",
            link: brandUrl("https://github.com/Bing-Chill-inc/Algoforge-main"),
          },
          wiki: {
            text: "Wiki",
            link: brandUrl("https://bing-chill-inc.github.io/wikiforge/"),
          },
        },
        logo: getLogo("algoForge"),
        primaryColor: brandPrimaryColor("#1c719c"),
        leftContent: <ProjectLeftContent name="algoForge" />,
        rightGifName: "DEMO_ALGOFORGE.gif",
        keyWords: language === "fr" ? algoForgeKeyWordsFR : algoForgeKeyWordsEN,
      },
      {
        id: 2,
        title: "Clim 64-40",
        year: "2024",
        technologies: ["ILLUSTRATOR", "WIX"],
        description: strings.projects.clim6440.description,
        links: {
          browser: {
            text: "Visit",
            link: brandUrl("https://clim64-40.fr/"),
          },
        },
        logo: getLogo("clim64-40"),
        primaryColor: brandPrimaryColor("#CB161B"),
        leftContent: <ProjectLeftContent name="clim64-40" />,
        rightGifName: "DEMO_CLIM64-40.gif",
        keyWords: language === "fr" ? clim6440KeyWordsFR : clim6440KeyWordsEN,
      },
    ],
    [language, strings]
  );
  return (
    <main>
      <Header />
      <ProjectsCarousel projects={projects} />
    </main>
  );
}
