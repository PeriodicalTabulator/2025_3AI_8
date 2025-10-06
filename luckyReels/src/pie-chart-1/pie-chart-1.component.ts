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
  multi: any[] = [];
  view: [number, number] = [700, 400];
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';


  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
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
        this.multi = [
          {
            "name": "money played ",
            "series": [
              {
                "name": "1990",
                "value": 1
              },
              {
                "name": "2010",
                "value": 5
              },
              {
                "name": "2011",
                "value": 4
              },
              {
                "name": "2012",
                "value": 4
              },{
                "name": "2013",
                "value": 6
              },
              {
                "name": "2014",
                "value": 2
              },{
                "name": "2015",
                "value": 1
              },
              {
                "name": "2016",
                "value": 5
              },
              {
                "name": "2017",
                "value": 4
              },
              {
                "name": "2018",
                "value": 4
              },{
                "name": "2019",
                "value": 6
              },
              {
                "name": "2020",
                "value": 2
              }
            ]
          },
        ]
      },
    });
  }
}
