import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Import obligatoire
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, IonicModule , RouterModule], // ✅ Ajout de IonicModule ici
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(private router: Router) {}

  selectAccount(role: string) {
    if (role === 'client') {
      this.router.navigate(['/login-client']);
    } else if (role === 'vendeur') {
      this.router.navigate(['/login-vendeur']);
    }
  }
  
}
