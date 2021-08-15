import { IExchange } from '../interfaces/exchange';

export class ChartItem  {
  public name: string
  public series: {
    name: string,
    value: number
  }[] = []

  constructor(
    name: string,
  ) {
    this.name = name;
  }

  public addExchange(exchange: IExchange): void {
    const date = new Date(exchange.timestamp * 1000);
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const seriesValue = exchange.price;
    const series = {
      name: time,
      value: seriesValue
    }
    this.series.push(series)
  }
}
