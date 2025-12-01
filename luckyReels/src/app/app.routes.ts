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
import { authGuard } from './auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { adminGuardGuard } from './admin-guard.guard';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent, canActivate: [authGuard] },
  { path: 'beancan', component:BeancanComponent, canActivate: [authGuard]},
  {path: 'blackjack', component: BlackjackComponent, canActivate: [authGuard]},
  {path: '', component:MenuComponent},
  {path: 'roulette', component:RouletteComponent},
  {path: 'user', component:UserComponent},
  {path: 'piechart', component:PieChart1Component},
  {path: 'Badges', component:BadgesComponent},
  {path: 'adminPanel', component:AdminPanelComponent, canActivate: [adminGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
