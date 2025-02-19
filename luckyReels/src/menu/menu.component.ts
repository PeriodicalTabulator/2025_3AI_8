import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SlotsComponent } from '../slots/slots.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}
