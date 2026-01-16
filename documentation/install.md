# Notes d'installation
## Prompt initial
### Proposé à Gemini
Je souhaite créer une application web responsive de recettes de cuisine collaborative nommée "Cuistot Family", optimisée pour mobile (approche Mobile-First / PWA).

ARCHITECTURE TECHNIQUE :
- Frontend : Angular (Standalone Components, Signals, Tailwind CSS)
- Backend : NestJS (TypeScript + TypeORM)
- Base de Données : PostgreSQL
- Environnement de développement : WSL (Ubuntu) sur Windows 10, avec l'IDE Visual Studio (+ remote WSL)
- Hébergeur : o2switch
- un seul repository https://github.com/vinsse2001/cuistotfamily/ contenant 2 sous-dossiers cuistot-family-client et cuistot-family-api

FONCTIONNALITÉS CLES :
- Gestion des Recettes (CRUD) : Titre, Description, Photo URL, Ingrédients, Instructions.
- Impression des recettes (PDF en 1 page maximum)
- Authentification : Inscription (avec modération administrateur)/Connexion/Invitation, recettes privées par défaut.
- Collaboration (Fork) : Si l'utilisateur B modifie une recette partagée par l'utilisateur A, une nouvelle version est créée pour B sans modifier l'originale de A.
- Social : Pas de commentaires, mais des notes et des favoris. Partage par cercles (privé, amis, public).
- IA : Analyse nutritionnelle (pouvant s'appuyer par ex sur les données CIQUAL ; une fois la recette analysée, les informations seront à enregistrer dans la recette, pour éviter un nouvel appel inutile par la suite).
- IA : Cette fonctionnalité sera présentée sous la forme d'une assistante virtuelle, nommée "Lia". Elle pourra aussi répondre à des questions plus variées.
- Renommage Privé : Possibilité de renommer un utilisateur pour son propre affichage (ex: "Odette" devient "Mamie Dedette").
- Quantités Dynamiques : Ingrédients ajustables selon le nombre de convives.
- Accessibilité : Thèmes clair, sombre et contrasté.

MÉTHODOLOGIE : Je souhaite travailler de manière très itérative. Pour chaque étape :
1) Donne-moi des instructions très courtes et concises.
2) Ne détaille pas trop d'actions à la fois pour que je puisse valider chaque point et t'interroger en cas d'imprévu.
3) Utilise le Canvas pour les fichiers de code.

ROADMAP DU PROJET :
Étape 1 : Vérification environnement WSL et initialisation des dossiers.
Étape 2 : CRUD Recettes simple (Affichage, Création, Modification, Suppression).
Étape 3 : Authentification (JWT) et gestion des profils.
Étape 4 : Système de "Fork" (une recette partagée modifiée par un tiers devient une copie personnelle).
Étape 5 : Analyse nutritionnelle via une API.

DEMANDE INITIALE : Commençons par l'Étape 1. Donne-moi uniquement les commandes pour vérifier mon environnement WSL (Node v20+, Nest CLI, Angular CLI, Postgres) et les commandes pour créer les deux dossiers projets (frontend et backend) dans un dossier racine "cuistot-family".

Attends mon retour après chaque série de commandes avant de passer à la suite.

## Installation de l'environnement de dév
(janvier 2026)
- vidage du repository github, connexion par SSH (recréation d'une clé et mise à jour de l'url de connexion : `git remote set-url origin git@github.com:vinsse2001/cuistotfamily.git`)
- **WSL** (déjà installé, je m'étais appuyé sur la doc https://blog.sciam.fr/2024/09/13/env-quarkus-wsl.html)
    - install WSL : `wsl --install`
    - màj Ubuntu : `sudo apt update && sudo apt -y upgrade`
    - install zip : `sudo apt install zip unzip`
- **Windows Terminal** (déjà installé), pour faciliter le fait d’avoir plusieurs terminals (plusieurs onglets), et changement des couleurs (paramètres) pour avoir un thème lisible
- **NestJS CLI** et **Angular CLI** : `npm install -g @nestjs/cli @angular/cli` 
- **Node JS** :
    - `sudo apt install nodejs` (mais apparemment inutile, car installe ancienne version)
    - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`
    - `\. "$HOME/.nvm/nvm.sh"`
    - `nvm install 24`
- init backend avec NestJS : `nest new cuistot-family-api` (choisir npm)
- init frontend Angular : `ng new cuistot-family-client --standalone --style=css --ssr=false` (on désactive le SSR, inutile ici, car pas besoin de référencement pour l'application, ni de hautes performances pour le 1er affichage de page ou les suivantes)
- install **PostGreSQL**, puis démarrage du service et création de la base de données :
    - `sudo apt update`
    - `sudo apt install postgresql postgresql-contrib`
    - `sudo service postgresql start`
    - `sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"` (le mot de passe du user 'postgres' local est 'postgres')
    - `sudo -u postgres psql -c "CREATE USER cuistot WITH PASSWORD 'cuistot' SUPERUSER;"` (on crée un user "cuistot", mdp id)
    - `sudo -u postgres psql -c "CREATE DATABASE cuistotfamily OWNER cuistot;"`
- création d'alias cdapi et cdcli :
    - `vi ~/.bash_aliases`
    - y insérer les 2 lignes :
      - `alias cdapi='cd ~/dev/cuistotfamily/cuistot-family-api'`
      - `alias cdcli='cd ~/dev/cuistotfamily/cuistot-family-client'`
    - et lancer ce script depuis le .bashrc, en y ajoutant `. ~/.bash_aliases`

## Démarrage environnement de dév
- ouvrir Windows Terminal, puis un nouvel onglet Ubuntu
- `cd ~/dev/cuistotfamily` et taper `code .` pour lancer VS Code Windows, ouvert en remote
- démarrer le backend : `cd cuistot-family-api` puis `npm run start:dev`
- démarrer le front (dans un nouvel onglet ubuntu) : `cd ~/dev/cuistotfamily/cuistot-family-client` puis `npm run start`

## Création du code
- install des dépendances dans l'api : `cdapi` puis `npm install @nestjs/typeorm typeorm pg`
- puis création CRUD Recettes (recipes) : `nest generate resource recipes` (choisir REST API, et yes pour les options)
