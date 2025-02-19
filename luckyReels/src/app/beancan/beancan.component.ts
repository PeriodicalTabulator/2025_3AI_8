import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-beancan',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './beancan.component.html',
  styleUrls: ['./beancan.component.css']
})
export class BeancanComponent {
  userNumber: number = 0;
  isReverse: boolean = false;
  
  constructor(private router: Router) {}

  generateRandomNumber() {
    let randomNumber;
    if (this.isReverse) {
      randomNumber = Math.floor(Math.random() * (100 - this.userNumber + 1)) + this.userNumber;
    } else {
      randomNumber = Math.floor(Math.random() * this.userNumber) + 1;
    }
    
    console.log(`Generated Number: ${randomNumber}`);
    
    if (this.isReverse ? randomNumber >= this.userNumber : this.userNumber >= randomNumber) {
      console.log("You won NIGGA!!!");
    } else {
      console.log("You lose nigga");
    }
  }
  
  navigateToGame(route: string) {
    this.router.navigate([route]);
  }

}
