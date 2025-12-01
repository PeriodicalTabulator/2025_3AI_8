import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FirestoreDataService } from './firestore-data.service';
import { filter, first, map, switchMap, tap } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const dataService = inject(FirestoreDataService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    filter(user => !!user),
    switchMap(user => dataService.getDataOfSingleUser(user!.uid)),
    filter(users => users.length > 0),
    map(users => !!users[0]?.['admin']),
    first()
  );
};
