export interface Recette {
    id: number;
    titre: string;
    ingredients: string[];
    instructions: string;
    tempsPreparation: number; // Temps en minutes
    tempsCuisson: number; // Temps en minutes
    portions: number; // Nombre de portions
    categorie: string;
    utilisateurId: number;
    imageUrl: string;
  }
  