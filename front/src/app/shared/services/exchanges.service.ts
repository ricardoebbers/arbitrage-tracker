import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { IExchange } from '../interfaces/exchange'; 
import { WebsocketsService } from './websocket.service';

export interface Message {
  author: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  private readonly newExchangesSubject: Subject<[IExchange, IExchange]> = new Subject<[IExchange, IExchange]>();
  private subject: Subject<MessageEvent>;

  public messages: Subject<Message>;

  constructor(wsService: WebsocketsService) {

    wsService.getWebSocketObservable().subscribe(
      obj => {
        console.log(obj)
      },
      err => {
        console.log('ERROR: ', err)
      })
    this.startGettingExchangeData();
    this.test()
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

  private test() {
    const obs = new Observable((observer) => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.next(4)
      observer.next(5)
      observer.complete()
    }).pipe(
      filter(data => typeof data === 'number' && data > 2),            //filter Operator
      map((val) => {return val as number * 2}),    //map operator
    )

    obs.subscribe(val => {
      console.log(val)
    })

    // 6
    // 8
    // 10
  }
}
