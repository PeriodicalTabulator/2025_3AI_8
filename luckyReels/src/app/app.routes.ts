import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { BeancanComponent } from './beancan/beancan.component';

export const routes: Routes = [
  { path: '/', component: MenuComponent },
  { path: '/Hra1', component: MenuComponent },
  { path: '/Hra2', component: MenuComponent },
  { path: '/Hra3', component: BeancanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
