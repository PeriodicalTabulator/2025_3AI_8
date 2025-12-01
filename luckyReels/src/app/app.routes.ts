import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotsComponent } from '../slots/slots.component';
import { BeancanComponent } from '../beancan/beancan.component';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { MenuComponent } from '../menu/menu.component';
import { RouletteComponent } from '../roulette/roulette.component';
import { UserComponent } from '../user/user.component';
import { PieChart1Component } from '../pie-chart-1/pie-chart-1.component';
import { BadgesComponent } from './badges/badges.component';
import {AiPageComponent} from './ai-page/ai-page.component';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent,},
  { path: 'beancan', component:BeancanComponent,},
  {path: 'blackjack', component: BlackjackComponent,},
  {path: '', component:MenuComponent},
  {path: 'roulette', component:RouletteComponent},
  {path: 'user', component:UserComponent},
  {path: 'piechart', component:PieChart1Component},
  {path: 'Badges', component:BadgesComponent},
  {path: 'ai', component:AiPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
