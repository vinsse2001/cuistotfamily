import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { CategorieService } from '../services/categorie.service';
import { NutritionService } from '../services/nutrition.service';
import { Ingredient } from '../models/ingredient.model';
import { RecetteIngredient } from '../models/recetteingredient.model';

interface NouvelleRecetteForm {
  titre: string;
  ingredients: RecetteIngredient[];
  instructions: string;
  tempsPreparation: number;
  tempsCuisson: number;
  portions: number;
  categorie: string;
  imageUrl: string;
}

@Component({
  selector: 'app-recette-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recette-form.component.html',
  styleUrls: ['./recette-form.component.css']
})

export class RecetteFormComponent implements OnInit {
  @ViewChild('recetteForm') recetteForm!: NgForm;
  categories: string[] = [];
  nouvelleRecette: NouvelleRecetteForm = {
    titre: '',
    ingredients: [] as RecetteIngredient[],
    instructions: '',
    tempsPreparation: 0,
    tempsCuisson: 0,
    portions: 1,
    categorie: '',
    imageUrl: ''
  };
  ingredientRecherche = ''; // Recherche en cours dans le champ
  suggestions: Ingredient[] = []; // Liste des suggestions
  editMode = false; // Pour savoir si on est en mode édition
  recetteId?: string;
  messageConfirmation: string = '';

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService,
    private nutritionService: NutritionService
  ) { }

  ngOnInit() {
    this.categories = this.categorieService.obtenirCategories();

    // Récupère l'ID de la recette à partir de l'URL (s'il est présent)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.recetteId = id;
      const recette = this.recetteService.obtenirRecette(this.recetteId);
      if (recette) {
        this.nouvelleRecette = {
          titre: recette.titre,
          ingredients: recette.ingredients,
          instructions: recette.instructions,
          tempsPreparation: recette.tempsPreparation,
          tempsCuisson: recette.tempsCuisson,
          portions: recette.portions,
          categorie: recette.categorie,
          imageUrl: recette.imageUrl
        };
      }
    }
  }

  // Fonction pour obtenir l'ID d'un ingrédient par son nom depuis `ingredients.json`
  obtenirIngredientIdParNom(nom: string): string {
    let ingredientId = '';
    this.nutritionService.getIngredients().subscribe(ingredients => {
      const ingredient = ingredients.find(ing => ing.nom === nom);
      if (ingredient) {
        ingredientId = ingredient.id ?? ''; // Utilise une chaîne vide si `ingredient.id` est `undefined`
      }
    });
    return ingredientId;
  }

  // Méthode pour obtenir le nom de l'ingrédient par son ID
  getIngredientNomById(ingredientId: string): string {
    let nom = '';
    this.nutritionService.getIngredients().subscribe(ingredients => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      if (ingredient) {
        nom = ingredient.nom;
      }
    });
    return nom;
  }

  onSubmit() {
    // Marque tous les champs comme "touchés" pour afficher les erreurs si invalides
    if (this.recetteForm) {
      this.recetteForm.form.markAllAsTouched();
    }

    if (this.recetteForm.valid) {
      console.log("Recette soumise :", this.nouvelleRecette);
      this.ajouterRecette(); // Enregistre la recette si le formulaire est valide
      this.afficherMessageConfirmation('Recette ajoutée avec succès !');
      this.recetteForm.resetForm(); // Réinitialise le formulaire après soumission
    }
  }

  ajouterRecette() {
    if (this.editMode && this.recetteId != null) {
      // Mode édition : Mettre à jour la recette existante
      this.recetteService.modifierRecette(this.recetteId, {
        ...this.nouvelleRecette,
        id: this.recetteId,
        utilisateurId: this.obtenirUtilisateurId()
      } as Recette);
      this.router.navigate(['/']); // Redirige vers l'accueil après modification
    } else {
      // Mode création : Ajouter une nouvelle recette
      this.recetteService.ajouterRecette({
        ...this.nouvelleRecette,
        id: this.genererIdUnique(),
        utilisateurId: this.obtenirUtilisateurId()
      } as Recette);
    }

    this.nouvelleRecette = {
      titre: '',
      ingredients: [],
      instructions: '',
      tempsPreparation: 0,
      tempsCuisson: 0,
      portions: 1,
      categorie: '',
      imageUrl: ''
    };
  }

  obtenirUtilisateurId(): string {
    // Retourne l'ID de l'utilisateur en fonction de ta logique
    return 'utilisateur-id-par-defaut'; // Remplace par l'ID réel
  }

  genererIdUnique(): string {
    // Génère un ID unique, par exemple avec un timestamp
    return Date.now().toString();
  }

  rechercherIngredient() {
    this.nutritionService.rechercherIngredient(this.ingredientRecherche).subscribe((results: Ingredient[]) => {
      this.suggestions = results;
    });
  }

  ajouterIngredient(ingredientRef: Ingredient, quantite: number, unite: string) {
    if (!ingredientRef.id) {
      console.error("L'ingrédient doit avoir un ID valide pour être ajouté.");
      return;
    }

    this.nouvelleRecette.ingredients.push({
      ingredientId: ingredientRef.id,
      quantite,
      unite
    });

    this.ingredientRecherche = ''; // Réinitialise la recherche
    this.suggestions = []; // Vide les suggestions
  }

    // Logique pour ajouter un nouvel ingrédient non trouvé dans la base
    ajouterNouvelIngredient() {
    this.nutritionService.ajouterNouvelIngredient(this.ingredientRecherche)
      .subscribe((ingredient: Ingredient) => {
        if (ingredient && ingredient.id) {
          this.ajouterIngredient(ingredient, 1, '');
        } else {
          console.error("L'ingrédient n'a pas pu être ajouté car il manque un ID.");
        }
      });
  }

  afficherMessageConfirmation(message: string) {
    this.messageConfirmation = message;
    setTimeout(() => {
      this.messageConfirmation = '';
    }, 3000); // Message disparaît après 3 secondes
  }
}
