import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IExchange } from '../interfaces/exchange'; 
import { IOportunity } from '../interfaces/oportunity';
import { WebsocketsService } from './websocket.service';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OpportunitiesService {

  private readonly newOportunitySubject: Subject<IOportunity[]> = new Subject<IOportunity[]>();

  constructor(wsService: WebsocketsService) {

    wsService.getWebSocketObservable().pipe(filter(obj => 'opportunities' in obj)).subscribe(
      obj => {
          this.getOportunityData(obj)
      },
      err => {
        console.log('ERROR: ', err)
      }
    )
  }
  private getOportunityData(obj: any): void {
    const OpportunitiesList = []
    console.log(obj.opportunities)
    for (const oportunity of obj.opportunities) {
      const newOportunity: IOportunity = {
        buyAt: oportunity.buyAt,
        sellAt: oportunity.sellAt,
        profit: oportunity.profit,
        investment: oportunity.investment,
      }
      OpportunitiesList.push(newOportunity)
    }
    this.newOportunitySubject.next(OpportunitiesList)
  }

  public subscribeNewOpportunities(): Observable<IOportunity[]> {
    return this.newOportunitySubject.asObservable()
  }
}
