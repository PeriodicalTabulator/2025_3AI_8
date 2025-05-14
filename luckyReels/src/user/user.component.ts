import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthService } from '../app/auth.service';
import  { MatDialogRef } from '@angular/material/dialog';
import { FirestoreDataService } from '../app/firestore-data.service';
import { User } from '../app/user';

@Component({
  selector: 'app-user',
  imports: [CommonModule, MatButton],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  user: any = [];
  constructor(public authService: AuthService, public dialogRef: MatDialogRef<UserComponent>, private dataService: FirestoreDataService) { 
   this.user = this.dataService.getDataOfSingleUser(this.authService.uidUser)
  console.log(this.user)
  }



  logOut(){
    this.dialogRef.close();
    return this.authService.logout();
  }

}

