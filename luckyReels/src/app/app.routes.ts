import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { SlotsComponent } from '../slots/slots.component';
import { BeancanComponent } from '../beancan/beancan.component';

export const routes: Routes = [
  { path: 'slots', component: SlotsComponent },
  { path: 'beancan', component:BeancanComponent },
  {path: '', component: MenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
