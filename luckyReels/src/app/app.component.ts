import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'luckyReels';
  constructor(private router:Router){}
  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}