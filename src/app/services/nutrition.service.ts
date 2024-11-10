import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

interface NutritionResponse {
  product: {
    nutriments: {
      'energy-kcal_100g': number;
      'proteins_100g': number;
      'fat_100g': number;
      'carbohydrates_100g': number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class NutritionService {
  private cache = new Map<string, any>(); // Cache pour stocker les données nutritives

  constructor(private http: HttpClient) {}

  getNutritionalData(ingredient: string): Observable<any> {
    // Vérifie le cache
    if (this.cache.has(ingredient)) {
      return of(this.cache.get(ingredient));
    }
  
    // Si non en cache, effectue une requête API
    const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${ingredient}.json`;
    return this.http.get<NutritionResponse>(apiUrl).pipe(
      map(response => {
        const nutritionData = response.product.nutriments;
        return {
          calories: nutritionData['energy-kcal_100g'],
          protein: nutritionData['proteins_100g'],
          fat: nutritionData['fat_100g'],
          carbohydrates: nutritionData['carbohydrates_100g']
        };
      }),
      tap(data => this.cache.set(ingredient, data)),
      catchError(error => {
        console.error(`Erreur API pour ${ingredient}:`, error);
        return of(null);
      })
    );
  }
  
}
