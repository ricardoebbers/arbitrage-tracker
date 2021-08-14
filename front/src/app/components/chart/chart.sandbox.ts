import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartItem } from 'src/app/shared/models/chartItem.model';
import { ExchangesService } from 'src/app/shared/services/exchanges.service';
import { ChartController } from './chart.controller';

@Injectable()
export class ChartSandbox {

  constructor(
    private chartController: ChartController,
    private exchangesService: ExchangesService
  ) {
  }

  public setupExchanges(): void {
    this.exchangesService.subscribeNewExchanges().subscribe( exchanges => {
      this.chartController.newExchanges(exchanges)
    });
  }

  public getChartList(): Observable<[ChartItem, ChartItem]>  {
    return this.chartController.subscribeChartItemList();
  }
}