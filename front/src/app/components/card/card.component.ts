import { Component, OnDestroy, OnInit }  from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subscription } from 'rxjs';
import { IOportunity } from 'src/app/shared/interfaces/oportunity';
import { CardSandbox } from './card.sandbox';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {
  public card = 'sou card'
  public exchangeList: string[];
  public oportunity: IOportunity;
  private exchangeListSubscription: Subscription;
  private oportunitySubscription: Subscription;
  private exchangeValuesSubscription: Subscription
  public exchangeA: {name: string, value: number} = {name: '', value: 0};
  public exchangeB: {name: string, value: number} = {name: '', value: 0};

  constructor(
    private cardSandbox: CardSandbox,
    private config: NgSelectConfig
  ) {
    this.config.notFoundText = 'Exchange not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  ngOnInit() {
    this.cardSandbox.setupOpportunities();

    this.exchangeListSubscription = this.cardSandbox.getExchangesTopicList().subscribe(exchangeList => {
      this.exchangeList = [...exchangeList];
    });

    this.oportunitySubscription = this.cardSandbox.getOportunity().subscribe(oportunity => {
      this.oportunity = oportunity;
    });

    this.exchangeValuesSubscription = this.cardSandbox.getExchangeValuesList().subscribe(exchangeValues => {
      for (const exchange of exchangeValues) {
        if (exchange.name === this.exchangeA.name) {
          this.exchangeA.value = exchange.price
        } else {
          this.exchangeB.value = exchange.price
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.exchangeListSubscription) {
      this.exchangeListSubscription.unsubscribe();
    }
    if (this.oportunitySubscription) {
      this.oportunitySubscription.unsubscribe();
    }
    if (this.exchangeValuesSubscription) {
      this.exchangeValuesSubscription.unsubscribe();
    }
  }

  selectCoinA(exchange: string) {
    this.exchangeA.name = exchange;
    this.cardSandbox.updateCoins(this.exchangeA.name, this.exchangeB.name);
  }

  selectCoinB(exchange: string) {
    this.exchangeB.name = exchange;
    this.cardSandbox.updateCoins(this.exchangeA.name, this.exchangeB.name);
  }
}
