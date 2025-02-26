import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule], 
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this._storage = await this.storage.create();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ✅ Vérifie si l'utilisateur est connecté et ne se trouve PAS sur login/register/welcome
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated() && 
           !['/login', '/register', '/welcome'].includes(this.router.url);
  }

  // ✅ Vérifie si l'utilisateur est sur une page publique
  isPublicPage(): boolean {
    return ['/login', '/register', '/welcome'].includes(this.router.url);
  }

  search(event: any) {
    const query = event.target.value.toLowerCase();
    console.log("Recherche :", query);
  }
}
