import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../interfaces/exchange'; 

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private readonly newBinanceExchangeSubject: Subject<IExchange> = new Subject<IExchange>();
  private readonly newKrakenExchangeSubject: Subject<IExchange> = new Subject<IExchange>();

  constructor() {
    this.startBinanceData();
    this.startKrakenData();
  }

  private startBinanceData(): void {
    const generateExchange = () => {
        const exchange: IExchange = {
            exchange: "binance",
            pair: "btc/usd",
            price: Math.floor(Math.random() * 10) + 1,
            volume: Math.floor(Math.random() * 1000) + 1,
            timestamp: new Date().getTime(),
            priceUsd: Math.floor(Math.random() / 1000),
        }
        this.newBinanceExchangeSubject.next(exchange)
    }
    setInterval(generateExchange, 2000)
  }

  private startKrakenData(): void {
    const generateExchange = () => {
        const exchange: IExchange = {
            exchange: "kraken",
            pair: "btc/usd",
            price: Math.floor(Math.random() * 10) + 1,
            volume: Math.floor(Math.random() * 1000) + 1,
            timestamp: new Date().getTime(),
            priceUsd: Math.floor(Math.random() / 1000),
        }
        this.newKrakenExchangeSubject.next(exchange)
    }
    setInterval(generateExchange, 2000)
  }

  public subscribeNewBinanceExchanges(): Observable<IExchange> {
    return this.newBinanceExchangeSubject.asObservable()
  }

  public subscribeNewKrakenExchanges(): Observable<IExchange> {
    return this.newKrakenExchangeSubject.asObservable()
  }
}
