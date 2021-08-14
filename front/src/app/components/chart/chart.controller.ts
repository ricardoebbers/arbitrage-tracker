import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from 'src/app/shared/interfaces/exchange';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class ChartController {
  private binanceChartItem = new ChartItem('binance');
  private huobiChartItem = new ChartItem('kraken');
  private readonly chartListSubject: Subject<[ChartItem, ChartItem]> = new Subject<[ChartItem, ChartItem]>();

  constructor(
  ) {
  }

  public newExchanges(exchanges: [IExchange, IExchange]): void {
    this.binanceChartItem.addExchange(exchanges[0]);
    this.huobiChartItem.addExchange(exchanges[1]);
    this.chartListSubject.next([this.binanceChartItem, this.huobiChartItem])
  }

  public subscribeChartItemList(): Observable<[ChartItem, ChartItem]> {
    return this.chartListSubject.asObservable();
  }

}