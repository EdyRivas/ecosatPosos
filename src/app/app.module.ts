import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { EnergyButtonComponent } from './components/energy-button/energy-button.component';
import { WaterMeasureComponent } from './components/water-measure/water-measure.component';
import { LevelWaterMeasureComponent } from './components/level-water-measure/level-water-measure.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    SideBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
