import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IOportunity } from 'src/app/shared/interfaces/oportunity';
import { OpportunitiesService } from 'src/app/shared/services/opportunities.service';
import { ChartController } from '../chart/chart.controller';
import { CardController } from './card.controller';

@Injectable()
export class CardSandbox {

  constructor(
    private OpportunitiesService: OpportunitiesService,
    private chartController: ChartController,
    private cardController: CardController
  ) {}

  public setupOpportunities(): void {
    this.chartController.subscribeExchangeTopicList().subscribe( newExchangeTopic => {
        this.cardController.newExchangeTopic(newExchangeTopic)
      });
    this.OpportunitiesService.subscribeNewOpportunities().subscribe( opportunities => {
      this.cardController.saveNewOpportunities(opportunities)
    });
    this.cardController.updateExchangeData(this.chartController.subscribeChartItemList())
  }

  public updateExchanges(exchangeA: string, exchangeB: string): void {
    this.cardController.updateExchanges(exchangeA, exchangeB)
  }

  public getOportunity(): Observable<IOportunity> {
    return this.cardController.subscribeOportunity()
  }

  public getExchangesTopicList(): Observable<string[]> {
    return this.cardController.subscribeExchangesTopicList();
  }

  public getExchangeValuesList(): Observable<{name: string, price: number}[]> {
    return this.cardController.subscribeExchangeValues();
  }

  public updateCoins(exchangeA: string, exchangeB: string) {
    return this.cardController.updateExchanges(exchangeA, exchangeB);
  }
}