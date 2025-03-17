import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Ingredient } from '../models/ingredient.model';
import { IngredientCourant } from '../models/ingredientcourant.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private ingredientsCache$?: Observable<Ingredient[]>;
  private apiUrl = 'http://localhost:3000/api';
  private ingredientsCourantsUrl = `${this.apiUrl}/ingredients-courants`;
  private ingredientsUrl = `${this.apiUrl}/ingredients`;


  constructor(private http: HttpClient) {}

  getIngredientsCourants(): Observable<IngredientCourant[]> {
    return this.http.get<IngredientCourant[]>(this.ingredientsCourantsUrl);
  }

  ajouterIngredientCourant(ingredient: IngredientCourant): Observable<any> {
    return this.http.post(this.ingredientsCourantsUrl, ingredient);
  }

  // Charge et met en cache les ingrédients pré-enregistrés dans l'appli (avec infos nutritionnelles) pour éviter les requêtes répétées
  getIngredients(): Observable<Ingredient[]> {
    if (!this.ingredientsCache$) {
      this.ingredientsCache$ = this.http.get<any[]>(this.ingredientsUrl).pipe(
        map(data =>
          data.map(item => ({
            id: item.id.toString(),
            nom: item.nom,
            calories: item.calories || 0,
            proteines: item.proteines || 0,
            glucides: item.glucides || 0,
            lipides: item.lipides || 0,
            fibres: item.fibres || 0,
            vitamines: {
              C: item.vitamine_C || 0,
              B1: item.vitamine_B1 || 0,
              B2: item.vitamine_B2 || 0,
              B3: item.vitamine_B3 || 0,
              B5: item.vitamine_B5 || 0,
              B6: item.vitamine_B6 || 0,
              B9: item.vitamine_B9 || 0,
              B12: item.vitamine_B12 || 0,
              D: item.vitamine_D || 0,
              E: item.vitamine_E || 0,
              K1: item.vitamine_K1 || 0,
              retinol: item.retinol || 0,
              beta_carotene: item.beta_carotene || 0
            },
            mineraux: {
              calcium: item.calcium || 0,
              fer: item.fer || 0,
              magnesium: item.magnesium || 0,
              phosphore: item.phosphore || 0,
              potassium: item.potassium || 0,
              sodium: item.sodium || 0
            }
          }))
        ),
        shareReplay(1), // Mise en cache pour éviter les requêtes répétées
        catchError(error => {
          console.error('Erreur lors du chargement des ingrédients:', error);
          return of([]); // Retourne une liste vide en cas d'erreur
        })
      );
    }
    return this.ingredientsCache$;
  }
  
  rechercherIngredient(terme: string): Observable<{ source: string; ingredient: Ingredient | IngredientCourant }[]> {
    // Recherche dans les deux fichiers
    const courants$ = this.http.get<IngredientCourant[]>(`${this.ingredientsCourantsUrl}?q=${encodeURIComponent(terme)}`);
    const complets$ = this.http.get<Ingredient[]>(`${this.ingredientsUrl}?q=${encodeURIComponent(terme)}`);
  
    return forkJoin([courants$, complets$]).pipe(
      map(([courants, complets]) => {
        // Marque les résultats comme venant des courants ou des complets
        const courantsAvecSource = courants.map(ingredient => ({ source: 'courants', ingredient }));
        const completsAvecSource = complets.map(ingredient => ({ source: 'complets', ingredient }));
  
        // Combine les deux listes avec une priorité
        return [...courantsAvecSource, ...completsAvecSource];
      }),
      catchError(error => {
        console.error('Erreur lors de la recherche des ingrédients:', error);
        return of([]);
      })
    );
  }

  ajouterNouvelIngredient(nom: string): Observable<Ingredient> {
    return of({
      id: '', // Id temporaire ou une chaîne vide
      nom,
      calories: 0,
      proteines: 0,
      glucides: 0,
      lipides: 0,
      fibres: 0, // Par défaut
      vitamines: {}, // Objet vide pour les vitamines
      mineraux: {},  // Objet vide pour les minéraux
    });
  }
}
