import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartItem } from 'src/app/shared/models/chartItem.model';
import { ChartConfig } from '../../chartFiles/chartConfig';
import { ChartSandbox } from './chart.sandbox';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy{
  public chartConfig = ChartConfig;
  public chartItems: ChartItem[];
  private chartItemsSubscription: Subscription;

  constructor(
    private chartSandbox: ChartSandbox
  ) {}
  
  ngOnInit() {
    this.chartItemsSubscription = this.chartSandbox.getChartList().subscribe(chartLists => {
      this.chartItems = chartLists
    })
    this.chartSandbox.setupExchanges();
  }

  ngOnDestroy(): void {
    if (this.chartItemsSubscription) {
      this.chartItemsSubscription.unsubscribe()
    }
  }
}
