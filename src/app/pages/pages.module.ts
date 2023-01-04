import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from '../material/material.module'; 
import { WaterMeasureComponent } from '../components/water-measure/water-measure.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    HomeComponent,
    WaterMeasureComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
  ],
  providers: [
    CookieService
  ],
})
export class PagesModule { }
