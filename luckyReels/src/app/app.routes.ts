import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';

export const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'Hra1', component: MenuComponent },
  { path: 'Hra2', component: MenuComponent },
  { path: 'Hra3', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
