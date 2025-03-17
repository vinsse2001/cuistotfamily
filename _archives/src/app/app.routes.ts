import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { RecetteComponent } from './recette/recette.component';
import { RecetteFormComponent } from './recette-form/recette-form.component';
import { ProfilComponent } from './profil/profil.component';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'recette', component: RecetteFormComponent },
  { path: 'recette/:id', component: RecetteComponent },
  { path: 'recette/:id/edit', component: RecetteFormComponent },
  { path: 'profil', component: ProfilComponent }
];
