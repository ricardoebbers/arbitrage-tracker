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
import { OpportunitiesService } from './shared/services/opportunities.service';
import { CardSandbox } from './components/card/card.sandbox';
import { CardController } from './components/card/card.controller';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponent } from './components/list/list.component';
import { HomeSandbox } from './components/home.sandbox';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartComponent,
    CardComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgSelectModule 
  ],
  providers: [
    ExchangesService,
    ChartSandbox,
    ChartController,
    OpportunitiesService,
    CardSandbox,
    CardController,
    HomeSandbox
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
