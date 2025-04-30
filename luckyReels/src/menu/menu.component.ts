import { Component, AfterViewInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, style, animate, } from '@angular/animations';

/* Sigma */

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('flyInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class MenuComponent implements AfterViewInit {
  private router = inject(Router);
  private renderer = inject(Renderer2);

  navigateToGame(route: string) {
    this.router.navigate([route]);
  }

  ngAfterViewInit() {
    const container = document.querySelector('.coin-container');
    if (container) {
      for (let i = 0; i < 20; i++) {
        const coin = this.renderer.createElement('div');
        this.renderer.addClass(coin, 'falling-coin');
        this.renderer.setStyle(coin, 'left', `${Math.random() * 100}%`);
        this.renderer.setStyle(coin, 'animationDuration', `${3 + Math.random() * 3}s`);
        this.renderer.setStyle(coin, 'animationDelay', `${Math.random() * 5}s`);
        container.appendChild(coin);
      }
    }
  }
}
