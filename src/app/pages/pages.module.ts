import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from '../material/material.module'; 
import { EnergyButtonComponent } from '../components/energy-button/energy-button.component';
import { WaterMeasureComponent } from '../components/water-measure/water-measure.component';
import { LevelWaterMeasureComponent } from '../components/level-water-measure/level-water-measure.component';


@NgModule({
  declarations: [
    HomeComponent,
    EnergyButtonComponent,
    WaterMeasureComponent,
    LevelWaterMeasureComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    
  ]
})
export class PagesModule { }
