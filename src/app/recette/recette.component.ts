import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { FormsModule } from '@angular/forms';
import { NutritionService } from '../services/nutrition.service';

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {
  recette?: Recette;
  // Cache nutritionnel avec vitamines et minéraux
  ingredientsCache: { [id: string]: { 
    nom: string, 
    calories: number, 
    proteines: number, 
    glucides: number, 
    lipides: number, 
    vitamines?: { [key: string]: number }, 
    mineraux?: { [key: string]: number }
  } } = {};
  // Variables pour les totaux nutritionnels
  totalCalories: number = 0;
  totalProteines: number = 0;
  totalGlucides: number = 0;
  totalLipides: number = 0;
  totalVitamines: { [key: string]: number } = {};
  totalMineraux: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private nutritionService: NutritionService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recette = this.recetteService.obtenirRecette(id);
    }
    this.nutritionService.getIngredients().subscribe(ingredients => {
      this.ingredientsCache = ingredients.reduce((acc, ingredient) => {
        if (ingredient.id) {
          acc[ingredient.id] = {
            nom: ingredient.nom,
            calories: ingredient.calories,
            proteines: ingredient.proteines,
            glucides: ingredient.glucides,
            lipides: ingredient.lipides,
            vitamines: ingredient.vitamines,
            mineraux: ingredient.mineraux
          };
        }
        return acc;
      }, {} as { [id: string]: { nom: string, calories: number, proteines: number, glucides: number, lipides: number, vitamines?: { [key: string]: number }, mineraux?: { [key: string]: number } } });

      this.calculerInfosNutritionnelles();
    });
  }

  calculerInfosNutritionnelles() {
    this.totalCalories = 0;
    this.totalProteines = 0;
    this.totalGlucides = 0;
    this.totalLipides = 0;
    this.totalVitamines = {};
    this.totalMineraux = {};

    if (this.recette) {
      this.recette.ingredients.forEach(ingredient => {
        const cachedIngredient = this.ingredientsCache[ingredient.ingredientId];
        if (cachedIngredient) {
          const facteur = ingredient.quantite / 100;

          this.totalCalories += cachedIngredient.calories * facteur;
          this.totalProteines += cachedIngredient.proteines * facteur;
          this.totalGlucides += cachedIngredient.glucides * facteur;
          this.totalLipides += cachedIngredient.lipides * facteur;

          if (cachedIngredient.vitamines) {
            for (const [vitamine, value] of Object.entries(cachedIngredient.vitamines)) {
              this.totalVitamines[vitamine] = (this.totalVitamines[vitamine] || 0) + value * facteur;
            }
          }
          
          if (cachedIngredient.mineraux) {
            for (const [minerai, value] of Object.entries(cachedIngredient.mineraux)) {
              this.totalMineraux[minerai] = (this.totalMineraux[minerai] || 0) + value * facteur;
            }
          }
        }
      });
    }
  }

  getParagraphs(text: string): string[] {
    return text.split('\n').filter(paragraph => paragraph.trim().length > 0);
  }

  // Méthode pour obtenir le nom de l'ingrédient par son ID
  getIngredientNomById(ingredientId: string): string {
    let nom = '';
    this.nutritionService.getIngredients().subscribe(ingredients => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        nom = ingredient.nom;
      }
    });
    return nom;
  }

  modifierRecette() {
    if (this.recette) {
      this.router.navigate(['/recette', this.recette.id, 'edit']);
    }
  }

  supprimerRecette() {
    if (this.recette && confirm('Voulez-vous vraiment supprimer cette recette ?')) {
      this.recetteService.supprimerRecette(this.recette.id);
      this.router.navigate(['/']); // Redirection vers l'accueil après suppression
    }
  }

  imprimerRecette() {
    window.print();
  }

}