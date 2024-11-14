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
  nutritionInfo: any = {}; // Stocke les informations nutritives de la recette

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    private nutritionService: NutritionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recette = this.recetteService.obtenirRecette(id);
    }
    this.calculerInfosNutrition();
  }

  getParagraphs(text: string): string[] {
    return text.split('\n').filter(paragraph => paragraph.trim().length > 0);
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

  calculerInfosNutrition() {
    if (this.recette) {
      // Parcours chaque ingrédient et récupère les données nutritionnelles
      // this.recette.ingredients.forEach(ingredient => {
      //   this.nutritionService.getNutritionalData(ingredient).subscribe(data => {
      //     if (data) {
      //       // Ajoute les valeurs nutritives par ingrédient au total
      //       this.nutritionInfo.calories = (this.nutritionInfo.calories || 0) + data.calories;
      //       this.nutritionInfo.protein = (this.nutritionInfo.protein || 0) + data.protein;
      //       this.nutritionInfo.fat = (this.nutritionInfo.fat || 0) + data.fat;
      //       this.nutritionInfo.carbohydrates = (this.nutritionInfo.carbohydrates || 0) + data.carbohydrates;
      //     }
      //   });
      // });
    }
  }
}