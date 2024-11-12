export interface RecetteIngredient {
    ingredientId: string;   // Référence à l'ID de l'ingrédient dans la liste de référence
    quantite: number;       // Quantité pour cette recette
    unite: string;          // Unité de mesure (ex. "g", "ml")
}
  