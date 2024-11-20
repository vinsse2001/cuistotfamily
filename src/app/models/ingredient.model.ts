export interface Ingredient {
  id: string;                // Identifiant unique
  nom: string;               // Nom de l'ingrédient
  calories: number;          // Calories pour 100g
  proteines: number;         // Protéines pour 100g
  glucides: number;          // Glucides pour 100g
  lipides: number;           // Lipides pour 100g
  fibres: number;            // Fibres pour 100g
  vitamines?: {               // Vitamines (structurées en tant qu'objet clé-valeur)
    [key: string]: number;   // Ex. { "C": 21.6, "B1": 0.08, ... }
  };
  mineraux?: {                // Minéraux (structurés en tant qu'objet clé-valeur)
    [key: string]: number;   // Ex. { "calcium": 13, "fer": 0.43, ... }
  };
}
