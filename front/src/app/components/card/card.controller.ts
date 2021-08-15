import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IOportunity } from 'src/app/shared/interfaces/oportunity';

@Injectable()
export class CardController {
//   private oportunities: IOportunity[] = []
    private oportunities: Map<[string, string], {time: number, oportunity: IOportunity}>
    private exchangeA: string;
    private exchangeB: string;
    private exchangeTopicsList: string[];
    private readonly oportunitySubject: ReplaySubject<IOportunity> = new ReplaySubject<IOportunity>();
    private readonly exchangeTopicsListSubject: Subject<string[]> = new Subject<string[]>();

    constructor(
    ) {
    }
    // profit -> Dinheiro que vai receber / valor 100
    // Investment -> Quanto vai ser gasto

    public saveNewOportunities(oportunities: IOportunity[]): void {
        for (const oportunity of oportunities) {
            const item = this.oportunities.get([oportunity.buyAt, oportunity.sellAt])
            const isProfitPositive = oportunity.profit > 0;
            if (item) {
                item.oportunity.profit > 0 ? (isProfitPositive ? item.time ++ : item.time = 0) : (isProfitPositive ? item.time = 1 : item.time = 0) 
                item.oportunity = oportunity
            } else {
                this.oportunities.set([oportunity.buyAt, oportunity.sellAt], {time: isProfitPositive ? 1 : 0, oportunity})
            }
        }
        this.notifyOportunityValue();
    }

    private notifyOportunityValue(): void {
        const item = this.oportunities.get([this.exchangeA, this.exchangeB])
        if (item) {
            this.oportunitySubject.next(item.oportunity)
        }
    }

    public updateExchanges(exchangeA: string, exchangeB: string) {
        this.exchangeA = exchangeA;
        this.exchangeB = exchangeB;
        this.notifyOportunityValue();
    }

    public newExchangeTopic(exchangeTopic: string): void {
        this.exchangeTopicsList.push(exchangeTopic)
        this.exchangeTopicsListSubject.next(this.exchangeTopicsList)
    }

    public subscribeOportunity(): Observable<IOportunity> {
        return this.oportunitySubject.asObservable();
    }

    public subscribeExchangesTopicList(): Observable<string[]> {
        return this.exchangeTopicsListSubject.asObservable();
    }
}