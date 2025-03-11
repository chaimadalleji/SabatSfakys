import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { FormsModule } from '@angular/forms';
import { TokenRequest } from './TokenRequest';
import { SocialAuthService, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, GoogleSigninButtonModule],
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
  private tokenRequest: TokenRequest = new TokenRequest();
  user: any;
  isLoggedIn: boolean = false;
 private accessToken =''; 
  form: any = {
    username: null,
    email: null,
    adresse: null,
    telephone: null,
    password: null,
    sexe: null,
  };
  
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private authServiceGoogle: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authServiceGoogle.authState.subscribe(user => {
      this.user = user;
      if (user && user.idToken) {
        console.log("🔵 Connexion réussie avec Google:", user);
        this.tokenRequest.token = user.idToken;
        this.signinGoogle();
      } else {
        console.warn("⚠ Aucun token Google reçu !");
      }
    });
  }

  // ✅ Fonction appelée au clic sur "Connexion avec Google"
  signInWithGoogle(): void {
    console.log("🟢 Tentative de connexion avec Google...");

    // Lancer la redirection vers Google pour l'authentification
    this.authServiceGoogle.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(user => {
        if (user && user.idToken) {
          console.log("✅ Token Google reçu :", user.idToken);
          this.tokenRequest.token = user.idToken;
          this.signinGoogle();
        } else {
          console.error("❌ Erreur : Aucun token reçu depuis Google.");
        }
      })
      .catch(error => {
        console.error("❌ Erreur lors de la connexion Google :", error);
      });
  }

  signinGoogle(): void {
    this.tokenRequest.token = this.accessToken;
    console.log("🔄 Envoi du token Google à l'API...", this.tokenRequest);
  
    this.authService.loginWithGoogle(this.tokenRequest).subscribe(
      data => {
        console.log("Réponse de l'API après connexion Google:", data);
  
        if (!data || !data.accessToken) {
          console.error("❌ L'API ne retourne pas un `accessToken` valide !");
          return;
        }
  
        //Corrige l'accès aux données utilisateur
        const user = {
          id: data.id,
          username: data.username,
          email: data.email,
          role: data.role,
        };
  
        //Sauvegarde le token & utilisateur
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(user);
  
        // Mise à jour de `isLoggedIn`
        this.isLoggedIn = !!this.tokenStorage.getToken();
        console.log("isLoggedIn après Google Login:", this.isLoggedIn);
  
        // Redirection vers la page d'accueil
        this.router.navigate(['/accueil']);
      },
      err => {
        console.error("❌ Erreur lors de la connexion Google:", err);
      }
    );
  }
  


  onSubmit(): void {
    if (!this.form.username || !this.form.email || !this.form.password || !this.form.telephone || !this.form.adresse || !this.form.sexe) {
      this.errorMessage = "Tous les champs obligatoires doivent être remplis.";
      this.isRegisterFailed = true;
      return;
    }

    const userData = {
      username: this.form.username,
      email: this.form.email,
      telephone: this.form.telephone,
      adresse: this.form.adresse,
      password: this.form.password,
      sexe: this.form.sexe,
    };

    this.authService.register(userData.username, userData.email, userData.password, userData.adresse, userData.telephone, userData.sexe)
      .subscribe(
        data => {
          console.log('✅ Inscription réussie :', data);
          this.isSuccessful = true;
          this.isRegisterFailed = false;
          this.tokenStorage.saveUser(data);
          this.router.navigate(['/login-client']);
        },
        err => {
          console.error('❌ Erreur lors de l’enregistrement :', err);
          this.errorMessage = err.error.message || 'Enregistrement échoué';
          this.isRegisterFailed = true;
        }
      );
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }
}
