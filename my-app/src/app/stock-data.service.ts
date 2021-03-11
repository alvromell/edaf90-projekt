import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {

  constructor() {}

  getStockData(responses : Response[]) : any[] {
    let data : any = [];

    responses.forEach((response : any) => {
        console.log(response);
        let stock : any = {};
        stock.ticker = response.chart.result[0].meta.symbol;
        stock.timeStamps = response.chart.result[0].timestamp;
        stock.close = response.chart.result[0].indicators.quote[0].close;
        stock.open = response.chart.result[0].indicators.quote[0].open;
        stock.high = response.chart.result[0].indicators.quote[0].high;
        stock.low = response.chart.result[0].indicators.quote[0].low;
        stock.volume = response.chart.result[0].indicators.quote[0].volume;
              
        data.push(stock);
    });
    return data;
  }

  async getTimeSeries(stocks : string[], time : string, range : string) : Promise<Response[]> {
    /*
     * intervals:  '1m', '5m', '15m', '1d', '1wk', '1mo'
     * range:      '1d', '5d', '3mo', '6mo', '1y', '5y', '10y', 'ytd', 'max'
     */

    let proms : Promise<Response>[] = [];

    stocks.forEach(stock => fetchData(stock));

    async function fetchData(stock : string) {
      let url    : string = 'https://yahoo-finance-low-latency.p.rapidapi.com/v8/finance/chart/' + stock + '?interval='
                            + time + '&range=' + range + '&region=US&lang=en';

      proms.push(fetch(url, {
        "method": "GET",
        "headers": {
          //"x-rapidapi-key": "edc9280856msh632ec66aa03cc39p16dcc2jsn0397f2f0e650",
          "x-rapidapi-key": "46bc96430emsh1cae8bae9a70a3dp1f84e3jsna5efeadafc81",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com"
        }
      }).then(response => {
        return response.json()
      }));
    }

    /*
    Promise.all(proms).then(list =>
        list.forEach((response : any) => {
          let stock : any = {};
          stock.ticker = response.chart.result[0].meta.symbol;
          stock.timeStamps = response.chart.result[0].timestamp;
          stock.currentPrice = response.chart.result[0].meta.regularMarketPrice;
          stock.priceTimeSeries = response.chart.result[0].indicators.adjclose[0].adjclose;
                
          stockList.push(stock);
          //proms[0].then((response : any) => console.log(response.chart.result[0].meta.symbol));
    }));
    */
    let allProms : Promise<Response[]> = Promise.all(proms);

    return allProms;
  }
}
