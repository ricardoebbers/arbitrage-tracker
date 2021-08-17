import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IExchange } from '../shared/interfaces/exchange';
import { IList } from '../shared/interfaces/list';
import { HomeSandbox } from './home.sandbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private opportunitiesListSubscription: Subscription;
  private exchangesSubscription: Subscription;
  public opList: IList[] = []
  public exchangesList: IList[] = []

  constructor(private homeSandbox: HomeSandbox) {}

  ngOnInit(): void {
    this.opportunitiesListSubscription = this.homeSandbox.getOpportunities().subscribe(opportunitiesList => {
      this.opList = opportunitiesList.splice(0, 10);
    })

    this.exchangesSubscription = this.homeSandbox.getExchanges().subscribe(exchangesList => {
      this.exchangesList = exchangesList;
    })
  }

  ngOnDestroy() {
    if (this.opportunitiesListSubscription) {
      this.opportunitiesListSubscription.unsubscribe();
    }
    if (this.exchangesSubscription) {
      this.exchangesSubscription.unsubscribe();
    }
  }

}
