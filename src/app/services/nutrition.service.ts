import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

interface NutritionResponse {
  calories: number;
  totalNutrients: {
    PROCNT?: { quantity: number }; // Protéines
    FAT?: { quantity: number };     // Lipides
    CHOCDF?: { quantity: number };  // Glucides
  };
}

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  baseIngredients: Ingredient[] = [
    { nom: "Farine", calories: 364, proteines: 10, glucides: 76, lipides: 1 },
    { nom: "Oeuf", calories: 155, proteines: 13, glucides: 1.1, lipides: 11 }
  ];

  constructor(private http: HttpClient) {}

  rechercherIngredient(nom: string): Ingredient[] {
    return this.baseIngredients.filter((ing: Ingredient) => ing.nom.toLowerCase().includes(nom.toLowerCase()));
  }
  
  ajouterNouvelIngredient(nom: string): Observable<Ingredient> {
    // Logique pour appeler USDA et créer un nouvel ingrédient si trouvé

    // Temporairement renvoie un ingrédient par défaut
    return of({ nom, calories: 0, proteines: 0, glucides: 0, lipides: 0 });
  }
}
