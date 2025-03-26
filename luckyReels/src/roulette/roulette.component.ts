import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-roulette',
  imports: [NgFor,NgClass,NgStyle],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.css'
})
export class RouletteComponent {

  numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  isSpinning = false;
  spinDuration = 5000;


  getNumberClass(num: number): string {
    return num < 10 ? 'single' : 'double';
  }

  getRotationAngle(index: number): number {
    return (index * (360 / this.numbers.length));
  }

  getSectorStyle(index: number): any {
    return {
      transform: `rotate(${this.getRotationAngle(index)}deg)`
    };
  }
  
  
  spinWheel() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    const wheel = document.querySelector('.outerRim') as HTMLElement;
    const ball = document.querySelector('.ball') as HTMLElement;
    
    const rotations = 5 + Math.random() * 5;
    const finalAngle = rotations * 360 + (Math.random() * 360);
    
    wheel.style.transition = `transform ${this.spinDuration}ms cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    wheel.style.transform = `rotate(${finalAngle}deg)`;
    
    ball.style.transition = `transform ${this.spinDuration}ms cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    ball.style.transform = `rotate(${-finalAngle * 1.5}deg)`;
    
    setTimeout(() => {
      this.isSpinning = false;
      wheel.style.transition = 'none';
      ball.style.transition = 'none';
      
      const normalizedAngle = finalAngle % 360;
      const winningIndex = Math.floor(normalizedAngle / (360 / this.numbers.length));
      const winningNumber = this.numbers[this.numbers.length - 1 - winningIndex];
      console.log('Winning number:', winningNumber);
    }, this.spinDuration);
  }

}

