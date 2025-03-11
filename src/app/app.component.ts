import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './service/auth.service'; // ✅ Ajout du service AuthService
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], 
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SabatSfakys';
  isLoginPage: boolean = false;
  isAuthenticated: boolean = false; // ✅ État de connexion

  constructor(private router: Router, private authService: AuthService, private storage: Storage) {
    this.fixMobileDisplay(); // ✅ Appelle la fonction dès le lancement
    this.checkFirstLaunch(); // ✅ Vérifie si c'est la première ouverture
  }

  async ngOnInit() {
    this.router.events.subscribe(async event => {
      if (event instanceof NavigationEnd) {
        // ✅ Vérifie si l'utilisateur est sur une page de connexion / inscription
        this.isLoginPage = ['/login-client', '/login-vendeur', '/register-client', '/register-vendeur', '/welcome', '/photo'].includes(event.url);
        
        // ✅ Vérifie si l'utilisateur est connecté
        this.isAuthenticated = await this.authService.isAuthenticated();
         // 🔥 Forcer la navigation vers Welcome au premier lancement
    setTimeout(() => {
      this.router.navigate(['/welcome']);
    }, 1000);
      }
    });

    await this.initStorage();
  }

  // ✅ Initialiser le stockage
  async initStorage() {
    await this.storage.create();
  }

  // ✅ Fonction pour cacher le SplashScreen et ajouter une classe pour mobile
  async fixMobileDisplay() {
    try {
      await SplashScreen.hide(); // Cache l'écran de chargement pour éviter des conflits CSS
      document.body.classList.add('mobile-ready'); // Ajoute une classe CSS spécifique pour mobile
    } catch (error) {
      console.error('Erreur lors de la fermeture du SplashScreen:', error);
    }
  }

  // ✅ Vérifie si c'est la première ouverture et redirige vers "/welcome"
  async checkFirstLaunch() {
    await this.storage.clear(); // 🔥 Supprime toutes les données stockées pour tester
    this.router.navigate(['/welcome']); // ✅ Force la navigation
}


  // ✅ Fonction de recherche
  search(event: any) {
    const query = event.target.value.toLowerCase();
    console.log("Recherche :", query);
  }

  // ✅ Fonction de déconnexion
  async logout() {
    await this.authService.logout(); // 🔥 Supprime les données utilisateur
    this.isAuthenticated = false;
    this.router.navigate(['/login-client']); // 🔥 Redirige vers la page de connexion client
  }
}
