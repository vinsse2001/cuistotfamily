import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private readonly ingredientsUrl = 'data/ingredients.json';
  private ingredientsCache$?: Observable<Ingredient[]>;

  constructor(private http: HttpClient) {}

  // Charge et met en cache les ingrédients pré-enregistrés dans l'appli (avec infos nutritionnelles) pour éviter les requêtes répétées
  getIngredients(): Observable<Ingredient[]> {
    if (!this.ingredientsCache$) {
      this.ingredientsCache$ = this.http.get<Ingredient[]>(this.ingredientsUrl).pipe(
        shareReplay(1), // Met en cache les résultats
        catchError(error => {
          console.error('Erreur lors du chargement des ingrédients:', error);
          return of([]);
        })
      );
    }
    return this.ingredientsCache$;
  }

  // Recherche un ingrédient dans la liste chargée
  rechercherIngredient(nom: string): Observable<Ingredient[]> {
    return this.getIngredients().pipe(
      map(ingredients => ingredients.filter(ing => 
        ing.nom.toLowerCase().includes(nom.toLowerCase())
      ))
    );
  }
  
  ajouterNouvelIngredient(nom: string): Observable<Ingredient> {
    // Logique pour appeler USDA et créer un nouvel ingrédient si trouvé

    // Temporairement renvoie un ingrédient par défaut
    return of({ nom, calories: 0, proteines: 0, glucides: 0, lipides: 0 });
  }
}
