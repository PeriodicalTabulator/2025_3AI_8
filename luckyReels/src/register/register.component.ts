import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/auth.service';
import { User } from '../app/user';
import { FirestoreDataService } from '../app/firestore-data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule, MatButtonModule,ReactiveFormsModule,MatDialogModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private firestore: FirestoreDataService,
    private authService: AuthService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  
  async onRegister() {
    if (this.registerForm.valid) {
        const formValue = this.registerForm.value;
      
        const credential = await  this.authService.signup(
          formValue.email, 
          formValue.password
        );
      
        const uid = credential.user?.uid;
        
        const user: User = {
          uid: uid || '' ,
          userName: formValue.userName,
          idNumber: formValue.idNumber,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          wallet: 0
        };
   
        await this.firestore.addUser(user);

        this.dialogRef.close(user);
      } 
  }

  addData(user: User){
    this.firestore.addUser(user);
    console.log("added user");
  }
  onCancel() {
    this.dialogRef.close();
  }
}

