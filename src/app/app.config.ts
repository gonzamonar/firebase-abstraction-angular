import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideFirebaseApp(() => initializeApp({
        "apiKey": "AIzaSyA3qjaXPmT2y-WHpltt-LzWOP_JhoE1yKE",
        "authDomain": "ng-firebase-abstraction.firebaseapp.com",
        "projectId": "ng-firebase-abstraction",
        "storageBucket": "ng-firebase-abstraction.appspot.com",
        "messagingSenderId": "188220616045",
        "appId": "1:188220616045:web:94d4d95b5e19745ca9be64"
      })),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()), provideAnimationsAsync()
    ]
};
