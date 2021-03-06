import { Component, OnInit } from '@angular/core';
import { stockList } from "../stocklist"
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  stocks: any;

  constructor() { 

    const newStockState = stockList.reduce((acc, curr) => {
      console.log(acc, curr.name, window.localStorage.getItem(curr.name));
      if(window.localStorage.getItem(curr.name) === "true")
        return [...acc, {name: curr.name, checked: true}];
      else 
        return [...acc, {name: curr.name, checked: false}]
    }, [])
    this.stocks = newStockState;
    console.log(this.stocks)
  }

  ngOnInit(): void {
  }

  onClick(value: any) {
    console.log("click", value);
    if(window.localStorage.getItem(value) === 'true')
      window.localStorage.setItem(value, 'false');
    else 
      window.localStorage.setItem(value, 'true');
  }

}
