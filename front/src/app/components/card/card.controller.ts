import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IOportunity } from 'src/app/shared/interfaces/oportunity';
import { ChartItem } from 'src/app/shared/models/chartItem.model';

@Injectable()
export class CardController {
    private opportunities: Map<string, IOportunity> = new Map<string, IOportunity>()
    public exchangeA: string = '';
    public exchangeB: string = '';
    private exchangeTopicsList: string[] = [];
    private readonly oportunitySubject: ReplaySubject<IOportunity> = new ReplaySubject<IOportunity>();
    private readonly exchangeTopicsListSubject: Subject<string[]> = new Subject<string[]>();
    private readonly exchangeValuesSubject: Subject<{name: string, price: number}[]> = new Subject<{name: string, price: number}[]>();
    private readonly opportunitiesListSubject: Subject<Map<string, IOportunity>> = new Subject<Map<string, IOportunity>>();

    constructor(
    ) {
    }

    public saveNewOpportunities(opportunities: IOportunity[]): void {
        for (const oportunity of opportunities) {
            this.opportunities.set([oportunity.buyAt, oportunity.sellAt].join(','), oportunity)
        }
        this.notifyOportunityValue();
        this.opportunitiesListSubject.next(this.opportunities);
    }

    private notifyOportunityValue(): void {
        const oportunity = this.opportunities.get([this.exchangeA, this.exchangeB].join(','))
        if (oportunity) {
            this.oportunitySubject.next(oportunity)
        }
    }

    public updateExchangeData(obs: Observable<ChartItem[]>): void {
        obs.pipe(filter(chartList => {
            for(const chart of chartList) {
                if (chart.name === this.exchangeA || chart.name === this.exchangeB) {
                  return true
                }
            }
            return false
        }), map(chartList => {
            const itemList = []
            for(const chart of chartList) {
              if (chart.name === this.exchangeA || chart.name === this.exchangeB) {
                itemList.push({name: chart.name, price: chart.series[chart.series.length - 1].value})
              }
            }
            return itemList
        })).subscribe( opportunities => {
            this.exchangeValuesSubject.next(opportunities)
        });
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

    public subscribeExchangeValues(): Observable<{name: string, price: number}[]> {
        return this.exchangeValuesSubject.asObservable();
    }

    public subscribeListOfOpportunities(): Observable<Map<string, IOportunity>> {
        return this.opportunitiesListSubject.asObservable();
    }
}