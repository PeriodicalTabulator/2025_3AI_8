import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports:[MatSidenavModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}
  
  navigateToGame(route: string) {
    this.router.navigate([route]);
  }
}
