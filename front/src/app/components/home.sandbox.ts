import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../shared/interfaces/exchange';
import { IList } from '../shared/interfaces/list';
import { ExchangesService } from '../shared/services/exchanges.service';
import { CardController } from './card/card.controller';

@Injectable()
export class HomeSandbox {

  constructor(
    private cardController: CardController,
    private exchangeService: ExchangesService
  ) {}

  public getOpportunities(): Observable<IList[]> {
    const opportunitiesSubject: Subject<IList[]> = new Subject<IList[]>();
    this.cardController.subscribeListOfOpportunities().subscribe( opportunitiesList => {
      const list: IList[] = []
      opportunitiesList.forEach(oportunity => {
        list.push({valueA: [oportunity.buyAt, oportunity.sellAt].join(' x '), valueB: oportunity.profit})
      })
      list.sort((opB, opA) => {
        return opA.valueB - opB.valueB
      })
      opportunitiesSubject.next(list);
    });
    return opportunitiesSubject.asObservable()
  }

  public getExchanges(): Observable<IList[]> {
    const opportunitiesSubject: Subject<IList[]> = new Subject<IList[]>();
    this.exchangeService.subscribeNewExchanges().subscribe( exchangesList => {
      const list: IList[] = []
      exchangesList.forEach(exchange => {
        list.push({valueA: exchange.exchange, valueB: exchange.price})
      })
      list.sort((exchangeB, exchangeA) => {
        return exchangeA.valueB - exchangeB.valueB
      })
      opportunitiesSubject.next(list);
    });
    return opportunitiesSubject.asObservable()
  }
}