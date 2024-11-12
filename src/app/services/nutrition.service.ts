import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

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
  private cache = new Map<string, any>(); // Cache pour stocker les données nutritives

  private appId = '597636af';
  private appKey = '7453060d2068c771343927382ac13efd';

  constructor(private http: HttpClient) {}

  getNutritionalData(ingredient: string): Observable<any> {
    // const translatedIngredient = this.translateIngredient(ingredient); // Traduction ici
     
    if (this.cache.has(ingredient)) {
      return of(this.cache.get(ingredient));
    }
  
    const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=${this.appId}&app_key=${this.appKey}&ingr=${encodeURIComponent(ingredient)}`;
  console.log('recup des infos nutritionnelles pour : '+ingredient);
  console.log('  => appel service : '+apiUrl)
    return this.http.get<NutritionResponse>(apiUrl).pipe(
      map((response: NutritionResponse) => {
        return {
          calories: response.calories || 0,
          protein: response.totalNutrients?.PROCNT?.quantity || 0,
          fat: response.totalNutrients?.FAT?.quantity || 0,
          carbohydrates: response.totalNutrients?.CHOCDF?.quantity || 0
        };
      }),
      tap(data => this.cache.set(ingredient, data)),
      catchError(error => {
        console.error(`Erreur API pour ${ingredient}:`, error);
        return of({ calories: 0, protein: 0, fat: 0, carbohydrates: 0 });
      })
    );
  }
  

}
