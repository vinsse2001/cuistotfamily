# CuistotFamily - Gestion de Recettes de Cuisine

## Table des Matières
1. [Description du Projet](#description-du-projet)
2. [Fonctionnalités](#fonctionnalités)
3. [Technologies Utilisées](#technologies-utilisées)
4. [Ordre de Développement](#ordre-de-développement)
5. [Détail des Étapes](#détail-des-étapes)
6. [Contraintes Techniques](#contraintes-techniques)
7. [Instructions pour un Nouveau Chat](#instructions-pour-un-nouveau-chat)
8. [Contribuer](#contribuer)

---

## Description du Projet
**CuistotFamily** est une application web permettant de gérer des recettes de cuisine. Elle offre des fonctionnalités pour créer, consulter, modifier et partager des recettes, ainsi que pour calculer les informations nutritionnelles basées sur la base de données **CIQUAL**. L'application est conçue pour être **responsive**, **conviviale** et **accessible**.

### Note sur le Dossier `_archives`
Le dossier `_archives` contient un **premier test de développement** effectué avec ChatGPT. Il **n'est pas à prendre en compte** pour le développement actuel du projet. Ce dossier est conservé à titre de référence uniquement.

---

## Fonctionnalités
### Fonctionnalités de Base
- **Gestion des Recettes** :
  - Création, édition, suppression de recettes.
  - Affichage des recettes avec photos, ingrédients et étapes.
  - Filtrage des recettes par utilisateur, favoris ou mot-clé.
- **Gestion des Utilisateurs** :
  - Inscription, connexion, gestion du profil.
  - Modification du pseudo, de la description et de l'e-mail.
- **Recherche** :
  - Recherche dynamique par nom, ingrédient ou tag.

### Fonctionnalités Avancées
- **Informations Nutritionnelles** :
  - Calcul des valeurs nutritionnelles basé sur les ingrédients et les quantités.
  - Affichage synthétique des nutriments (calories, protéines, glucides, etc.).
- **Partage et Impression** :
  - Partage d'une recette ou de toutes ses recettes.
  - Impression des recettes avec un format propre.
- **Notation et Favoris** :
  - Notation des recettes.
  - Ajout de recettes aux favoris.

### Fonctionnalités Optionnelles
- **Chronomètre** :
  - Mesure du temps de réalisation d'une recette.
- **Gestion des Tags et Menus** :
  - Catégorisation des recettes par tags (ex : entrée, plat, dessert).
  - Création de menus personnalisés.
- **Publicité et Dons** :
  - Page de publicité (uniquement sur demande).
  - Fonctionnalité de dons.

---

## Technologies Utilisées
### Frontend
- **Framework** : Angular
- **CSS Framework** : Bootstrap
- **Langage** : TypeScript

### Backend
- **Framework** : NestJS
- **Langage** : TypeScript
- **Base de Données** : PostgreSQL
- **ORM** : TypeORM

### Conversion Mobile
- **Frameworks Compatibles** : Ionic, NativeScript
- **Objectif** : Préparer l'application pour une future conversion en application mobile.

### Déploiement
- **Hébergement** : o2switch
- **Gestion de Version** : Git (GitHub)

---

## Ordre de Développement
Le développement est divisé en **étapes claires et indépendantes**, chacune pouvant être développée dans un nouveau chat. Voici l'ordre des étapes :

1. **Configuration Initiale**
2. **Définir le Visuel d'une Recette**
3. **Créer le Schéma de Base de Données**
4. **Importer les Données CIQUAL**
5. **API Backend pour les Recettes (CRUD)**
6. **Page Frontend pour Afficher les Recettes**
7. **Formulaire de Création/Édition de Recettes**
8. **Gestion des Utilisateurs (Inscription, Connexion)**
9. **Recherche et Filtrage des Recettes**
10. **Partage et Impression des Recettes**
11. **Notation et Favoris**
12. **Chronomètre pour les Recettes**
13. **Gestion des Tags et Menus**
14. **Publicité et Dons**
15. **Déployer sur o2switch**

---

## Détail des Étapes
### Étape 1 : Configuration Initiale
- **Objectif** : Configurer l'environnement de développement.
- **Tâches** :
  - Installer Node.js, Angular CLI, NestJS CLI.
  - Configurer PostgreSQL localement.
  - Initialiser le repository Git.

### Étape 2 : Définir le Visuel d'une Recette
- **Objectif** : Créer une maquette HTML/CSS pour afficher une recette.
- **Tâches** :
  - Identifier les champs nécessaires (titre, sous-titre, ingrédients, étapes, informations nutritionnelles).
  - Créer une maquette responsive.
  - Tester la maquette sur des résolutions mobiles.

### Étape 3 : Créer le Schéma de Base de Données
- **Objectif** : Définir les tables et relations pour les recettes, les ingrédients et les utilisateurs.
- **Tâches** :
  - Créer les tables `recipes`, `ingredients`, `users`, `recipe_ingredients`.
  - Ajouter les champs pour les informations nutritionnelles.

### Étape 4 : Importer les Données CIQUAL
- **Objectif** : Intégrer les données CIQUAL dans la base de données.
- **Tâches** :
  - Convertir le fichier Excel CIQUAL en CSV ou JSON.
  - Importer les données dans la table `ingredients`.

### Étape 5 : API Backend pour les Recettes (CRUD)
- **Objectif** : Développer les endpoints pour la gestion des recettes.
- **Tâches** :
  - Créer les endpoints CRUD pour les recettes.
  - Implémenter la logique de calcul des informations nutritionnelles.

### Étape 6 : Page Frontend pour Afficher les Recettes
- **Objectif** : Créer une page Angular pour afficher la liste des recettes.
- **Tâches** :
  - Afficher les recettes avec photos, titres et aperçus.
  - Intégrer les informations nutritionnelles.
  - Utiliser des composants Angular réutilisables.
  - Tester l'affichage sur mobile.

### Étape 7 : Formulaire de Création/Édition de Recettes
- **Objectif** : Créer un formulaire (compatible avec les écrans tactiles) pour ajouter ou modifier des recettes.
- **Tâches** :
  - Ajouter des champs pour les ingrédients et les quantités.
  - Valider les données avant enregistrement.
  - Utiliser des champs de formulaire compatibles avec les appareils mobiles.
  - Tester le formulaire sur mobile.

### Étape 8 : Gestion des Utilisateurs (Inscription, Connexion)
- **Objectif** : Implémenter l'authentification et la gestion des utilisateurs.
- **Tâches** :
  - Créer les endpoints pour l'inscription et la connexion.
  - Gérer les sessions utilisateur.

### Étape 9 : Recherche et Filtrage des Recettes
- **Objectif** : Implémenter la recherche dynamique et les filtres.
- **Tâches** :
  - Ajouter une barre de recherche.
  - Implémenter les filtres par utilisateur, favoris et tags.

### Étape 10 : Partage et Impression des Recettes
- **Objectif** : Permettre le partage et l'impression des recettes.
- **Tâches** :
  - Ajouter des boutons de partage (lien, réseaux sociaux).
  - Créer un format d'impression propre.

### Étape 11 : Notation et Favoris
- **Objectif** : Ajouter la notation des recettes et la gestion des favoris.
- **Tâches** :
  - Créer les endpoints pour noter une recette.
  - Ajouter une fonctionnalité de favoris.

### Étape 12 : Chronomètre pour les Recettes
- **Objectif** : Ajouter un chronomètre pour mesurer le temps de réalisation.
- **Tâches** :
  - Implémenter un chronomètre interactif.
  - Enregistrer et afficher les temps de réalisation.

### Étape 13 : Gestion des Tags et Menus
- **Objectif** : Catégoriser les recettes et créer des menus.
- **Tâches** :
  - Ajouter des tags aux recettes (ex : entrée, plat, dessert).
  - Permettre la création de menus personnalisés.

### Étape 14 : Publicité et Dons
- **Objectif** : Ajouter une page de publicité et une fonctionnalité de dons.
- **Tâches** :
  - Créer une page "Je veux de la pub !".
  - Implémenter une fonctionnalité de dons.

### Étape 15 : Déployer sur o2switch
- **Objectif** : Configurer le déploiement du backend et du frontend.
- **Tâches** :
  - Configurer PostgreSQL sur o2switch.
  - Déployer l'application avec un serveur Node.js.

### Étape 16 : Tester la Compatibilité Mobile
- **Objectif** : Préparer l'application pour une conversion en application mobile.
- **Tâches** :
  - Tester l'application sur des résolutions mobiles.
  - Adapter la navigation pour les écrans tactiles.
  - Vérifier la performance sur des appareils mobiles.
  
---

## Contraintes Techniques
- **Modularité** : Chaque fonctionnalité doit être développée de manière indépendante.
- **Validation des Données** : Valider les entrées utilisateur côté frontend et backend.
- **Sécurité** : Protéger l'application contre les attaques courantes (ex : injections SQL, CSRF).
- **Tests** : Écrire des tests unitaires et d'intégration.
- **Documentation** : Documenter le code et les APIs.
- **Compatibilité Mobile** :
  - Utiliser des composants Angular réutilisables.
  - Tester l'application sur des résolutions mobiles.
  - Prévoir une navigation adaptée aux écrans tactiles.

---

## Instructions pour un Nouveau Chat
Pour chaque nouvelle conversation, fournissez :
1. **Lien du repo Git** : Pour que je puisse voir le code existant.
2. **Étape en Cours** : Par exemple, "Nous en sommes à l'étape 5 : API Backend pour les Recettes (CRUD)."
3. **Objectif de la Tâche** : Par exemple, "Je veux développer les endpoints CRUD pour les recettes."

Exemple :
- "Voici le repo Git : [lien]. Nous en sommes à l'étape 5. Je veux développer les endpoints CRUD pour les recettes."

---

## Contribuer
- **Signaler un Problème** : Ouvrir une issue sur GitHub.
- **Proposer une Amélioration** : Soumettre une pull request.
