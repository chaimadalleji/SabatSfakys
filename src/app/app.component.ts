import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], // Ajout de IonicModule
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  public appPages = [
    { 
      title: 'Chaussures', 
      icon: 'walk', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { 
      title: 'Sacs', 
      icon: 'bag', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { 
      title: 'Sandales', 
      icon: 'footsteps', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { 
      title: 'Claquettes', 
      icon: 'shirt', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { 
      title: 'Autres', 
      icon: 'grid', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { 
      title: 'Chaussures pour Besoins Spécifiques', 
      icon: 'accessibility', 
      url: '/products', 
      subcategories: ['Homme', 'Femme', 'Enfant'], 
      open: false 
    },
    { title: 'Favoris', url: '/favorites', icon: 'heart', subcategories: [] }
  ];
  

  constructor() {}

  toggleCategory(index: number) {
    this.appPages[index].open = !this.appPages[index].open;
  }

  navigateToCategory(category: string, subcategory: string) {
    console.log(`Navigation vers : ${category} - ${subcategory}`);
    // Plus tard, on pourra utiliser Angular Router pour rediriger l'utilisateur
    // this.router.navigate(['/products', { category: category, subcategory: subcategory }]);
  }
  search(event: any) {
    const query = event.target.value.toLowerCase();
    console.log("Recherche :", query);
}
}
