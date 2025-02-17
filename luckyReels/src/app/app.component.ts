import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { BeancanComponent } from "./beancan/beancan.component";



@Component({
  selector: 'app-root',
  imports: [ BeancanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'luckyReels';
}
