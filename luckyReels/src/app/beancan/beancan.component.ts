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

  generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Generated Number: ${randomNumber}`);
    
    if (this.userNumber <= randomNumber) {
      console.log("You won");
    } else {
      console.log("You lose");
    }
  }
}
