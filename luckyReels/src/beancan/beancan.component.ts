import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-beancan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './beancan.component.html',
  styleUrls: ['./beancan.component.css']
})
export class BeancanComponent {
  userInput: number = 50;
  userNumber: number = 50;
  isReverse: boolean = false;
  generatedNumber: number | null = null;
  resultMessage: string = '';

  constructor(private router: Router) {}

  generateRandomNumber() {
  
    const clamped = Math.min(99, Math.max(1, this.userInput));
    this.userNumber = this.isReverse ? 100 - clamped : clamped;

    const randomNumber = Math.floor(Math.random() * 99) + 1;
    this.generatedNumber = randomNumber;

    this.resultMessage = this.isReverse
      ? randomNumber >= this.userNumber ? 'You won!' : 'You lose!'
      : randomNumber <= this.userNumber ? 'You won!' : 'You lose!';
  }

  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}
