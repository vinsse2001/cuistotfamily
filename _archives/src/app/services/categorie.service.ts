import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private categories: string[] = ['Entrée', 'Plat', 'Dessert', 'Cocktail', 'Autre'];

  obtenirCategories(): string[] {
    return this.categories;
  }
}
