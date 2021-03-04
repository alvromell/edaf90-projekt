import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  stocks: any;

  constructor() { 

    this.stocks = [
      {
        "name": "Aktie 1"
      },
      {
        "name": "Aktie 2"
      },
      {
        "name": "Aktie 3"
      },
      {
        "name": "Aktie 4"
      },
      {
        "name": "Aktie 5"
      },
      {
        "name": "Aktie 6"
      },
      {
        "name": "Aktie 7"
      },
      {
        "name": "Aktie 8"
      },
      {
        "name": "Aktie 9"
      },
      {
        "name": "Aktie 10"
      },

    ]
  }

  ngOnInit(): void {
  }

}
