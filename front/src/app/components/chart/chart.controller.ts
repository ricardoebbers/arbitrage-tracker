import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from 'src/app/shared/interfaces/exchange';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class ChartController {
  private chartItems: ChartItem[] = []
  private readonly chartListSubject: Subject<ChartItem[]> = new Subject<ChartItem[]>();
  private readonly newExchangeTopicSubject: Subject<string> = new Subject<string>();

  constructor(
  ) {
  }

  public newExchanges(exchanges: IExchange[]): void {
    for (const exchange of exchanges) {
      const chartItemIndex = this.chartItems.findIndex(item => item.name === exchange.exchange);
      if (chartItemIndex !== -1) {
        this.chartItems[chartItemIndex].addExchange(exchange)
      } else {
        const newChartItem = new ChartItem(exchange.exchange)
        newChartItem.addExchange(exchange)
        this.chartItems.push(newChartItem)
        this.newExchangeTopicSubject.next(exchange.exchange)
      }
    }
    this.chartListSubject.next([...this.chartItems])
  }

  public subscribeChartItemList(): Observable<ChartItem[]> {
    return this.chartListSubject.asObservable();
  }

  public subscribeExchangeTopicList(): Observable<string> {
    return this.newExchangeTopicSubject.asObservable();
  }

}