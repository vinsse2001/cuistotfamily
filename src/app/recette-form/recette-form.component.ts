import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { CategorieService } from '../services/categorie.service';

interface NouvelleRecetteForm {
  titre: string;
  ingredients: string;
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
    ingredients: '',
    instructions: '',
    tempsPreparation: 0,
    tempsCuisson: 0,
    portions: 1,
    categorie: '',
    imageUrl: ''
  };
  editMode = false; // Pour savoir si on est en mode édition
  recetteId?: number;
  messageConfirmation: string = '';

  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.categories = this.categorieService.obtenirCategories();
    
    // Récupère l'ID de la recette à partir de l'URL (s'il est présent)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.recetteId = +id;
      const recette = this.recetteService.obtenirRecette(this.recetteId);
      if (recette) {
        this.nouvelleRecette = {
          titre: recette.titre,
          ingredients: recette.ingredients.join(', '),
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

  onSubmit() {
    // Marque tous les champs comme "touchés" pour afficher les erreurs si invalides
    if (this.recetteForm) {
      this.recetteForm.form.markAllAsTouched();
    }

    if (this.recetteForm.valid) {
      this.ajouterRecette(); // Enregistre la recette si le formulaire est valide
      this.afficherMessageConfirmation('Recette ajoutée avec succès !');
      this.recetteForm.resetForm(); // Réinitialise le formulaire après soumission
    }
  }

  ajouterRecette() {
    const ingredientsArray = this.nouvelleRecette.ingredients
      .split(',')
      .map(ingredient => ingredient.trim());

    if (this.editMode && this.recetteId != null) {
      // Mode édition : Mettre à jour la recette existante
      this.recetteService.modifierRecette(this.recetteId, {
        ...this.nouvelleRecette,
        ingredients: ingredientsArray
      } as Recette);
      this.router.navigate(['/']); // Redirige vers l'accueil après modification
    } else {
      // Mode création : Ajouter une nouvelle recette
      this.recetteService.ajouterRecette({
        ...this.nouvelleRecette,
        ingredients: ingredientsArray
      } as Recette);
    }

    this.nouvelleRecette = {
      titre: '',
      ingredients: '',
      instructions: '',
      tempsPreparation: 0,
      tempsCuisson: 0,
      portions: 1,
      categorie: '',
      imageUrl: ''
    };
  }

  afficherMessageConfirmation(message: string) {
    this.messageConfirmation = message;
    setTimeout(() => {
      this.messageConfirmation = '';
    }, 3000); // Message disparaît après 3 secondes
  }
}
