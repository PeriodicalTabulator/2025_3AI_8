import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from '../app/auth.service';
import { FirestoreDataService } from '../app/firestore-data.service';
import { Router } from '@angular/router';
import { User } from '../app/user';
import { Subscription, async } from 'rxjs';


@Component({
  selector: 'app-pie-chart-1',
  imports: [NgxChartsModule],
  templateUrl: './pie-chart-1.component.html',
  styleUrl: './pie-chart-1.component.css'
})
export class PieChart1Component implements OnInit, OnDestroy {
  userData: User[] | null = null;
  single: any[] = [];
  loading = true;
  private subscription: Subscription | null = null;

  view: [number, number] = [700, 400];
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['blue', 'red', 'orange'], // only # colors
  };

  constructor(
    public authService: AuthService,
    private dataService: FirestoreDataService,
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  loadUserData(): void {
    const uid = this.authService.getUID();
    if (!uid) {
      this.loading = false;
      return;
    }

    this.subscription = this.dataService.getDataOfSingleUser(uid).subscribe({
      next: (users) => {
        this.userData = users;
        this.loading = false;

        const user = users?.[0] ?? {};

        this.single = [
          { name: 'BlackJack', value: user.blackJackPlayed ?? 0 },
          { name: 'Slots', value: user.slotsPlayed ?? 0 },
          { name: 'BeanCan', value: user.beancanPlayed ?? 0 }
        ];
      },
    });
  }
}
