import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection, REQUEST } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FirebaseApp, initializeApp, initializeServerApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { isPlatformBrowser } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(withEventReplay()), 
    provideHttpClient(),
    provideFirebaseApp(() => {
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        return initializeApp(environment.firebaseConfig);
      }
      // Optional, since it's null in dev-mode and SSG
      const request = inject(REQUEST, { optional: true });
      const authIdToken = request?.headers.get('authorization')?.split("Bearer ")[1];
      return initializeServerApp(environment.firebaseConfig, {
        authIdToken,
        releaseOnDeref: request || undefined
      });
    }),
    provideAuth(() => getAuth(inject(FirebaseApp))),
  ]
};