export interface Ingredient {
  id?: string;                // Identifiant unique si nécessaire
  nom: string;                // Nom de l'ingrédient
  calories: number;           // Calories pour 100g
  proteines: number;          // Protéines pour 100g
  glucides: number;           // Glucides pour 100g
  lipides: number;            // Lipides pour 100g
  vitamines?: {               // Vitamines (facultatif)
    [key: string]: number;    // Ex. { "A": 500, "B1": 0.2, ... }
  };
  mineraux?: {                // Minéraux (facultatif)
    [key: string]: number;    // Ex. { "calcium": 15, "fer": 0.8, ... }
  };
}
