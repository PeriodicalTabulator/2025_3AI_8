import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
}
