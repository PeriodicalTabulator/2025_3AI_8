import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../app/auth.service';
import  { MatDialogRef } from '@angular/material/dialog';
import { FirestoreDataService } from '../app/firestore-data.service';
import { User } from '../app/user';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';

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

  constructor(public authService: AuthService, public dialogRef: MatDialogRef<UserComponent>, private dataService: FirestoreDataService, private router:Router) { 
  
  }
  ngOnInit():void{
    this.loadUserData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadUserData(){
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
          }
        },
      });
  }

  clearWallet(){
    this.dataService.updateWallet(this.userData![0].uid, this.userData![0].wallet - this.userData![0].wallet)
  }
  addToWallet(){
    this.dataService.updateWallet(this.userData![0].uid, this.userData![0].wallet + 10);
  }

  async logout(){
    this.dialogRef.close();
    this.router.navigate(['/login']);
    return this.authService.logout();
  }
  navigateToGame(route: string) {
    this.router.navigate([route]);
    this.dialogRef.close();
  }

}

