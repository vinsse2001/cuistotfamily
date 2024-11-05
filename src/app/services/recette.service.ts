
import { Injectable } from '@angular/core';
import { Recette } from '../models/recette.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor() { }

  private recettes: Recette[] = [
    { id: 1, titre: 'Salade César', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Plat', utilisateurId: 1 },
    { id: 2, titre: 'Quiche Lorraine', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 1 },
    { id: 3, titre: 'Salade César 2', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Entrée', utilisateurId: 2 },
    { id: 4, titre: 'Quiche Lorraine 2', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 1 },
    { id: 5, titre: 'Salade César 3', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Plat', utilisateurId: 1 },
    { id: 6, titre: 'Quiche Lorraine 3', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 2 },
    { id: 7, titre: 'Salade César 4', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Dessert', utilisateurId: 1 },
    { id: 8, titre: 'Quiche Lorraine 4', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 3 }
  ];
  private recettesSubject = new BehaviorSubject<Recette[]>(this.recettes);

  recettes$ = this.recettesSubject.asObservable();

  ajouterRecette(recette: Recette) {
    this.recettes.push({ ...recette, id: Date.now() });
    this.recettesSubject.next(this.recettes);
  }

  obtenirRecette(id: number): Recette | undefined {
    return this.recettes.find(r => r.id === id);
  }

  modifierRecette(id: number, recette: Recette) {
    const index = this.recettes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.recettes[index] = { ...recette, id };
      this.recettesSubject.next(this.recettes);
    }
  }
  
  supprimerRecette(id: number) {
    this.recettes = this.recettes.filter(r => r.id !== id);
    this.recettesSubject.next(this.recettes);
  }

  obtenirRecettesParUtilisateur(utilisateurId: number): Recette[] {
    return this.recettes.filter(recette => recette.utilisateurId === utilisateurId);
  }
}
