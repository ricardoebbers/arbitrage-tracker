import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { ChartComponent } from './components/chart/chart.component';
import { ExchangesService } from './shared/services/exchanges.service';
import { ChartSandbox } from './components/chart/chart.sandbox';
import { ChartController } from './components/chart/chart.controller';
import { CardComponent  } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule 
  ],
  providers: [
    ExchangesService,
    ChartSandbox,
    ChartController
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
