import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../photo/Photo';
import { TokenRequest } from '../register-client/TokenRequest';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  // ✅ Connexion avec Google
  loginWithGoogle(tokenRequest: TokenRequest): Observable<any> {
    console.log(tokenRequest, "token service");
    return this.http.post(AUTH_API + 'google', tokenRequest, httpOptions);
  }

  // ✅ Connexion avec email & mot de passe
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  // ✅ Inscription Client
  register(username: string, email: string, password: string, adresse: string, telephone: string, sexe: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      adresse,
      telephone,
      sexe,
    }, httpOptions);
  }

  // ✅ Inscription Vendeur
  registerVendeur(username: string, email: string, password: string, adresse: string, logo: Photo, telephone: string, numeroIdentificationEntreprise: string, materiauxUtilises: string, methodesProduction: string, programmeRecyclage: string, transportLogistiqueVerte: string, initiativesSociales: string, scoreEcologique: number): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      adresse,
      telephone,
      logo,
      numeroIdentificationEntreprise,
      materiauxUtilises,
      methodesProduction,
      programmeRecyclage,
      transportLogistiqueVerte,
      initiativesSociales,
      scoreEcologique,
      statut: "EN_ATTENTE", // ✅ Ajout du statut
      role: "ROLE_FOURNISSEUR",
    }, httpOptions);
  }

  // ✅ Vérifier si l'utilisateur est authentifié (existe dans le stockage local)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // ✅ Vérifie si un token existe
  }

  // ✅ Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('token'); // ✅ Supprime le token
    localStorage.removeItem('user'); // ✅ Supprime les infos utilisateur
  }
}
