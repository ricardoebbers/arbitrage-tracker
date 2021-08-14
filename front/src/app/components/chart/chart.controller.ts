import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from 'src/app/shared/interfaces/exchange';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class ChartController {
  private binanceChartItem = new ChartItem('binance');
  private krakenChartItem = new ChartItem('kraken');
  private readonly chartListSubject: Subject<[ChartItem, ChartItem]> = new Subject<[ChartItem, ChartItem]>();

  constructor(
  ) {
  }

  public newKrakenExchange(exchange: IExchange): void {
    this.krakenChartItem.addExchange(exchange);
    this.chartListSubject.next([this.binanceChartItem, this.krakenChartItem])
  }

  public newBinanceExchange(exchange: IExchange): void {
    this.binanceChartItem.addExchange(exchange);
    this.chartListSubject.next([this.binanceChartItem, this.krakenChartItem])
  }

  public subscribeChartItemList(): Observable<[ChartItem, ChartItem]> {
    return this.chartListSubject.asObservable();
  }

}