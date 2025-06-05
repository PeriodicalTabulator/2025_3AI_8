import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-beancan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule
  ],
  templateUrl: './beancan.component.html',
  styleUrls: ['./beancan.component.css']
})
export class BeancanComponent {
  @ViewChild('bombElement') bombElement!: ElementRef;
  userInput: number = 50;
  userNumber: number = 50;
  isReverse: boolean = false;
  generatedNumber: number | null = null;
  resultMessage: string = '';
  isExploded: boolean = false;
  isAnimating: boolean = false;
  showNumber: number | null = null;

  constructor(private router: Router) {}

  generateRandomNumber() {
    this.isExploded = false;
    this.resultMessage = '';
  
    const clamped = Math.min(99, Math.max(1, this.userInput));
    this.userNumber = this.isReverse ? 100 - clamped : clamped;

    const randomNumber = Math.floor(Math.random() * 99) + 1;
    this.generatedNumber = randomNumber;

    this.startGame();
  }

  startGame() {
    this.isAnimating = true;
    
    if (this.bombElement) {
      this.bombElement.nativeElement.classList.add('bombactivated');
    }
    
    setTimeout(() => {
      if (this.bombElement) {
        this.bombElement.nativeElement.classList.remove('bombactivated');
      }
      
      this.winningConditions();
      this.isAnimating = false;
    }, 2000);
  }
  
  winningConditions() {
    if (this.isReverse == false) {
      if (this.generatedNumber! >= this.userNumber) {
         this.showNumber = this.generatedNumber;
        this.resultMessage = 'Bomb didnt explode. You won!';
        this.isExploded = false;
      } else {
        this.showNumber = this.generatedNumber;
        this.resultMessage = 'Bomb exploded. You lost!';
        this.isExploded = true;
      }
    } else {
      if (this.generatedNumber! <= this.userNumber) {
         this.showNumber = this.generatedNumber;
        this.resultMessage = 'Bomb didnt explode. You won!';
        this.isExploded = false;
      } else {
         this.showNumber = this.generatedNumber;
        this.resultMessage = 'Bomb exploded. You lost!';
        this.isExploded = true;
      }
    }
  }
  
  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}