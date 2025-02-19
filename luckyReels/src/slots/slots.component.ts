import { Component } from '@angular/core';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.css'
})
export class SlotsComponent {
  slotMachine: SlotMachine;
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  visibleNumber1: number = 0;
  visibleNumber2: number = 0;
  visibleNumber3: number = 0;
  isRotating: boolean = false;

  constructor() {
    this.slotMachine = new SlotMachine();
  }


  private SMALL_WIN = new Set(['0-0-0',
    '0-0-1',
    '0-0-2',
    '0-0-3',
    '0-0-4',
    '0-0-5',
    '0-0-6',
    '0-0-7',
    '0-0-8',
    '0-1-0',
    '0-1-1',
    '0-1-2',
    '0-1-3',
    '0-1-4',
    '0-1-5',
    '0-1-6',
    '0-1-7',
    '0-1-8',
    '0-2-0',
    '0-2-1',
    '0-2-2',
    '0-2-3',
    '0-2-4',
    '0-2-5',
    '0-2-6',
    '0-2-7',
    '0-2-8',
    '0-3-0',
    '0-3-1',
    '0-3-2',
    '0-3-3',
    '0-3-4',
    '0-3-5',
    '0-3-6',
    '0-3-7',
    '0-3-8',
    '0-4-0',
    '0-4-1',
    '0-4-2',
    '0-4-3',
    '0-4-4',
    '0-4-5',
    '0-4-6',
    '0-4-7',
    '0-4-8',
    '0-5-0',
    '0-5-1',
    '0-5-2',
    '0-5-3',
    '0-5-4',
    '0-5-5',
    '0-5-6',
    '0-5-7',
    '0-5-8',
    '0-6-0',
    '0-6-1',
    '0-6-2',
    '0-6-3',
    '0-6-4',
    '0-6-5',
    '0-6-6',
    '0-6-7',
    '0-6-8',
    '0-7-0',
    '0-7-1',
    '0-7-2',
    '0-7-3',
    '0-7-4',
    '0-7-5',
    '0-7-6',
    '0-7-7',
    '0-7-8',
    '0-8-0',
    '0-8-1',
    '0-8-2',
    '0-8-3',
    '0-8-4',
    '0-8-5',
    '0-8-6',
    '0-8-7',
    '0-8-8',
    '1-0-0',
    '1-0-1',
    '1-0-2',
    '1-0-3',
    '1-0-4',
    '1-0-5',
    '1-0-6',
    '1-0-7',
    '1-0-8',
    '1-1-0',
    '1-2-0',
    '1-3-0',
    '1-4-0',
    '1-5-0',
    '1-6-0',
    '1-7-0',
    '1-8-0',
    '2-0-0',
    '2-0-1',
    '2-0-2',
    '2-0-3',
    '2-0-4',
    '2-0-5',
    '2-0-6',
    '2-0-7',
    '2-0-8',
    '2-1-0',
    '2-2-0',
    '2-3-0',
    '2-4-0',
    '2-5-0',
    '2-6-0',
    '2-7-0',
    '2-8-0',
    '3-0-0',
    '3-0-1',
    '3-0-2',
    '3-0-3',
    '3-0-4',
    '3-0-5',
    '3-0-6',
    '3-0-7',
    '3-0-8',
    '3-1-0',
    '3-2-0',
    '3-3-0',
    '3-4-0',
    '3-5-0',
    '3-6-0',
    '3-7-0',
    '3-8-0',
    '4-0-0',
    '4-0-1',
    '4-0-2',
    '4-0-3',
    '4-0-4',
    '4-0-5',
    '4-0-6',
    '4-0-7',
    '4-0-8',
    '4-1-0',
    '4-2-0',
    '4-3-0',
    '4-4-0',
    '4-5-0',
    '4-6-0',
    '4-7-0',
    '4-8-0',
    '5-0-0',
    '5-0-1',
    '5-0-2',
    '5-0-3',
    '5-0-4',
    '5-0-5',
    '5-0-6',
    '5-0-7',
    '5-0-8',
    '5-1-0',
    '5-2-0',
    '5-3-0',
    '5-4-0',
    '5-5-0',
    '5-6-0',
    '5-7-0',
    '5-8-0',
    '6-0-0',
    '6-0-1',
    '6-0-2',
    '6-0-3',
    '6-0-4',
    '6-0-5',
    '6-0-6',
    '6-0-7',
    '6-0-8',
    '6-1-0',
    '6-2-0',
    '6-3-0',
    '6-4-0',
    '6-5-0',
    '6-6-0',
    '6-7-0',
    '6-8-0',
    '7-0-0',
    '7-0-1',
    '7-0-2',
    '7-0-3',
    '7-0-4',
    '7-0-5',
    '7-0-6',
    '7-0-7',
    '7-0-8',
    '7-1-0',
    '7-2-0',
    '7-3-0',
    '7-4-0',
    '7-5-0',
    '7-6-0',
    '7-7-0',
    '7-8-0',
    '8-0-0',
    '8-0-1',
    '8-0-2',
    '8-0-3',
    '8-0-4',
    '8-0-5',
    '8-0-6',
    '8-0-7',
    '8-0-8',
    '8-1-0',
    '8-2-0',
    '8-3-0',
    '8-4-0',
    '8-5-0',
    '8-6-0',
    '8-7-0',
    '8-8-0',
  ]);
 

  spin() {
    this.slotMachine.generateRandomNumbers();
    console.log(this.slotMachine.collum1, this.slotMachine.collum2, this.slotMachine.collum3);
    if (this.isRotating) return;

    this.isRotating = true;
    const interval = setInterval(() => {
      this.visibleNumber1 = (this.visibleNumber1 + 1) % this.numbers.length;
      this.visibleNumber2 = (this.visibleNumber1 + 1) % this.numbers.length;
      this.visibleNumber3 = (this.visibleNumber1 + 1) % this.numbers.length;
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      this.visibleNumber1 = this.slotMachine.collum1;
      this.visibleNumber2 = this.slotMachine.collum2;
      this.visibleNumber3 = this.slotMachine.collum3;
      this.isRotating = false;
    }, 3000);
    this.checkWinningConditions();
  }

  private checkWinningConditions() {
    const combination = `${this.slotMachine.collum1}-${this.slotMachine.collum2}-${this.slotMachine.collum3}`;
    if (this.SMALL_WIN.has(combination)) {
      console.log("You won!");
    } else {
      console.log("Try again!");
    }
  }
}

class SlotMachine {
  collum1: number = 0;
  collum2: number = 0;
  collum3: number = 0;

  generateRandomNumbers() {
    this.collum1 = Math.floor(Math.random() * 9);
    this.collum2 = Math.floor(Math.random() * 9);
    this.collum3 = Math.floor(Math.random() * 9);
  }
}