import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterModule], // ✅ Ajout des modules nécessaires
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  selectedRole: string = 'client';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedRole = params['role'] || 'client';
    });
  }

  login() {
    if (!this.email || !this.password) {
      alert("Veuillez entrer votre email et mot de passe.");
      return;
    }

    console.log(`Connexion en tant que ${this.selectedRole}`);

    // Simule une connexion (remplacer par un backend plus tard)
    this.authService.login(this.email, this.password, this.selectedRole);

    // Rediriger selon le rôle
    this.router.navigate([this.selectedRole === 'client' ? '/home-client' : '/home-vendeur']);
  }
}
