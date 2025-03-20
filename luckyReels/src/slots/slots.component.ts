
import { Component,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-slots',
  imports: [MatCardModule,MatButtonModule,MatFormFieldModule,MatInputModule, NgFor],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.css'
})

export class SlotsComponent {
  @ViewChild('reel1') reel1!: ElementRef;
  @ViewChild('reel2') reel2!: ElementRef;
  @ViewChild('reel3') reel3!: ElementRef;

  fruitsList: fruits[] = [
    new fruits(0, 'cherry.png', 10),
    new fruits(1, 'banana.png', 20),
    new fruits(2, 'watermelon.png', 30),
    new fruits(3, 'citrus.png', 40),
    new fruits(4, 'plum.png', 50),
    new fruits(5, 'orange.png', 50),
    new fruits(6, 'apple.png', 60),
    new fruits(7, 'bar.png', 70),
    new fruits(8, 'seven.png', 100),
  ];
  numbers: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  youWon: string = "";
  disableButton:boolean = false;
  slotMachine = new SlotMachine(this.fruitsList);


  private BIG_WIN = new Set([
    '8-8-8'
  ]);
  
  private MID_WIN = new Set([
    '1-1-1',
    '2-2-2',
    '3-3-3',
    '4-4-4',
    '5-5-5',
    '6-6-6',
    '7-7-7'
  ])
  
  private SMALL_WIN = new Set([
    '0-0-0',
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
  constructor(private router: Router) {}


  spin() {
    this.slotMachine.generateRandomNumbers();
    this.disableButton = true;
    console.log( this.slotMachine.collum1, this.slotMachine.collum2, this.slotMachine.collum3);
    this.youWon = "";
  
    this.reel1.nativeElement.classList.add('rolling');
    this.reel2.nativeElement.classList.add('rolling');
    this.reel3.nativeElement.classList.add('rolling');
  
    setTimeout(() => {
      this.reel1.nativeElement.classList.remove('rolling');
      this.reel2.nativeElement.classList.remove('rolling');
      this.reel3.nativeElement.classList.remove('rolling');
  
      const offset:number = 480;

      const itemHeight = 120; 
      const position1 = -(this.slotMachine.collum1!.id * itemHeight) + offset ;
      const position2 = -(this.slotMachine.collum2!.id * itemHeight) + offset ;
      const position3 = -(this.slotMachine.collum3!.id * itemHeight)+ offset ;
      
      console.log(position1,position2,position3);

      this.reel1.nativeElement.style.transform = `translateY(${position1}px)`;
      this.reel2.nativeElement.style.transform = `translateY(${position2}px)`;
      this.reel3.nativeElement.style.transform = `translateY(${position3}px)`;
  
        this.checkWinningConditions();
     
    }, 1000);
  }

  private checkWinningConditions() {
    const combination = `${this.slotMachine.collum1?.id}-${this.slotMachine.collum2?.id}-${this.slotMachine.collum3?.id}`;
    if (this.SMALL_WIN.has(combination)) {
      this.smallWin();
      this.disableButton = false;
      this.youWon = "You won small!";
    } else if (this.MID_WIN.has(combination)) {
      this.midWin();
      this.disableButton = false;
      this.youWon = "You won mid!";
    } else if (this.BIG_WIN.has(combination)) {
      this.bigWin();
      this.disableButton = false;
      this.youWon = "You won big!";
    } else {
      this.disableButton = false;
      this.youWon = "You lost!";
    }
  }

  private smallWin() {
    console.log("Small win");
  }

  private midWin() {
    console.log("Mid win");
  }

  private bigWin() {
    console.log("Big win");
  }

  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}

class SlotMachine {
  collum1: fruits | null = null;
  collum2: fruits | null = null;
  collum3: fruits | null = null;

  constructor(private fruitsList: fruits[]) {}

  generateRandomNumbers() {
    this.collum1 = this.fruitsList[Math.floor(Math.random() * this.fruitsList.length)];
    this.collum2 = this.fruitsList[Math.floor(Math.random() * this.fruitsList.length)];
    this.collum3 = this.fruitsList[Math.floor(Math.random() * this.fruitsList.length)];
  }
}

class fruits{
  constructor( public id: number = 0,
    public imgPath: string = '',
    public value: number = 0){ 

  }

}
