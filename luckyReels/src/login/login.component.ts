import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,CommonModule,ReactiveFormsModule,MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.dialogRef.close(this.loginForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
