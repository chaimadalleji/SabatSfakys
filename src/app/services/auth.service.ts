import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string, role: string) {
    // Stocke un token factice et le rôle de l'utilisateur
    localStorage.setItem('token', 'fake-jwt-token');
    localStorage.setItem('role', role); // Stocke le rôle utilisateur

    if (role === 'client') {
      this.router.navigate(['/home-client']);
    } else if (role === 'vendeur') {
      this.router.navigate(['/home-vendeur']);
    }
  }

  logout() {
    localStorage.removeItem('token'); // Supprime le token de l'utilisateur
    localStorage.removeItem('role');  // Supprime le rôle de l'utilisateur
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
  

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Vérifie si un token est présent
  }

  getRole(): string | null {
    return localStorage.getItem('role'); // Retourne le rôle de l'utilisateur
  }
}
