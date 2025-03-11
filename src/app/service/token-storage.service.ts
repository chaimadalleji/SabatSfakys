import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private storage: Storage | null = null;

  constructor(private storageService: Storage) {}

  // Initialisation du stockage dans le service
  async init() {
    if (!this.storage) {
      this.storage = await this.storageService.create(); // Créer le stockage
    }
    return this.storage;
  }

  // Méthodes d'utilisation de Storage
  async saveToken(token: string) {
    await this.init(); // Assurez-vous que Storage est bien initialisé
    return this.storage?.set('token', token);
  }

  async saveUser(user: any) {
    await this.init(); // Assurez-vous que Storage est bien initialisé
    return this.storage?.set('user', user);
  }

  getToken() {
    return this.storage?.get('token');
  }

  getUser() {
    return this.storage?.get('user');
  }
}
