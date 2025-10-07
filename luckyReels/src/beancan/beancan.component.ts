import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import { Subscription } from 'rxjs';
import { User } from '../app/user';
import { FirestoreDataService } from '../app/firestore-data.service';
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
export class BeancanComponent implements OnInit {
  @ViewChild('bombElement') bombElement!: ElementRef;
  userInput: number = 50;
  userNumber: number = 50;
  isReverse: boolean = false;
  generatedNumber: number | null = null;
  resultMessage: string = '';
  isExploded: boolean = false;
  isAnimating: boolean = false;
  showNumber: number | null = null;
  
  userData$:User[] | null = null;
  isDataLoaded: boolean = false;
  subscription: Subscription | null = null;
  bet:number = 0.5;
  constructor(private router: Router, private dataService: FirestoreDataService) {}

  ngOnInit(): void {
    this.subscription = this.dataService.userData$.subscribe(users => 
      {
        this.userData$ = users || [];
        this.isDataLoaded = users && users.length > 0;
        console.log('received user data:', users);
      }
    );
  }
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
    this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet - this.bet)
    this.dataService.updateChartValueBeancan(this.userData$![0].uid, this.userData$![0].beancanPlayed + 1);
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

  mathOfWinningBet(bet:number):number{
    let hunderBet = this.bet / 100;
    bet = hunderBet * this.userInput;
    return bet
  }
  
  winningConditions() {
    if (this.isReverse == false) {
      if (this.generatedNumber! >= this.userNumber) {
         this.showNumber = this.generatedNumber;
        this.isExploded = false;
        let finalbet = this.bet + this.mathOfWinningBet(this.bet);
        this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet + finalbet);
        this.resultMessage = 'Bomb didnt explode. You won!';
        console.log(finalbet);
      } else {
        this.showNumber = this.generatedNumber;
        this.resultMessage = 'Bomb exploded. You lost!';
        this.isExploded = true;
      }
    } else {
      if (this.generatedNumber! <= this.userNumber) {
        this.showNumber = this.generatedNumber;
        this.isExploded = false;
        let finalbet = this.bet + this.mathOfWinningBet(this.bet);
        this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet + finalbet);
        this.resultMessage = 'Bomb didnt explode. You won!';
         console.log(finalbet);
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