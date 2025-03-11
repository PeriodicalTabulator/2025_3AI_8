import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlotsComponent } from '../slots/slots.component';
import { BeancanComponent } from '../beancan/beancan.component';
import { BlackjackComponent } from '../blackjack/blackjack.component';
import { MenuComponent } from '../menu/menu.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent },
  { path: 'beancan', component:BeancanComponent },
  {path: 'blackjack', component: BlackjackComponent},
  {path: '', component:MenuComponent},
  {path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
