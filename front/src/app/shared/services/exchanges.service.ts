import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../interfaces/exchange'; 
import { WebsocketsService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private readonly newExchangesSubject: Subject<IExchange[]> = new Subject<IExchange[]>();

  constructor(wsService: WebsocketsService) {

    wsService.getWebSocketObservable().subscribe(
      obj => {
        this.getExchangeData(obj)
      },
      err => {
        console.log('ERROR: ', err)
      }
    )
  }
  private getExchangeData(obj: any): void {
    const timestamp = obj.timestamp
    const exchangesList = []
    for (const exchange of obj.events) {
      const newExchange: IExchange = {
        exchange: exchange.exchange,
        pair: exchange.pair,
        price: exchange.price,
        volume: exchange.volume,
        timestamp,
        priceUsd: exchange.priceUsd,
      }
      exchangesList.push(newExchange)
    }
    this.newExchangesSubject.next(exchangesList)
  }

  public subscribeNewExchanges(): Observable<IExchange[]> {
    return this.newExchangesSubject.asObservable()
  }
}
