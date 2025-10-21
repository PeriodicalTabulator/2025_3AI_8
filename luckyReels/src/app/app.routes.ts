import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotsComponent } from '../slots/slots.component';
import { BeancanComponent } from '../beancan/beancan.component';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { MenuComponent } from '../menu/menu.component';
import { RouletteComponent } from '../roulette/roulette.component';
import { UserComponent } from '../user/user.component';
import { PieChart1Component } from '../pie-chart-1/pie-chart-1.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent },
  { path: 'beancan', component:BeancanComponent, canActivate: [authGuard]},
  {path: 'blackjack', component: BlackjackComponent, canActivate: [authGuard]},
  {path: '', component:MenuComponent, canActivate: [authGuard]},
  {path: 'roulette', component:RouletteComponent,canActivate: [authGuard]},
  {path: 'user', component:UserComponent, canActivate: [authGuard]},
  {path: 'piechart', component:PieChart1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
