import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-roulette',
  imports: [NgFor,NgClass,NgStyle, MatButton],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.css'
})
export class RouletteComponent {
  @ViewChild('zeroBets') zeroBets!: ElementRef;
  numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  red = []
  isSpinning = false;
  spinDuration = 4000;
  bets: {number: number | string, amount: number}[] = [];
  selectedChip = 1;
  currentBetAmount = 0;
  numberRows = [
    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
  ];
  
  redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  chipValues = [
    {value:1, color:'red'},
    {value:5, color:'blue'},
    {value:10, color:'green'},
    {value:50, color:'white'},
  ]

//need to be fixed
  resetBets(){
    const element = this.zeroBets.nativeElement;
    if (element as HTMLElement && element.parentNode as HTMLElement) {
      element.parentNode.removeChild(element);
    }
    this.bets = [];
    this.currentBetAmount = 0;
  }

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
  
  selectChip(value:number){
    this.selectedChip = value;
  }
//need them to stack on each other and not go out of elements
  placeBet(betTarget: number | string): void {
  
   this.currentBetAmount += this.selectedChip;
   this.bets.push({ number: betTarget, amount: this.selectedChip });
   console.log(this.bets)
   let container: HTMLElement;
   if (betTarget === 0) {
       container = this.zeroBets.nativeElement;
   } else if (typeof betTarget === 'number') {
       container = document.getElementById(`bet-${betTarget}`) as HTMLElement;
   } else {
       container = document.getElementById(`bet-${betTarget}`) as HTMLElement;
   }
   
   if (!container) return;
   
   const existingChips = container.querySelectorAll('.bet-chip').length;

   const chip = document.createElement('div');
   chip.className = 'bet-chip';
   chip.style.backgroundColor = this.getChipColor(this.selectedChip);
   chip.textContent = this.selectedChip.toString();
   
   //const stackPosition = existingChips % 4; 
   let offsetX = 0, offsetY = 0;
   
   /*switch(stackPosition) {
       case 0: offsetX = 0; offsetY = 0; break;
       case 1: offsetX = 5; offsetY = 5; break;
       case 2: offsetX = -5; offsetY = 5; break;
       case 3: offsetX = 0; offsetY = 10; break;
   }*/
   
   chip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
   chip.style.zIndex = existingChips.toString();
   
   container.appendChild(chip);
  
  }


  spinWheel() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    const wheel = document.querySelector('.outerRim') as HTMLElement;
    const ball = document.querySelector('.ballTrack') as HTMLElement;
    
    const rotations = 5 + Math.random() * 5;
    const finalAngle = rotations * 360 + (Math.random() * 360);

    ball.style.transition = `transform ${this.spinDuration}ms cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    ball.style.transform = `rotate(${finalAngle}deg)`;

    wheel.style.transition = `transform ${this.spinDuration}ms cubic-bezier(0.17, 0.67, 0.21, 0.99)`;
    wheel.style.transform = `rotate(${finalAngle}deg)`;
    
    console.log(finalAngle)
    
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

  getChipColor(value: number): string {
    const chip = this.chipValues.find(c => c.value === value);
    return chip ? chip.color : 'red';
  }

  isRed(num: number): boolean {
    return this.redNumbers.includes(num);
  }
  
  isBlack(num: number): boolean {
    return num !== 0 && !this.redNumbers.includes(num);
  }
  
  calculateWinnings(winningNumber: number): void {}

}
