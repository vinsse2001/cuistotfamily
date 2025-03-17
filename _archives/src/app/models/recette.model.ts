import { RecetteIngredient } from '../models/recetteingredient.model';

  export interface Recette {
    id: string;
    utilisateurId: string;
    titre: string;
    ingredients: RecetteIngredient[];
    instructions: string;
    tempsPreparation: number; // Temps en minutes
    tempsCuisson: number; // Temps en minutes
    portions: number; // Nombre de portions
    categorie: string;
    imageUrl: string;
  }
  