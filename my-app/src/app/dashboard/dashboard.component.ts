import { Component, OnInit } from '@angular/core';
import { stockList } from "../stockList"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stocks: any;

  constructor() { 
    console.log(stockList)
    this.stocks = stockList.reduce((acc, curr) => {
      console.log(acc, curr.name, window.localStorage.getItem(curr.name));
      if(window.localStorage.getItem(curr.name) === "true")
        return [...acc, curr.name];
      else 
        return acc
    }, [])
    console.log(this.stocks)
  }

  ngOnInit(): void {
  }

}
