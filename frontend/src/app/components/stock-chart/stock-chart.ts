// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { createChart } from 'lightweight-charts';


import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  createChart,
  LineSeries,
  IChartApi
} from 'lightweight-charts';

@Component({
  selector: 'app-stock-chart',
  imports: [],
  templateUrl: './stock-chart.html',
  styleUrl: './stock-chart.css',
})
export class StockChart {

  @ViewChild('chart', { static: true }) chartEl!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const chart: IChartApi = createChart(this.chartEl.nativeElement, {
      width: 300,
      height: 150,
      layout: {
        background: { color: 'transparent' },
        textColor: '#a51b1bff'
      }
    });

    const lineSeries = chart.addSeries(LineSeries);

    lineSeries.setData([
      { time: '2024-01-01', value: 120 },
      { time: '2024-01-02', value: 130 },
      { time: '2024-01-03', value: 125 }
    ]);
  }
}



// @Component({
//   selector: 'app-stock-chart',
//   templateUrl: './stock-chart.component.html'
// })
// export class StockChartComponent implements AfterViewInit {


// }


// }
