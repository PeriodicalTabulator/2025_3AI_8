import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,CommonModule,ReactiveFormsModule,MatDialogModule,MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    private router: Router
  
  ) {
      if(localStorage.getItem('token') != null){ this.navigateToGame('slots');
      this.dialogRef.close();
      }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.dialogRef.close(this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      this.navigateToGame('slots');
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
  
openRegisterDialog() {
  const dialogRef = this.dialog.open(RegisterComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Register successful', result);
    }
  });
}


navigateToGame(route: string) {
  this.router.navigate([route]);
}

}
