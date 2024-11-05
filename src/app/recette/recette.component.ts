import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {
  recette?: Recette;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recette = this.recetteService.obtenirRecette(id);
  }

  getParagraphs(text: string): string[] {
    return text.split('\n').filter(paragraph => paragraph.trim().length > 0);
  }

  supprimerRecette() {
    if (this.recette && confirm('Voulez-vous vraiment supprimer cette recette ?')) {
      this.recetteService.supprimerRecette(this.recette.id);
      this.router.navigate(['/']); // Redirection vers l'accueil après suppression
    }
  }
}
