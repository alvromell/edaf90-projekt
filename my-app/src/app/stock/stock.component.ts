import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../../assets/canvasjs-stock-1.2.10/canvasjs.stock.min';

import { StockDataService } from '../stock-data.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private stockData : StockDataService, private router: Router) { }
  addSymbols(e){
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
      order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }
  


  ngOnInit(): void {

    let url = this.router.url;
    let key:string = url.split("name=").pop()!;
    console.log(key);
    let data : any[] = [];
    let prom :  Promise<Response[]> = this.stockData.getTimeSeries([key], '1d', '1y');
    prom.then(responses => {data = this.stockData.getStockData(responses);}).then(_ => {
      console.log(data[0].timeStamps[0]);
      let dataPoints1 : any[] = [];
      let dataPoints2 : any[] = [];
      let dataPoints3 : any[] = [];
      let dpsLength = 0;

      for(let i = 0; i < data[0].timeStamps.length; i++) {
        dataPoints1.push({x: new Date(1000 * data[0].timeStamps[i]), y: [Number(data[0].open[i]), Number(data[0].high[i]), Number(data[0].low[i]), Number(data[0].close[i])]});;
        dataPoints2.push({x: new Date(1000 * data[0].timeStamps[i]), y: Number(data[0].volume[i])});
        dataPoints3.push({x: new Date(1000 * data[0].timeStamps[i]), y: Number(data[0].close[i])});
      }

      let chart = new CanvasJS.StockChart("chartContainer",{
        theme: "light2",
        exportEnabled: true,
        title:{
          text:"Angular StockChart with Price & Volume"
        },
        subtitles: [{
          text: key+"/USD"
        }],
        charts: [
          {
          toolTip: {
            shared: true
          },
          axisX: {
            lineThickness: 5,
            tickLength: 0,
            labelFormatter: function(e) {
              return "";
            },
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              labelFormatter: function(e) {
                return "";
              }
            }
          },
          axisY: {
            prefix: "$",
            tickLength: 0,
            title: "Etherium Price",
          },
          legend: {
            verticalAlign: "top"
          },
          data: [{
            name: "Price",
            yValueFormatString: "$#,###.##",
            xValueFormatString: "MMM DD YYYY",
            type: "candlestick",
            dataPoints : dataPoints1
          }]
        },
        {
          height: 100,
          toolTip: {
            shared: true
          },
          axisX: {
            crosshair: {
              enabled: true,
              snapToDataPoint: true,
              valueFormatString: "MMM DD YYYY"
            }
          },
          axisY: {
            prefix: "$",
            tickLength: 0,
            title: "Volume",
            labelFormatter: this.addSymbols
          },
          legend: {
            verticalAlign: "top"
          },
          data: [{
            name: "Volume",
            yValueFormatString: "$#,###.##",
            xValueFormatString: "MMM DD YYYY",
            dataPoints : dataPoints2
          }]
        }],
        navigator: {
          data: [{
            dataPoints: dataPoints3
          }],
          slider: {
            //minimum: new Date(data[0].timeStamps[0]),
            //maximum: new Date(data[0].timeStamps[data[0].timeStamps.length - 1])
          }
        }
      });
      chart.render();
      /*
      $.getJSON("https://canvasjs.com/data/docs/ethusd2018.json", function(data) {
        for(var i = 0; i < data.length; i++){
          dataPoints1.push({x: new Date(data[i].date), y: [Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]});;
          dataPoints2.push({x: new Date(data[i].date), y: Number(data[i].volume_usd)});
          dataPoints3.push({x: new Date(data[i].date), y: Number(data[i].close)});
        }
        chart.render();
      });
      */
    });
  }

}

