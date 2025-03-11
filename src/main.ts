import { bootstrapApplication } from '@angular/platform-browser'; 
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Storage } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http';

// ✅ Importations nécessaires pour Google Auth
import { SocialAuthServiceConfig, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

// ✅ Ajouter Ionicons dynamiquement dans le <head> du document
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/7.1.0/css/ionicons.min.css';
document.head.appendChild(link);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    Storage,

    // ✅ Ajout du provider pour Google Auth (sans modifier ton code)
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('VOTRE_GOOGLE_CLIENT_ID') // 🔥 Remplace par ton ID Client Google OAuth
          }
        ]
      } as SocialAuthServiceConfig
    },
    SocialAuthService
  ],
});
