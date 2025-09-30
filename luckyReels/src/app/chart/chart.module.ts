import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { chartComponent } from './chart.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule 
],
  declarations: [ ChartComponent ],
  bootstrap:    [ chartComponent ]
})
export class AppModule { }