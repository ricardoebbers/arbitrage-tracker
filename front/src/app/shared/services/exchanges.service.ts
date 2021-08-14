import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../interfaces/exchange'; 

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private readonly newExchangesSubject: Subject<[IExchange, IExchange]> = new Subject<[IExchange, IExchange]>();

  constructor() {
    this.startGettingExchangeData();
  }

  private startGettingExchangeData(): void {
    const generateExchanges = () => {
      const timestamp = new Date().getTime();
      const exchangeBinance: IExchange = {
          exchange: "binance",
          pair: "btc/usd",
          price: Math.floor(Math.random() * 10) + 1,
          volume: Math.floor(Math.random() * 1000) + 1,
          timestamp: timestamp,
          priceUsd: Math.floor(Math.random() / 1000),
      }
      const exchangeHuobi: IExchange = {
        exchange: "huobi",
        pair: "btc/usd",
        price: Math.floor(Math.random() * 10) + 1,
        volume: Math.floor(Math.random() * 1000) + 1,
        timestamp: timestamp,
        priceUsd: Math.floor(Math.random() / 1000),
      }
      this.newExchangesSubject.next([exchangeBinance, exchangeHuobi])
    }
    setInterval(generateExchanges, 2000)
  }

  public subscribeNewExchanges(): Observable<[IExchange, IExchange]> {
    return this.newExchangesSubject.asObservable()
  }
}
