import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  recettes: Recette[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  recettesParPage: number = 6;
  categories: string[] = [];
  categorieFiltre: string = '';
  affichageUtilisateur: boolean = false;
  utilisateurId: number = 1;

  constructor(private recetteService: RecetteService,
              private categorieService: CategorieService) {}

  ngOnInit() {
    this.categories = this.categorieService.obtenirCategories();
    this.recetteService.recettes$.subscribe(recettes => (this.recettes = recettes));
  }

  filteredRecettes(): Recette[] {
    // Filtre les recettes par titre ou ingrédient
    return this.recettes.filter(recette =>
      recette.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      recette.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get recettesFiltrees(): Recette[] {
    const recettesFiltrees = this.categorieFiltre
      ? this.recettes.filter(recette => recette.categorie === this.categorieFiltre)
      : this.recettes;

    return this.affichageUtilisateur
      ? recettesFiltrees.filter(recette => recette.utilisateurId === this.utilisateurId)
      : recettesFiltrees;
  }

  get recettesPaginees(): Recette[] {
    const debutIndex = (this.currentPage - 1) * this.recettesParPage;
    const finIndex = debutIndex + this.recettesParPage;
    return this.recettesFiltrees.slice(debutIndex, finIndex);
  }

  get nombrePages(): number {
    return Math.ceil(this.recettesFiltrees.length / this.recettesParPage);
  }

  changerPage(nouvellePage: number) {
    this.currentPage = nouvellePage;
  }
}
