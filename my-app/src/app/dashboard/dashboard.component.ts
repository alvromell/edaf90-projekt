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

  constructor(private stockDataService : StockDataService) { 

    this.stockData = this.stockDataService.getStockData();
    console.log(this.stockData);
    

    console.log(stockList)
    this.stocks = stockList.reduce((acc, curr) => {
      console.log(acc, curr.name, window.localStorage.getItem(curr.name));
      if(window.localStorage.getItem(curr.name) === "true")
        return [...acc, {name: curr.name, key:curr.key}];
      else 
        return acc
    }, [])
    console.log(this.stocks)
  }

  ngOnInit(): void {
  }

}
