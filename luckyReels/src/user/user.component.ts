import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../app/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreDataService } from '../app/firestore-data.service';
import { User } from '../app/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatButton],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userData: User[] | null = null;
  loading = true;
  private subscription: Subscription | null = null;

  constructor(
    public authService: AuthService,
    public dialogRef: MatDialogRef<UserComponent>,
    private dataService: FirestoreDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserData() {
    this.loading = true;

    const uid = this.authService.getUID();

    if (!uid) {
      this.loading = false;
      return;
    }

    this.subscription = this.dataService.getDataOfSingleUser(uid)
      .subscribe({
        next: (users) => {
          this.userData = users;
          this.loading = false;

          if (!users || users.length === 0) {
            // nothing
          }
        },
      });
  }

  clearWallet() {
    if (!this.userData || this.userData.length === 0) return;
    const user = this.userData[0];
    this.dataService.updateWallet(user.uid, user.wallet - user.wallet);
  }

  // 🔹 HERE: also add to lifetimeCoins for Futurama achievement
 addToWallet() {
  if (!this.userData || this.userData.length === 0) return;

  const user = this.userData[0];
  const uid = user.uid;
  const amount = 10;

  const newWallet = user.wallet + amount;
  const newLifetime = (user.lifetimeCoins || 0) + amount;

  // update wallet (existing behaviour)
  this.dataService.updateWallet(uid, newWallet);

  // update lifetimeCoins in Firestore
  this.dataService.updateLifetimeCoins(uid, newLifetime);
}




  async logout() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    return this.authService.logout();
  }

  navigateToGame(route: string) {
    this.router.navigate([route]);
    this.dialogRef.close();
  }
}
