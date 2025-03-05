import { ApplicationConfig, inject, PLATFORM_ID, provideZoneChangeDetection, REQUEST } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FirebaseApp, initializeApp, initializeServerApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

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
    provideAuth(() => getAuth(inject(FirebaseApp))), provideFirebaseApp(() => initializeApp({ projectId: "taskmanager-e27ea", appId: "1:404785636178:web:92167d92ab877f9975108b", storageBucket: "taskmanager-e27ea.firebasestorage.app", apiKey: "AIzaSyBTzwIYp3-Qs_EAj8j9zikuu01XA5vvme4", authDomain: "taskmanager-e27ea.firebaseapp.com", messagingSenderId: "404785636178", measurementId: "G-16BS8BQTVE" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideAppCheck(() => {
  // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
  const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
  return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
}), provideFirestore(() => getFirestore()),
  ]
};