Dev appli web "Cuistot Family" !
--------------------------------

- (powershell) admin > install chocolatey (2.3.0)
> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
> choco -v
2.3.0

- (powershell) install Nodes JS
> choco install nodejs-lts
> npm -v
10.8.2
> node -v
v20.18.0

- (powershell) réinstall Angular
> npm uninstall -g @angular/cli
> npm install -g @angular/cli
> ng version
Angular CLI: 18.2.11
Node: 20.18.0

- (bash) création du projet Angular (dans C:/Dev), puis mise à jour
> ng new cuistotfamily
> cd cuistotfamily
> ng update @angular/core @angular/cli

- (bash) démarrer angular
> ng serve

- (bash - nouvelle fenêtre) création des composants
> ng generate component accueil
> ng generate component recette
> ng generate component profil
> ng generate component recette-form

- (VSS - File > open folder > C:\Dev\cuistotfamily) créer le fichier src/app/app-routing.module.ts, configurer les routes vers les composants
   ** Rq : depuis Angular 17, ces fichiers ne sont plus créés par défaut, pour favoriser l'utilisation de composants standalones, je crée cependant ces fichiers en utilisant les comp standalones **
- (VSS) créer le fichier src/app/app.module.ts, y déclarer le module de routage
- (VSS) màj le fichier main.ts
- (VSS) enrichir les différents fichiers des composants

- (bash) install de Bootstrap
> npm install bootstrap

ng generate service services/ingredientsCourants

-----------------------------------

init API (avec Node.js)
mkdir cuistotfamily-api
cd cuistotfamily-api
npm init -y                           => crée le fichier package.json
npm install express                   => crée les dépendances
mkdir -p public/data
vi server.js                          => avec ajout du code proposé par chatGPT
node server.js                        => démarre node.js

npm install cors                      => ajout de dépendances pour les problèmes CORS

