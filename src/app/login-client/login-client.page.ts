import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.page.html',
  styleUrls: ['./login-client.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule]
})
export class LoginClientPage  {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.form.username || !this.form.password) {
      this.errorMessage = "Veuillez remplir tous les champs.";
      return;
    }

    this.authService.login(this.form.username, this.form.password).subscribe(
      data => {
        console.log('Connexion réussie', data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoggedIn = true;
        this.router.navigate(['/home-client']);
      },
      err => {
        console.error('Erreur de connexion', err);
        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
      }
    );
  }
  redirectRegister(): void {
    this.router.navigate(['/register-client']);
  }
  goBack(): void {
    this.router.navigate(['/home-client']);
  }
  
  signInWithGoogle() {
    console.log("Connexion avec Google");
  }

  signInWithFacebook() {
    console.log("Connexion avec Facebook");
  }

  signInWithGithub() {
    console.log("Connexion avec GitHub");
  }
}