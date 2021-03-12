import { Component, OnInit } from '@angular/core';
import { stockList } from "../stockList"
import { StockDataService } from '../stock-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stocks: any;
  stockData: any;
  dailyChange: any;

  constructor(private stockDataService : StockDataService) { 

    console.log(stockList)
    this.stocks = stockList.reduce((acc: any, curr: { name: string; key: any; }) => {
    //  console.log(acc, curr.name, window.localStorage.getItem(curr.name));
      if(window.localStorage.getItem(curr.name) === "true")
        return [...acc, {name: curr.name, key:curr.key}];
      else 
        return acc
    }, [])
    console.log(this.stocks)
    
    let stocksToFetch = this.stocks.map((elem: { key: any; }) => elem.key);
    let prom = this.stockDataService.fetchData(stocksToFetch,'1d','1y');
    prom.then( _ => this.stockData = this.stockDataService.getStockData())
    .then( _ => this.dailyChange = this.getDailyChange());
    
  }

  ngOnInit(): void {
    
  }

  getDailyChange() {
    
    let dailyChanges = this.stockData.map((stock) =>
      ({key: stock.ticker, 
        change: Math.round(((stock.close[stock.close.length-1] - stock.open[stock.open.length-1])/stock.open[stock.open.length-1]) * 10000) / 100,
        open: Math.round(stock.open[stock.open.length-1] * 100)/100,
        close: Math.round(stock.close[stock.close.length-1] * 100)/100
      }) 
    );
    console.log(this.stockData)
    console.log(dailyChanges);
    
    return dailyChanges;
  }

}
