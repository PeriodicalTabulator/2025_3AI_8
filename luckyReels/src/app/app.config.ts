import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AngularFireModule } from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCC48HTBJxIsUQZwyHH7Jr-rXAj1EMOuYc",
  authDomain: "luckyreels-project.firebaseapp.com",
  projectId: "luckyreels-project",
  storageBucket: "luckyreels-project.firebasestorage.app",
  messagingSenderId: "1022728474859",
  appId: "1:1022728474859:web:22ed75f25ae6f65c0c6eae",
  measurementId: "G-8DS57TEP7D"
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig),AngularFireAuthModule,AngularFirestoreModule)
  ]
};
