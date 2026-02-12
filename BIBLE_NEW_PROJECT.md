# 🪐 Vision du Projet : L'Odyssée Interactive

**Concept Central :**
Un portfolio narratif spatial où l'utilisateur ne "visite" pas un site web, mais voyage à travers un système solaire linéaire. Chaque planète représente un projet. Le Robot est le compagnon de voyage, l'interface et le curseur.

### 1. Navigation & Environnement

- **Le Monde :** Un espace infini (champ d'étoiles, nébuleuses légères). Pas de sol, pas de murs.
- **Le Mouvement :**
- L'utilisateur scrolle (molette/touch) pour avancer.
- La caméra suit un chemin invisible (spline) qui serpente entre les planètes.
- Effet de vitesse : Des particules filent vers la caméra lors du scroll rapide ("Warp Speed").

- **La Structure :** Un "Système Solaire Linéaire". Les planètes ne sont pas dispersées au hasard, mais placées séquentiellement le long du chemin de la caméra.

### 2. Le Robot (Cœur de l'Expérience)

- **Rôle :** Il est à la fois le guide et le curseur de la souris.
- **Comportement "Curseur" :**
- Il remplace le curseur par défaut (ou le suit de très près).
- Il flotte devant la caméra.
- **Mouvement :** Il suit la position de la souris avec une légère inertie (Smooth Damp) pour donner une impression de masse et de flottaison.
- **Orientation :** Il regarde vers la direction du mouvement de la souris ou vers les éléments interactifs.

- **Interactions Physiques :**
- **Collision :** Si le joueur déplace le robot vers des objets flottants (débris, logos), il les repousse (Répulsion Vectorielle). Ils reviennent ensuite à leur place (Effet élastique/Spring).

### 3. Les Planètes (Les Projets)

- **Visuel :**
- Pas de textures lourdes (images).
- Utilisation de **Shaders Procéduraux** : Un algorithme mélange 2 couleurs définies (ex: Bleu/Blanc pour React) pour créer des surfaces uniques (cratères, nuages, atmosphère) à la volée.

- **L'Orbite :**
- Chaque planète est entourée d'objets 3D flottants (satellites) : Logos des technos utilisées, formes géométriques, nom du projet en 3D.
- Ces objets sont interactifs (le robot peut les bousculer).

- **Le "Snap" :** Quand on arrive à hauteur d'une planète, le scroll ralentit/se magnétise pour stabiliser la vue face à elle.

### 4. Communication & HUD (L'Interface Vivante)

- **Console du Robot :**
- Située en **bas à gauche** de l'écran (fixe).
- **Style :** Interface Sci-Fi technique (bords fins, données qui défilent).
- **Feedback :** Une petite LED clignote et une onde sonore s'anime quand le robot "parle".
- **Texte :** Le robot commente le voyage ou donne des infos contextuelles via cette console (effet machine à écrire).

### 5. L'Affichage des Détails (Séquence de Connexion)

- **Déclencheur :** L'utilisateur clique sur une planète.
- **La Séquence :**

1. **Lock :** La navigation se bloque.
2. **Connexion :** Le robot s'anime (feedback visuel/sonore), il "scanne" ou se connecte à la planète.
3. **Loading :** La console du robot affiche "Chargement des données... Connexion établie".
4. **L'Écran (Le Reveal) :**

- Un **Grand Écran Moniteur** monte du bas de l'écran vers le haut (animation style _Five Nights at Freddy's_ - tablette de sécurité).
- Il prend la quasi-totalité de la vue (overlay).

- **Style de l'Écran :**
- Rétro-Futuriste (Années 80/Space Opera).
- Effet **CRT** (Cathodique) : Légère courbure, scanlines (lignes de balayage), scintillement, teinte légèrement ambrée ou verte.

- **Contenu :** Vidéo de démo, description complète, stack technique, liens GitHub/Live.

- **Fermeture :** Un clic sur un bouton "Fermer" ou "Déconnexion" fait redescendre l'écran vers le bas. Le voyage reprend.

C'est noté. L'audio est souvent le "parent pauvre" du web, alors que c'est 50% de l'immersion. Avec ce que tu ajoutes (ambiance sonore complète + panneau de configuration système), on atteint un niveau de finition "Jeu Vidéo AA".

Voici l'intégration de ces nouveaux éléments dans notre **Vision Définitive**.

---

### 🎵 Design Sonore & Ambiance (L'Audio-Scaping)

Nous allons superposer des couches sonores (Layering) pour créer de la profondeur, gérées par une librairie audio robuste (je recommande **Howler.js** pour la gestion des sprites audio et du mixage).

**1. La Couche de Fond (Ambiance)**

- **Musique :** Ta piste "BackgroundMusicByLidrima" (boucle infinie).
- **Atmosphère (Drone) :** Un son très grave et subtil de "vide spatial" ou de "moteur au ralenti" pour ne pas avoir de silence total si la musique est coupée.

**2. Les Effets Robotiques (Character Design)**

- **Mouvement :** Léger _Huuuum_ de servomoteur (pitch modulé) quand le robot accélère pour suivre la souris.
- **Voix :** Bruitages "Bip-boup-bip" numériques (style R2D2 ou Animal Crossing) synchronisés avec l'apparition du texte dans la console.
- **Interaction :** Un son "joyeux" (montée de gamme) quand il cogne un objet, un son "interrogatif" quand on clique sur une planète.

**3. Les Effets d'Interface (UI SFX)**

- **Hover (Survol) :** Petit _Tchirp_ électronique haute fréquence (très court).
- **Click (Activation) :** Bruit mécanique lourd et satisfaisant (style bouton de cockpit d'avion ou clavier mécanique).
- **Ouverture Écran (Projet) :**
- Son de charge électrique (montée de tension).
- _Thump_ sourd quand l'écran se verrouille en place.
- Grésillement statique léger (bruit blanc) continu tant que l'écran CRT est ouvert.

**4. Les Effets de Voyage (Navigation)**

- **Scroll Lent :** Rien ou vent léger.
- **Scroll Rapide (Warp) :** Son de propulsion _Whoosh_ qui passe de gauche à droite (stéréo) pour accentuer la vitesse.
- **Snap Planète :** Son de freins hydrauliques (Pschhhht) quand la caméra se stabilise devant un projet.

---

### ⚙️ Le Menu Système (La Console de Réglages)

Tu as raison, sur un projet 3D, les réglages sont **critiques** pour l'accessibilité et la performance.

**L'Accès :**
Un bouton "Engrenage" ou "SYSTEM" clignotant discrètement dans le HUD du Robot (en bas à gauche).

**L'Interface :**
Une fenêtre modale style "BIOS" ou "Diagnostic Système" qui s'ouvre par-dessus tout (pause le rendu 3D en arrière-plan pour économiser les ressources).

**Les Réglages Disponibles :**

1. **Audio (Mixer) :**

- Slider "Musique" (0-100%).
- Slider "Effets Sonores" (0-100%).
- Toggle "Mute All".

2. **Affichage (Performance) :**

- **Mode "Éco-Énergie" (Low Spec) :**
- Désactive le Post-Processing (Bloom, Depth of Field).
- Réduit la résolution du canvas (`dpr={1}`).
- Simplifie les shaders des planètes.
- _Ce mode peut être activé automatiquement si on détecte un FPS trop bas._

- **Mode "Cinématique" (High Spec) :** Tout à fond.

3. **Général :**

- Langue (FR / EN).
- Réinitialiser la visite (Oublier que je suis déjà venu -> Reset Robot Memory).
