import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';
import { NutritionService } from '../services/nutrition.service';

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
  utilisateurId: string = 'user1';  // TODO - à remplacer par véritable id user

  constructor(private recetteService: RecetteService,
              private categorieService: CategorieService,
              private nutritionService: NutritionService) {}

  ngOnInit() {
    this.categories = this.categorieService.obtenirCategories();
    this.recetteService.recettes$.subscribe(recettes => (this.recettes = recettes));
  }

    // Filtre les recettes par titre ou ingrédient
    filteredRecettes(): Recette[] {
    return this.recettes.filter(recette =>
      recette.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      recette.ingredients.some(ingredient =>
        this.getIngredientNom(ingredient.ingredientId).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  
  // Méthode pour obtenir le nom de l'ingrédient par son ID
  getIngredientNom(ingredientId: string): string {
    let nom = '';
    this.nutritionService.getIngredients().subscribe(ingredients => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        nom = ingredient.nom;
      }
    });
    return nom;
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
