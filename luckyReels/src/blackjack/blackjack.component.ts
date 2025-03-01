import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { delay } from 'rxjs';

@Component({
  selector: 'app-blackjack',
  imports: [MatButtonModule, NgFor,MatFormFieldModule,MatInputModule],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent implements OnInit {
  playingDeck: string[] = [];
  dealersHand: string[] = [];
  playersHand: string[] = [];
  gameResult: string = '';
  startDisable:boolean = false;
  hitStandDisable:boolean = true;
  bet:number = 0;
  splitAble:boolean = true;
  leftSplit:string[] = [];
  rightSplit:string[]=[];
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.playingDeck = this.createDeck()
  }

  reset(){
    this.startDisable = false;
    this.hitStandDisable = true;
  }

  startGame(): void {
   /* if(this.bet == 0){
      this.gameResult = 'You have to bet';
      return
    }*/
      this.dealersHand = [];
      this.playersHand = [];
    this.dealersHand = [this.drawCard(), this.drawCard()];
    this.playersHand = [this.drawCard(), this.drawCard()]; 
    this.gameResult = ''; 
    this.startDisable = true;
    this.hitStandDisable = false;
    this.hasSameValue(this.playersHand);
  }

  createDeck(): string[] {
    const symbols = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck: string[] = [];
    for (const symbol of symbols) {
      for (const value of values) {
        deck.push(`${value} of ${symbol}`);
      }
    }
    return this.shuffleDeck(deck);
  }

  shuffleDeck(deck: string[]): string[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);
    return deck;
  }

  drawCard(): string {
    if (this.playingDeck.length === 0) {
      console.error('Deck is empty!');
      this.playingDeck = this.createDeck();
    }
    return this.playingDeck.pop()!;
  }

  hit(): void {
    this.playersHand.push(this.drawCard());
    if (this.calculateHandValue(this.playersHand) > 21) {
      this.gameResult = 'You Busted!';
      this.reset();
    }
  }

  stand(): void {
    this.hitStandDisable = true;
    while (this.calculateHandValue(this.dealersHand) < 17) {
      delay(1000);
      this.dealersHand.push(this.drawCard());
    }
    const playersValue = this.calculateHandValue(this.playersHand);
    const dealersValue = this.calculateHandValue(this.dealersHand);
    if (dealersValue > 21 || playersValue > dealersValue) {
      this.gameResult = 'Player won!';
      this.reset();
    } else if (playersValue > 21) {
      this.gameResult = 'Busted!';
      this.reset();
    } else {
      this.gameResult = 'You lost!';
      this.reset();
    }

  }


  hasSameValue(array: string[]): boolean {
    const elementCount = new Map<string, number>();
  
    for (const card of array) {
      const cardValue = card.split(' ')[0];
  
      
      if (elementCount.has(cardValue)) {
        elementCount.set(cardValue, elementCount.get(cardValue)! + 1);
      } else {
        
        elementCount.set(cardValue, 1);
      }
    }
  
    for (const count of elementCount.values()) {
      if (count > 1) {
        this.splitAble = false;
        return true;
      }
    }
      this.splitAble = true;
    return false; 
  }

  playerPop():string{
    return this.playersHand.pop()!;
  }

 split(){
    this.rightSplit.push(this.playerPop());
    this.leftSplit.push(this.playerPop());
    console.log('right: ', this.rightSplit, 'left: ',this.leftSplit);
  }
  
  

  calculateHandValue(hand: string[]): number {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
      const cardValue = card.split(' ')[0];
      if (cardValue === 'A') {
        value += 11;
        aces++;
      } else if (['J', 'Q', 'K'].includes(cardValue)) {
        value += 10;
      } else {
        value += parseInt(cardValue, 10);
      }
    }
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    return value;
  }

  navigateToGame(route: string): void {
    this.router.navigate([route]);
  }
}