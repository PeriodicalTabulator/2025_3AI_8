import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, IsActiveMatchOptions, Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { UserComponent } from '../user/user.component';
import { NgIf } from '@angular/common';
import { User } from './user';
import { FirestoreDataService } from './firestore-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButton, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'luckyReels';
  isSignedIn: boolean = false;
  userData: User[] | null = null
  subscription: Subscription | null = null;
  wallet: number | null = null;

  constructor(
    public authService: AuthService,
    public router: Router,
    private dialog: MatDialog,
    private dataService: FirestoreDataService
  ) {
   // this.userData = this.userComponent.userData;
    console.log(this.userData);
  }
 /* currentUser()
    return this.authService.userEmail;
  }
*/
ngOnInit(){
   this.subscription = this.dataService.userData$.subscribe(users => 
      {
        this.userData = users || [];
        this.wallet = users?.[0].wallet;
        console.log('received user data:', users);
      }
    );
}  
navigateToGame(route: string) {
    this.router.navigate([route]);
  }

  openLoginDialog() {
   const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
    this.isSignedIn = true;
  }

  signOut(){
    this.authService.logout();
    localStorage.clear();
  }


  openUserDialog() {
   const dialogRef = this.dialog.open(UserComponent, {
     width: '400px'
    });

  dialogRef.afterClosed()
 
  }
}
