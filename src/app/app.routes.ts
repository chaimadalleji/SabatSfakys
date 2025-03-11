import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'welcome', loadComponent: () => import('./welcome/welcome.page').then(m => m.WelcomePage) },
  { path: 'login-client', loadComponent: () => import('./login-client/login-client.page').then(m => m.LoginClientPage) },
  { path: 'login-vendeur', loadComponent: () => import('./login-vendeur/login-vendeur.page').then(m => m.LoginVendeurPage) },
  { path: 'register-client', loadComponent: () => import('./register-client/register-client.page').then(m => m.RegisterClientPage) },
  { path: 'register-vendeur', loadComponent: () => import('./register-vendeur/register-vendeur.page').then(m => m.RegisterVendeurPage) },

  // ✅ Espace Client
  { path: 'home-client', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },

  // ✅ Espace Vendeur
  { path: 'home-vendeur', loadComponent: () => import('./home-vendeur/home-vendeur.page').then(m => m.HomeVendeurPage) },
  { path: 'cart', loadComponent: () => import('./cart/cart.page').then(m => m.CartPage) },
  { path: 'favorites', loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage) },
  { path: 'categories', loadComponent: () => import('./categories/categories.page').then(m => m.CategoriesPage) },
  { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) },
  { path: 'orders', loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage) },
  { path: 'products', loadComponent: () => import('./products/products.page').then(m => m.ProductsPage) },

  { path: 'photo', loadComponent: () => import('./photo/photo.page').then(m => m.PhotoPage) }, // ✅ Ajoute cette ligne
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
     {
    path: 'create-photo',
    loadComponent: () => import('./photo/create-photo/create-photo.page').then( m => m.CreatePhotoPage)
  },
  
    
// ✅ Rediriger vers la page d'accueil au démarrage
];
