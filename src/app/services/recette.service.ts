
import { Injectable } from '@angular/core';
import { Recette } from '../models/recette.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor() { }

  private recettes: Recette[] = [
    {
      id: '1',
      utilisateurId: 'user1',
      titre: 'Crêpes',
      ingredients: [
        { ingredientId: '12846', quantite: 250, unite: 'g' },  // Farine
        { ingredientId: '25916', quantite: 500, unite: 'ml' }, // Lait
        { ingredientId: '30134', quantite: 3, unite: 'unités' } // Œufs
      ],
      instructions: 'Mélangez la farine avec les œufs, puis ajoutez le lait petit à petit. Faites cuire les crêpes dans une poêle chaude.',
      tempsPreparation: 10,
      tempsCuisson: 20,
      portions: 4,
      categorie: 'Dessert',
      imageUrl: 'https://www.francine.com/wp-content/uploads/2018/09/pate-a-crepes-4-3-2-1-sautez-211584757399-2.webp'
    },
    {
      id: '2',
      utilisateurId: 'user2',
      titre: 'Salade César',
      ingredients: [
        { ingredientId: '12315', quantite: 1, unite: 'pièce' }, // Laitue romaine
        { ingredientId: '39211', quantite: 100, unite: 'g' },   // Poulet grillé
        { ingredientId: '23477', quantite: 50, unite: 'g' },    // Parmesan
        { ingredientId: '12025', quantite: 50, unite: 'g' }     // Croûtons
      ],
      instructions: 'Mélangez la laitue avec le poulet grillé, le parmesan, et les croûtons. Ajoutez de la sauce César et mélangez bien.',
      tempsPreparation: 15,
      tempsCuisson: 0,
      portions: 2,
      categorie: 'Entrée',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2A1Xn3Bgnvuwu22v0xqjIou4b159pstzTA&s'
    },
    {
      id: '3',
      utilisateurId: 'user3',
      titre: 'Pâtes Carbonara',
      ingredients: [
        { ingredientId: '1016', quantite: 200, unite: 'g' },   // Pâtes
        { ingredientId: '11006', quantite: 100, unite: 'g' },   // Lardons
        { ingredientId: '19559', quantite: 2, unite: 'unités' },// Œufs
        { ingredientId: '28505', quantite: 50, unite: 'g' }    // Parmesan râpé
      ],
      instructions: 'Faites cuire les pâtes. Dans un bol, battez les œufs avec le parmesan. Faites cuire les lardons, puis mélangez le tout avec les pâtes chaudes.',
      tempsPreparation: 5,
      tempsCuisson: 15,
      portions: 2,
      categorie: 'Plat',
      imageUrl: 'https://assets.afcdn.com/recipe/20200316/109086_w1024h576c1cx1060cy707cxt0cyt0cxb2121cyb1414.jpg'
    }
  ];
  private recettesSubject = new BehaviorSubject<Recette[]>(this.recettes);

  recettes$ = this.recettesSubject.asObservable();

  ajouterRecette(recette: Recette) {
    this.recettes.push({ ...recette, id: ''+Date.now() });
    this.recettesSubject.next(this.recettes);
  }

  obtenirRecette(id: string): Recette | undefined {
    return this.recettes.find(r => r.id === id);
  }

  modifierRecette(id: string, recette: Recette) {
    const index = this.recettes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.recettes[index] = { ...recette, id };
      this.recettesSubject.next(this.recettes);
    }
  }
  
  supprimerRecette(id: string) {
    this.recettes = this.recettes.filter(r => r.id !== id);
    this.recettesSubject.next(this.recettes);
  }

  obtenirRecettesParUtilisateur(utilisateurId: string): Recette[] {
    return this.recettes.filter(recette => recette.utilisateurId === utilisateurId);
  }
}
