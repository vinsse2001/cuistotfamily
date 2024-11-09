
import { Injectable } from '@angular/core';
import { Recette } from '../models/recette.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor() { }

  private recettes: Recette[] = [
    { id: 1, titre: 'Salade César', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Étape 1: : Faites dorer le pain, coupé en cubes, 3 min dans un peu d huile.\n\nÉtape 2 : Déchirez les feuilles de romaine dans un saladier, et ajoutez les croûtons préalablement épongés dans du papier absorbant.\n\nÉtape 3 : Préparez la sauce : Faites cuire l oeuf 1 min 30 dans l eau bouillante, et rafraîchissez-le.\n\nÉtape 4 : Cassez-le dans le bol d un mixeur et mixez, avec tous les autres ingrédients; rectifiez l assaissonnement et incorporez à la salade. Cassez-le dans le bol d un mixeur et mixez, avec tous les autres ingrédients; rectifiez l assaissonnement et incorporez à la salade.\n\nÉtape 5 : Décorez de copeaux de parmesan, et servez.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Plat', utilisateurId: 1, imageUrl: 'https://resize-elle.ladmedia.fr/r/300,388,center-middle,forcex,ffffff/img/var/plain_site/storage/images/elle-a-table/fiches-cuisine/tous-les-themes/recettes-faciles/168377-14-fre-FR/Recettes-faciles.jpg' },
    { id: 2, titre: 'Quiche Lorraine', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 1, imageUrl: 'https://images.radio-canada.ca/q_auto,w_861/v1/alimentation/recette/16x9/poelee-inspiration-tajine.jpg' },
    { id: 3, titre: 'Salade César 2', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Entrée', utilisateurId: 2, imageUrl: 'https://images.radio-canada.ca/q_auto,w_970/v1/alimentation/recette/16x9/2789-soupe-pois-chiches-pates.jpg' },
    { id: 4, titre: 'Quiche Lorraine 2', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 1, imageUrl: '' },
    { id: 5, titre: 'Salade César 3', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Plat', utilisateurId: 1, imageUrl: 'https://images.radio-canada.ca/q_auto,w_970/v1/alimentation/recette/16x9/salade-pois-chiches-chou-fleur-orange.jpg' },
    { id: 6, titre: 'Quiche Lorraine 3', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 2, imageUrl: '' },
    { id: 7, titre: 'Salade César 4', ingredients: ['Laitue', 'Poulet', 'Croutons', 'Parmesan'], instructions: 'Mélanger tous les ingrédients.\nManger avec les doigts.\n\nFaire un bisou à son voisin.', tempsPreparation: 10, tempsCuisson: 0, portions: 2, categorie: 'Dessert', utilisateurId: 1, imageUrl: 'https://images.radio-canada.ca/q_auto,w_970/v1/alimentation/recette/16x9/sous-marin-boulettes-vegetariennes.jpg' },
    { id: 8, titre: 'Quiche Lorraine 4', ingredients: ['Pâte brisée', 'Lardons', 'Crème', 'Oeufs'], instructions: 'Préparer la pâte et cuire au four.', tempsPreparation: 15, tempsCuisson: 25, portions: 4, categorie: 'Plat', utilisateurId: 3, imageUrl: '' }
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
