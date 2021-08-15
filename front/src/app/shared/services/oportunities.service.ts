import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../interfaces/exchange'; 
import { IOportunity } from '../interfaces/oportunity';
import { WebsocketsService } from './websocket.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OportunitiesService {

  private readonly newOportunitySubject: Subject<IOportunity[]> = new Subject<IOportunity[]>();

  constructor(wsService: WebsocketsService) {

    wsService.getWebSocketObservable().pipe(filter(obj => 'oportunities' in obj)).subscribe(
      obj => {
          this.getOportunityData(obj)
      },
      err => {
        console.log('ERROR: ', err)
      }
    )
  }
  private getOportunityData(obj: any): void {
    const oportunitiesList = []
    for (const oportunity of obj.oportunities) {
      const newOportunity: IOportunity = {
        buyAt: oportunity.buyAt,
        sellAt: oportunity.sellAt,
        profit: oportunity.profit,
        investment: oportunity.investment,
      }
      oportunitiesList.push(newOportunity)
    }
    this.newOportunitySubject.next(oportunitiesList)
  }

  public subscribeNewOportunities(): Observable<IOportunity[]> {
    return this.newOportunitySubject.asObservable()
  }
}
