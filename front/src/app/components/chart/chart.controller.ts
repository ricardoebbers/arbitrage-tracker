import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from 'src/app/shared/interfaces/exchange';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class ChartController {
  private chartItems: ChartItem[] = []
  private readonly chartListSubject: Subject<ChartItem[]> = new Subject<ChartItem[]>();

  constructor(
  ) {
  }

  public newExchanges(exchanges: IExchange[]): void {
    console.log(exchanges)
    for (const exchange of exchanges) {
      const chartItemIndex = this.chartItems.findIndex(item => item.name === exchange.exchange);
      if (chartItemIndex !== -1) {
        this.chartItems[chartItemIndex].addExchange(exchange)
      } else {
        const newChartItem = new ChartItem(exchange.exchange)
        newChartItem.addExchange(exchange)
        this.chartItems.push(newChartItem)
      }
    }
    this.chartListSubject.next([...this.chartItems])
  }

  public subscribeChartItemList(): Observable<ChartItem[]> {
    return this.chartListSubject.asObservable();
  }

}