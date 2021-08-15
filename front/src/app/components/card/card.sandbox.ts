import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOportunity } from 'src/app/shared/interfaces/oportunity';
import { ExchangesService } from 'src/app/shared/services/exchanges.service';
import { OportunitiesService } from 'src/app/shared/services/oportunities.service';
import { ChartController } from '../chart/chart.controller';
import { CardController } from './card.controller';

@Injectable()
export class CardSandbox {

  constructor(
    private oportunitiesService: OportunitiesService,
    private chartController: ChartController,
    private cardController: CardController
  ) {}

  public setupOportunities(): void {
    this.chartController.subscribeExchangeTopicList().subscribe( newExchangeTopic => {
        this.cardController.newExchangeTopic(newExchangeTopic)
      });
    this.oportunitiesService.subscribeNewOportunities().subscribe( oportunities => {
      this.cardController.saveNewOportunities(oportunities)
    });
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
}