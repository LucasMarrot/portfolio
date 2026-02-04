# Architecture Overview

Ce fichier décrit la cartographie des composants et dépendances principales
du projet Portfolio (analyse initiale). Il sert de référence pour les
refactorings à venir.

Principaux modules

- `src/components/_pages` : Pages (Home, InitScene, Projects)
- `src/components/ProjectsCarousel` : Carousel de projets et sous-composants
- `src/components/Project` et `src/components/ProjectLeftContent` : affichage détaillé d'un projet
- `src/components/Robot` : scène three.js lourde
- `src/components/Lever` : interactions + effets globaux
- `src/contexts` : providers (Cursor, Scene, Language, Sound, Theme)

Dépendances critiques (haute priorité pour refactor)

- `ProjectsCarousel` -> `CarouselProject` -> `StuckGrid`, `CarouselProject/ProjectDetails`, `TechnologyItem`
- `CarouselProject` contient la logique d'animation/scroll (cible d'extraction)
- `ProjectLeftContent` utilise `getProjectData` (SVGs/paths volumineux)
- `Robot` et `Particles` sont des consommateurs de ressources (lazy-init)

Recommandations immédiates

1. Créer `tooling/dep-graph.json` (format machine-readable) — pour garder trace
   du graphe et faciliter modifications automatiques.
2. Extraire la logique métier/animation du carousel dans un hook `useCarouselProject`.
3. Isoler SVGs/actifs dans `src/assets/logos` ou composants SVG dédiés.

Fichier(s) touchés par l'analyse initiale

- `src/components/ProjectsCarousel/ProjectsCarousel.tsx`
- `src/components/ProjectsCarousel/CarouselProject/CarouselProject.tsx`

Prochaine étape

- Valide la création du graphe; après validation je génère `tooling/dep-graph.json`
  et je lance l'étape 2 (extraction du hook du carousel) sur demande.

---

Analyse faite le: 2026-01-17
