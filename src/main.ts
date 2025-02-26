import { bootstrapApplication } from '@angular/platform-browser'; 
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './app/services/auth.service'; // ✅ Import du service d'auth

// ✅ Ajouter Ionicons dynamiquement dans le <head> du document
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/css/ionicons.min.css';
document.head.appendChild(link);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage,
    AuthService
  ],
});
