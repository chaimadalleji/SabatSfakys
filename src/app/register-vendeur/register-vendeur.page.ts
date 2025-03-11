import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Photo } from '../photo/Photo';
import { PhotoService } from '../photo/photo.service';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http'; // Ajout pour mieux gérer les erreurs HTTP

@Component({
  selector: 'app-register-vendeur',
  templateUrl: './register-vendeur.page.html',
  styleUrls: ['./register-vendeur.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterVendeurPage implements OnInit {
  allPhoto: Photo[] = [];
  materiauxOptions = ['Cuir', 'Coton bio', 'Textile recyclé'];
  methodesProductionOptions = ['Énergie renouvelable', 'Production locale', 'Sans déchet'];
  programmeRecyclageOptions = ['Acceptation de retours usagés', 'Recyclage sur place'];
  transportLogistiqueOptions = ['Transport neutre en carbone', 'Livraison verte'];
  initiativesSocialesOptions = ['Collaboration avec artisans locaux', 'Insertion professionnelle'];

  form: any = {
    username: null,
    email: null,
    adresse: null,
    telephone: null,
    password: null,
    statut: 'EN_ATTENTE',
    logo: { id: 0, name: '', url: '' },
    numeroIdentificationEntreprise: null,
    materiauxUtilises: null,
    methodesProduction: null,
    programmeRecyclage: null,
    transportLogistiqueVerte: null,
    initiativesSociales: null,
    scoreEcologique: null,
  };

  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService,
    private router: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.getPhotos();
  }

  onSubmit(): void {
    // Vérification des champs obligatoires
    if (!this.form.username || !this.form.email || !this.form.password || !this.form.telephone || 
        !this.form.adresse || !this.form.logo || !this.form.numeroIdentificationEntreprise || 
        !this.form.materiauxUtilises || !this.form.methodesProduction || !this.form.programmeRecyclage || 
        !this.form.transportLogistiqueVerte || !this.form.initiativesSociales || !this.form.scoreEcologique) {
      this.errorMessage = "Tous les champs obligatoires doivent être remplis.";
      this.isRegisterFailed = true;
      return;
    }

    const userData = {
      username: this.form.username,
      email: this.form.email,
      telephone: this.form.telephone,
      adresse: this.form.adresse,
      logo: this.form.logo,
      password: this.form.password,
      statut: 'EN_ATTENTE',
      numeroIdentificationEntreprise: this.form.numeroIdentificationEntreprise,
      materiauxUtilises: this.form.materiauxUtilises,
      methodesProduction: this.form.methodesProduction,
      programmeRecyclage: this.form.programmeRecyclage,
      transportLogistiqueVerte: this.form.transportLogistiqueVerte,
      initiativesSociales: this.form.initiativesSociales,
      scoreEcologique: this.form.scoreEcologique,
    };

    console.log("🛠 Données envoyées à l'API:", userData);

    this.authService.registerVendeur(
      userData.username, userData.email, userData.password, userData.adresse, 
      userData.logo, userData.telephone, userData.numeroIdentificationEntreprise, 
      userData.materiauxUtilises, userData.methodesProduction, userData.programmeRecyclage, 
      userData.transportLogistiqueVerte, userData.initiativesSociales, userData.scoreEcologique
    ).subscribe({
      next: (data) => {
        console.log('✅ Inscription réussie :', data);
        this.isSuccessful = true;
        this.isRegisterFailed = false;

        // Sauvegarde utilisateur
        this.tokenStorage.saveUser(data);

        this.reloadPage();
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Erreur lors de l’enregistrement :', err);

        if (err.error) {
          console.error('📌 Détails de l’erreur serveur :', err.error);
        }

        this.errorMessage = err.error.message || 'Enregistrement échoué';
        this.isRegisterFailed = true;
      }
    });
  }

  getPhotos(): void {
    this.photoService.get().subscribe({
      next: (data) => {
        this.allPhoto = data;
        console.log('🖼️ Photos récupérées :', this.allPhoto);
      },
      error: (err) => console.error('⚠️ Erreur lors de la récupération des photos:', err)
    });
  }

  reloadPage(): void {
    this.router.navigate(['/login-vendeur']);
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }

  signInWithGoogle() {
    console.log("🔵 Connexion avec Google");
  }

  signInWithFacebook() {
    console.log("🔵 Connexion avec Facebook");
  }

  signInWithGithub() {
    console.log("⚫ Connexion avec GitHub");
  }
}
