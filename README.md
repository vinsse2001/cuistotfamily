# 🧑‍🍳 CuistotFamily

Application web pour gérer, consulter, imprimer et enrichir des recettes de cuisine familiales — avec une touche d’IA.

## ✨ Objectif

Proposer une application simple, pratique et responsive permettant :
- la **saisie rapide** de recettes de cuisine (titre, ingrédients, instructions, image),
- la **consultation agréable** des recettes depuis un navigateur ou un mobile,
- une **impression propre** sur une seule page A4 (format fiche cuisine),
- et l’ajout d’un bouton pour **obtenir une estimation nutritionnelle intelligente**, grâce à un appel IA.

## 🔧 Fonctionnalités prévues (par étapes)

### 1. MVP local (Angular seul)
- [ ] Saisie d’une recette via formulaire.
- [ ] Affichage sous forme de carte (image + liste ingrédients + instructions).
- [ ] Responsive design (Bootstrap).
- [ ] Impression A4 optimisée (`@media print`).
- [ ] Stockage local temporaire (localStorage ou IndexedDB).
- [ ] Export/import de recettes (JSON).

### 2. IA Nutrition intégrée – LIA 🤖
Nouvelle fonctionnalité : ajout d’une assistante virtuelle (LIA) pour estimer les apports nutritionnels d'une recette via IA.

- [ ] Ajout d’un bouton “Demander à LIA” à côté des recettes.
- [ ] Appel à une API (OpenAI ou autre) avec la liste d’ingrédients.
- [ ] Affichage des informations nutritionnelles estimées (calories, macro-nutriments).
- [ ] Mise en cache locale pour éviter les appels inutiles.

🔧 Exemple de prompt :
> Voici les ingrédients d'une recette (avec quantités) : [...]. Estime les apports nutritionnels (calories, protéines, glucides, lipides) par portion.

🎯 Objectif : valorisation technique (expérience IA/API), simplification du calcul nutritionnel sans base de données type Ciqual.

### 3. Backend complet (NestJS + PostgreSQL)
- [ ] Création du backend NestJS (hébergé chez o2switch).
- [ ] Stockage des recettes et profils utilisateurs dans PostgreSQL.
- [ ] Authentification minimale (email + mot de passe).
- [ ] Endpoints REST : `/api/recettes`, `/api/lia`, `/api/profil`, etc.

### 4. Connexion front ↔ back
- [ ] Intégration des services Angular pour appeler le backend.
- [ ] Sauvegarde et chargement des recettes depuis la base.
- [ ] Authentification sur le frontend.

### 5. Déploiement & partage
- [ ] Déploiement sur hébergement mutualisé o2switch.
- [ ] Accès privé ou public selon les recettes.
- [ ] Domain personnalisé éventuel.

### 6. Bonus
- [ ] Catégories / filtres / favoris.
- [ ] Impression en lot (livret PDF).
- [ ] Ajout de vidéos ou étapes photo.
- [ ] Suggestions de recettes (via IA ?).
- [ ] OCR des ingrédients à partir d’une photo (idée exploratoire).

## 📁 Stack technique

| Élément            | Choix retenu           |
|--------------------|------------------------|
| Frontend           | Angular (dernière version) |
| Design             | Bootstrap              |
| Backend            | NestJS                 |
| Base de données    | PostgreSQL             |
| Déploiement        | Hébergement mutualisé (o2switch) |
| IA nutritionnelle  | OpenAI ou modèle local via API NestJS |

## 🔄 Stratégie de développement

Le développement se fait **fonction par fonction**, dans un souci de clarté et de maintenabilité.  
Chaque nouvelle fonctionnalité est abordée dans un chat séparé, avec rappel du lien vers ce README à jour.

## 📎 Infos supps

- [README GitHub en ligne](https://github.com/vinsse2001/cuistotfamily/blob/main/README.md)
- ([NestJS sur o2switch](https://faq.o2switch.fr/hebergement-mutualise/tutoriels-cpanel/app-nodejs))
- Projet initié par Vincent (architecte technique, projet personnel & démonstrateur compétences IA)
- Le dossier `_archives` contient un **premier test de développement** effectué avec ChatGPT. Il **n'est pas à prendre en compte** pour le développement actuel du projet. Ce dossier est conservé à titre de référence uniquement.


---

*Bon appétit avec CuistotFamily ! 🍽️*
