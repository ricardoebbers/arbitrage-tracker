import { Component, OnDestroy, OnInit }  from '@angular/core';
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
  private oportunitySubscription: Subscription

  constructor(
    private cardSandbox: CardSandbox
  ) {}

  ngOnInit() {
    this.cardSandbox.setupOportunities();

    this.exchangeListSubscription = this.cardSandbox.getExchangesTopicList().subscribe(exchangeList => {
      this.exchangeList = exchangeList;
    });

    this.oportunitySubscription = this.cardSandbox.getOportunity().subscribe(oportunity => {
      this.oportunity = oportunity;
    });
  }

  ngOnDestroy() {
    if (this.exchangeListSubscription) {
      this.exchangeListSubscription.unsubscribe()
    }
    if (this.oportunitySubscription) {
      this.oportunitySubscription.unsubscribe()
    }
  }
}
