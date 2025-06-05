import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';
import { User } from '../app/user';
import { AuthService } from '../app/auth.service';
import { FirestoreDataService } from '../app/firestore-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blackjack',
  imports: [MatButtonModule, NgFor,MatFormFieldModule,MatInputModule,NgIf],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.css'
})
export class BlackjackComponent implements OnInit {
  //game
  hiddenCardOfDealer:string[] = [];
  playingDeck: string[] = [];
  dealersHand: string[] = [];
  playersHand: string[] = [];
  gameResult: string = '';
  startDisable:boolean = false;
  hitStandDisable:boolean = true;
  bet:number = 0.5;
  winBet:number = this.bet *2;
  splitAble:boolean = true;
  leftSplit:string[] = [];
  rightSplit:string[]=[];
  splited: boolean = false;
  leftHand:boolean = true;
  splitcreated:boolean = false;
  leftResult:string = '';
  maxValueOfHand:number = 21;

  //user bets
  userData$:User[] | null = null;
  isDataLoaded: boolean = false;
  subscription: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService, private dataService: FirestoreDataService) {}

  ngOnInit(): void {
    this.playingDeck = this.createDeck();
    
    this.subscription = this.dataService.userData$.subscribe(users => 
      {
        this.userData$ = users || [];
        this.isDataLoaded = users && users.length > 0;
        console.log('received user data:', users);
      }
    );
  }

  reset(){
    this.startDisable = false;
    this.hitStandDisable = true;
    this.splitcreated = false;
    this.splitAble = true;
    this.leftHand = true;
    //this.splited = false;
  }

  startGame(): void {
     this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet - this.bet);
   /* if(this.bet == 0){
      this.gameResult = 'You have to bet';
      return
    }*/
      this.splited = false;
      this.leftSplit = [];
      this.rightSplit = [];
      this.dealersHand = [];
      this.playersHand = [];
     this.dealersHand = [this.drawCard(), 'Hidden Card'];
     this.hiddenCardOfDealer = [this.drawCard()];
    //testing split
    this.playersHand = ['3 of Clubs','3 of Clubs']; 
   // this.playersHand = [this.drawCard(),this.drawCard()];
    this.gameResult = ''; 
    this.leftResult = '';
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

    hiddenCardPop():string{
      return this.hiddenCardOfDealer.pop()!;
    }

  drawCard(): string {
    if (this.playingDeck.length === 0) {
      console.error('Deck is empty!');
      this.playingDeck = this.createDeck();
    }
    return this.playingDeck.pop()!;
  }

  hit(): void {
    if(this.splited && this.leftHand){
      this.leftSplit.push(this.drawCard());
      if (this.calculateHandValue(this.leftSplit) > this.maxValueOfHand) {
        this.leftResult = 'Left hand busted';
        !this.leftHand;
      }
    }else if(this.splited && !this.leftHand){
      this.rightSplit.push(this.drawCard());
      if (this.calculateHandValue(this.rightSplit) > this.maxValueOfHand) {
        this.gameResult = 'Right hand busted';
        this.stand();
      }
    }else{
      this.playersHand.push(this.drawCard());
      if (this.calculateHandValue(this.playersHand) > this.maxValueOfHand) {
        this.gameResult = 'You Busted!';
        this.reset();
      }
      this.splitAble = true; //html component expect true for disable button
    }
  }

  split(){
    if(this.splitAble) return;
     this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet - this.bet);
    this.splitcreated = true;
    this.splitAble = true;
    this.splited = true;
    this.rightSplit.push(this.playerPop());
    this.leftSplit.push(this.playerPop());

    this.leftSplit.push(this.drawCard());
    this.rightSplit.push(this.drawCard());

    console.log('right: ', this.rightSplit, 'left: ',this.leftSplit);
  }

  playerPop():string{
    return this.playersHand.pop()!;
  }

  stand(): void {
    if (this.splited) {
      if (this.leftHand) {
        this.leftHand = false;
        return;
      }
    }
    if(this.splitcreated){
      this.dealerPlay();
      const leftSplitValue = this.calculateHandValue(this.leftSplit);
      const rightSplitValue = this.calculateHandValue(this.rightSplit);
      const dealersValue = this.calculateHandValue(this.dealersHand);

      if(leftSplitValue >  this.maxValueOfHand){
        this.leftResult = 'Left hand busted';
      }else if(dealersValue> this.maxValueOfHand || leftSplitValue > dealersValue){
        this.leftResult = 'Left hand won';
          this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet + this.winBet);
      }else if(leftSplitValue == dealersValue){
        this.leftResult = 'Left hand tie';
          this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet +  this.bet);
      }else{
        this.leftResult = 'Left hand lost';
      }
      
      if(rightSplitValue > this.maxValueOfHand){
        this.gameResult = 'Right hand busted';
      }else if(dealersValue> this.maxValueOfHand || rightSplitValue > dealersValue){
        this.gameResult = 'Right hand won';
          this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet +  this.winBet);
      }else if(rightSplitValue == dealersValue){
        this.gameResult = 'Right hand tie';
         this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet + this.bet);
      }else{
        this.gameResult = 'Right hand lost';
      }
      this.reset();
    
    }else{
      this.dealerPlay();
      const playersValue = this.calculateHandValue(this.playersHand);
      const dealersValue = this.calculateHandValue(this.dealersHand);

      if(playersValue > this.maxValueOfHand){
        this.gameResult = 'You busted';
      }else if(dealersValue > this.maxValueOfHand){
        this.gameResult = 'Dealer bust';
         this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet +  this.winBet);
      }else if(playersValue > dealersValue){
        this.gameResult = 'Player won';
          this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet +  this.winBet);
      }else if(playersValue === dealersValue){
        this.gameResult = 'Push';
          this.dataService.updateWallet(this.userData$![0].uid, this.userData$![0].wallet + this.bet);
      }else{
        this.gameResult = 'Dealer won';
      }
      this.reset();

    }
  }



  dealerPlay(): void {
    this.hitStandDisable = true;
    this.dealersHand.pop();
    this.dealersHand.push(this.hiddenCardPop());
    while(this.calculateHandValue(this.dealersHand) < 17){
      this.dealersHand.push(this.drawCard());
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

  calculateHandValue(hand: string[]): number {
    let value = 0;
    let aces = 0;
    for (const card of hand) {
      if(card == 'Hidden Card'){
       continue;
      }
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
    while (value > this.maxValueOfHand && aces > 0) {
      value -= 10;
      aces--;
    }
    return value;
  }

  navigateToGame(route: string): void {
    this.router.navigate([route]);
  }

  getCardSymbol(card: string):string{
    if (card.includes('Hearts')){
      return '♡';
    }else if (card.includes('Diamonds')){
      return '♦';
    }else if (card.includes('Clubs')){
      return '♣';
    }else if (card.includes('Spades')){
      return '♠';
    }else{
      return 'luckyReels\public\backOfCard.png';
    }
  }

  getCardValue(card: string):string{
    return card.split('')[0];
  }
}