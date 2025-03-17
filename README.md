# CuistotFamily.fr - Application de Gestion de Recettes de Cuisine

## Fonctionnalités Globales

### Frontend
- **Framework** : Angular avec Bootstrap pour une interface responsive et conviviale.
- **Thèmes** : Mode clair, sombre et contrasté (respect des normes d'accessibilité).
- **Design** : Prévoir une structure facilement convertible en application mobile dans le futur.

### Backend
- **Technologie** : Nest.js avec Express.
- **Base de données** : PostgreSQL + TypeORM (intégré avec NetsJS).

### Déploiement
- Hébergement sur **o2switch**.
- Code source disponible sur un **repository Git public** : https://github.com/vinsse2001/cuistotfamily.

---

## Liste des Fonctionnalités

### Priorité 1 : Fonctionnalités de Base
1. **Consultation des Recettes** :
   - Affichage des recettes par photo.
   - Aperçu au survol de la photo.
   - Détails de la recette au clic (titre, description, ingrédients, étapes, etc.).
2. **Filtrage des Recettes** :
   - Par utilisateur (recettes ajoutées par soi-même).
   - Par favoris.
   - Par mot-clé (dans le titre, la description ou les ingrédients).
3. **Création de Recettes** :
   - Titre, sous-titre (optionnel), durée (optionnel), prix (optionnel), difficulté (optionnel).
   - Ajout d'une ou plusieurs images (taille automatiquement réduite pour le web/mobile).
   - Liste d'ingrédients (choix dans une liste prédéfinie ou ajout manuel).
   - Étapes de la recette.
4. **Gestion des Utilisateurs** :
   - Création de compte (vérification par e-mail).
   - Pseudo (avec espaces autorisés), description (optionnelle).
   - Modification du pseudo, de la description et de l'e-mail (reconfirmation).
   - Suppression ou désactivation du compte (les recettes restent accessibles).
5. **Recherche** :
   - Recherche dynamique après saisie d'un nom ou d'un ingrédient (avec temporisation).
   - Filtres multiples (tags, utilisateur, ingrédient).

---

### Priorité 2 : Fonctionnalités Avancées
6. **Nutrition** :
   - Informations nutritionnelles basées sur la base de données **CIQUAL**.
   - Affichage synthétique des nutriments (optionnel).
7. **Partage** :
   - Partage d'une recette ou de toutes ses recettes.
   - Partage vers un groupe d'utilisateurs (ex : "famille", "amis").
8. **Modification et Suppression** :
   - Modification d'une recette (créateur original ou copie modifiée).
   - Suppression d'une recette (pour tous ou masquage pour soi).
9. **Favoris et Notation** :
   - Ajout d'une recette aux favoris.
   - Notation d'une recette (affichage de sa note personnelle ou de la moyenne des utilisateurs).
10. **Impression** :
    - Format propre pour l'impression (1 page).
    - Ajout du nom du site, de la version de la recette et de l'auteur original.

---

### Priorité 3 : Fonctionnalités Optionnelles
11. **Page d'Accueil** :
    - Gros boutons pour accéder aux fonctionnalités principales.
    - Proposition d'une recette aléatoire (optionnel).
12. **Chrono** :
    - Chronomètre pour mesurer le temps de réalisation d'une recette.
    - Calcul de la moyenne du temps (personnel ou global).
13. **Tags et Menus** :
    - Ajout de tags pour catégoriser les recettes (ex : entrée, plat, dessert).
    - Création de menus personnalisés (ex : menu végétarien).
14. **Liens Externes** :
    - Ajout de liens vers des sources externes (sites, livres).
15. **Personnalisation** :
    - Renommer un utilisateur (ex : "Odette" → "mamie Dedette").
    - Ajout d'une photo de profil.
16. **Publicité** :
    - Page "Je veux de la pub !" pour afficher des publicités (uniquement sur demande).
17. **Dons** :
    - Possibilité de faire un don à l'auteur (non prioritaire).

---

## Plan de Développement

### Étape 1 : Configuration Initiale
1. **Créer le Repository Git** :
   - Initialiser un repo Git et ajouter un fichier `README.md` avec la liste des fonctionnalités.
   - **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux initialiser le projet avec un fichier `README.md` contenant la liste des fonctionnalités."

2. **Configurer l'Environnement de Développement** :
   - Installer Node.js, Angular CLI, et NestJS CLI.
   - Configurer PostgreSQL localement.
   - **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux configurer l'environnement de développement (Node.js, Angular, NestJS, PostgreSQL)."

---

### Étape 2 : Développement des Fonctionnalités de Base

#### Tâche 1 : API Backend pour les Recettes (CRUD)
- **Objectif** : Créer les endpoints pour la gestion des recettes (création, lecture, mise à jour, suppression).
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer l'API backend pour la gestion des recettes (CRUD)."

#### Tâche 2 : Page Frontend pour Afficher les Recettes
- **Objectif** : Créer une page Angular pour afficher la liste des recettes.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer une page frontend pour afficher la liste des recettes."

#### Tâche 3 : Formulaire de Création/Édition de Recettes
- **Objectif** : Créer un formulaire Angular pour ajouter ou modifier une recette.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer un formulaire frontend pour créer et éditer des recettes."

#### Tâche 4 : Gestion des Utilisateurs (Inscription, Connexion)
- **Objectif** : Implémenter l'authentification et la gestion des utilisateurs.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer la gestion des utilisateurs (inscription, connexion)."

---

### Étape 3 : Fonctionnalités Avancées

#### Tâche 5 : Recherche et Filtrage des Recettes
- **Objectif** : Implémenter la recherche dynamique et les filtres (par utilisateur, favoris, mot-clé).
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer la fonctionnalité de recherche et de filtrage des recettes."

#### Tâche 6 : Informations Nutritionnelles
- **Objectif** : Intégrer les données CIQUAL et afficher les informations nutritionnelles.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux intégrer les informations nutritionnelles basées sur CIQUAL."

#### Tâche 7 : Partage et Impression des Recettes
- **Objectif** : Implémenter le partage et l'impression des recettes.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer le partage et l'impression des recettes."

#### Tâche 8 : Notation et Favoris
- **Objectif** : Ajouter la notation des recettes et la gestion des favoris.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux implémenter la notation des recettes et la gestion des favoris."

---

### Étape 4 : Fonctionnalités Optionnelles

#### Tâche 9 : Chronomètre pour les Recettes
- **Objectif** : Ajouter un chronomètre pour mesurer le temps de réalisation.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer un chronomètre pour les recettes."

#### Tâche 10 : Gestion des Tags et Menus
- **Objectif** : Implémenter les tags pour catégoriser les recettes et créer des menus.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux développer la gestion des tags et des menus."

#### Tâche 11 : Publicité et Dons
- **Objectif** : Ajouter une page de publicité et une fonctionnalité de dons.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux implémenter la page de publicité et la fonctionnalité de dons."

---

### Étape 5 : Déploiement

#### Tâche 12 : Déployer sur o2switch
- **Objectif** : Configurer le déploiement du backend et du frontend sur o2switch.
- **Instruction pour un nouveau chat** : "Voici le repo Git : [lien]. Je veux déployer l'application sur o2switch."
