import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from 'src/app/shared/interfaces/exchange';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class ChartController {
  private chartItemA: ChartItem;
  private chartItemB: ChartItem;
  private readonly chartListSubject: Subject<[ChartItem, ChartItem]> = new Subject<[ChartItem, ChartItem]>();

  constructor(
  ) {
  }

  public newExchanges(exchanges: [IExchange, IExchange]): void {
    if (!this.chartItemA) {
      this.chartItemA = new ChartItem(exchanges[0].exchange)
    }
    if (!this.chartItemB) {
      this.chartItemB = new ChartItem(exchanges[1].exchange)
    }
    this.chartItemA.name === exchanges[0].exchange ? this.addExchanges(exchanges[0], exchanges[1]) : this.addExchanges(exchanges[1], exchanges[0])

    this.chartListSubject.next([this.chartItemA, this.chartItemB])
  }

  public addExchanges(exchangeA: IExchange, exchangeB: IExchange): void {
    this.chartItemA.addExchange(exchangeA);
    this.chartItemB.addExchange(exchangeB);
  }

  public subscribeChartItemList(): Observable<[ChartItem, ChartItem]> {
    return this.chartListSubject.asObservable();
  }

}