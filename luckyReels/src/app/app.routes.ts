import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotsComponent } from '../slots/slots.component';
import { BeancanComponent } from '../beancan/beancan.component';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';
import { RouletteComponent } from '../roulette/roulette.component';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent },
  { path: 'beancan', component:BeancanComponent },
  {path: 'blackjack', component: BlackjackComponent},
  {path: '', component:MenuComponent},
  {path: 'roulette', component:RouletteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
