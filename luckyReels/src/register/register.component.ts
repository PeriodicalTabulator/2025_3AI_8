import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, Validators, ReactiveFormsModule, MaxLengthValidator, MinLengthValidator } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,MatInputModule, MatButtonModule,ReactiveFormsModule,MatDialogModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegisterComponent>
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      idNumber: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.dialogRef.close(this.registerForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}

