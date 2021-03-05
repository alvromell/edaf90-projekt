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

    this.stocks = stockList;
    console.log(this.stocks)
  }

  ngOnInit(): void {
  }

  onClick(value: any) {
    console.log("click", value);
    window.localStorage.setItem(value, 'true');
  }

}
