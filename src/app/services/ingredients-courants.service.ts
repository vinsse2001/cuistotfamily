import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IngredientCourant {
  id: string;
  nom: string;
}

@Injectable({
  providedIn: 'root',
})
export class IngredientCourantService {
  private apiUrl = 'http://localhost:3000/api/ingredients-courants';

  constructor(private http: HttpClient) {}

  getIngredientsCourants(): Observable<IngredientCourant[]> {
    return this.http.get<IngredientCourant[]>(this.apiUrl);
  }

  ajouterIngredientCourant(ingredient: IngredientCourant): Observable<any> {
    return this.http.post(this.apiUrl, ingredient);
  }
}
