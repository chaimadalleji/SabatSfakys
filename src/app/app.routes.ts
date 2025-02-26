import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage) },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },

  // ✅ Espace Client
  { 
    path: 'home-client', 
    loadComponent: () => import('./home/home.page').then(m => m.HomePage), 
    canActivate: [AuthGuard]
  },

  // ✅ Espace Vendeur
  { 
    path: 'home-vendeur', 
    loadComponent: () => import('./home-vendeur/home-vendeur.page').then(m => m.HomeVendeurPage), 
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: 'welcome', pathMatch: 'full' } // ✅ Rediriger vers la page d'accueil au démarrage
];
