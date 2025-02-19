import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-beancan',
  standalone: true,
  imports: [FormsModule,MatSliderModule,MatCheckboxModule,MatButtonModule],
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
    console.log(this.userNumber);
    
    if (this.isReverse ? randomNumber >= this.userNumber : this.userNumber >= randomNumber) {
      console.log("You won");
    } else {
      console.log("You lose");
    }
  }
  
  navigateToGame(route: string) {
    this.router.navigate([route]);
  }

formatLabel(value: number): string 
{
  if(this.isReverse == true){
      return `${100 - value}`
  }else{
    this.userNumber = value;
    return `${value}`
  }
}

  updateUserNumber(event: any) {
    if(this.isReverse == true){
      this.userNumber = 100 - event.target.value;
    }else{
      this.userNumber = event.target.value;
    }

  }
}
