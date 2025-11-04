import { CanActivateFn } from '@angular/router';
import { FirestoreDataService } from './firestore-data.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
 const logged = authService.isAuthenticated$
 const router = inject(Router)
 return authService.isAuthenticated$.pipe(
    tap(isAuth => {
      if (!isAuth) {
        router.navigate(['/']); 
      }
    }),
  );
};
