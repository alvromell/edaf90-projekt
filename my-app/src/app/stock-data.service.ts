import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor() {}

  getTimeSeries(stocks : string[], time : string, range : string) : any[] {
    /*
     * intervals:  '1m', '5m', '15m', '1d', '1wk', '1mo'
     * range:      '1d', '5d', '3mo', '6mo', '1y', '5y', '10y', 'ytd', 'max'
     */

    let proms : Promise<Response>[] = [];
    let stockList : any[] = [];

    stocks.forEach(stock => fetchData(stock));

    async function fetchData(stock : string) {
      let url    : string = 'https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/' + stock + '?interval='
                            + time + '&range=' + range + '&region=US&lang=en';

      proms.push(fetch(url, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "edc9280856msh632ec66aa03cc39p16dcc2jsn0397f2f0e650",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com"
        }
      }).then(response => {
        return response.json()
      }));
    }

    Promise.all(proms).then(list => list.forEach((response : any) => {
      let stock : any = {};
      stock.name = response.chart.result[0].meta.symbol;
      stock.timestamp = response.chart.result[0].timestamp;
      stock.currentPrice = response.chart.result[0].meta.regularMarketPrice;
      stock.priceTimeSeries = response.chart.result[0].indicators.adjclose[0].adjclose;
      stockList.push(stock);
    }));

    return stockList;
  }
}
