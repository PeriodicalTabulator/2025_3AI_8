import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { UserComponent } from '../user/user.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButton,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'luckyReels';
  isSignedIn: boolean = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  currentUser() {
    return this.authService.userEmail;
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
    this.isSignedIn = false;
  }


  openUserDialog() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
  
  }
}
