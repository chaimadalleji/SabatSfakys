import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage {
  categories = [
    { name: 'Chaussures', icon: 'walk', subcategories: ['Homme', 'Femme', 'Enfant'] },
    { name: 'Sacs', icon: 'bag', subcategories: ['Homme', 'Femme', 'Enfant'] },
    { name: 'Sandales', icon: 'footsteps', subcategories: ['Homme', 'Femme', 'Enfant'] },
    { name: 'Claquettes', icon: 'shirt', subcategories: ['Homme', 'Femme', 'Enfant'] },
    { name: 'Autres', icon: 'grid', subcategories: ['Homme', 'Femme', 'Enfant'] },
  ];

  specialCategory = { name: 'Chaussures pour Besoins Spécifiques', icon: 'accessibility', subcategories: [] };

  constructor(private router: Router) {}

  openCategory(categoryName: string, subcategory?: string) {
    console.log(`Catégorie sélectionnée : ${categoryName}, Sous-catégorie : ${subcategory || 'Aucune'}`);
    // Plus tard, on pourra rediriger vers une page spécifique
    // this.router.navigate(['/products', { category: categoryName, subcategory: subcategory }]);
  }
}
