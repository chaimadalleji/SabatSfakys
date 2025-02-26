import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // ✅ Redirige l'utilisateur vers la page de connexion s'il n'est pas connecté
      return false;
    }
    return true; // ✅ Autorise l'accès si l'utilisateur est connecté
  }
}
