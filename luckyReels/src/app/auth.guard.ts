import { CanActivateFn } from '@angular/router';
import { FirestoreDataService } from './firestore-data.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
 return authService.isAuthenticatedBean();
};
