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
        "apiKey": "AIzaSyCzNO4KrQoiZvrFOqv6daIiuYSD2VUe1Wc",
        "authDomain": "abstraccion-firebase.firebaseapp.com",
        "projectId": "abstraccion-firebase",
        "storageBucket": "abstraccion-firebase.appspot.com",
        "messagingSenderId": "270513918358",
        "appId": "1:270513918358:web:eae0cad78532ef45b04db7"
      })),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()), provideAnimationsAsync()
    ]
};
