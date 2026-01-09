import { Component, HostListener, OnInit, NgZone } from '@angular/core';
import { StockService } from '../../services/stock';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { StockSocket } from '../../services/stock-socket'

declare global {
  interface Window {
    electronAPI: {
      closeApp: () => void;
      minimizeApp: () => void;
    };
  }
}

@Component({
  selector: 'app-stock-widget',
  imports: [CommonModule],
  templateUrl: './stock-widget.html',
  styleUrl: './stock-widget.css',
  providers: [StockService, StockSocket]
})
export class StockWidget implements OnInit {

  stock: any;
  showChart = true;
  symbols = [
    'BINANCE:BTCUSDT',
    'BINANCE:ETHUSDT',
    'BINANCE:DOGEUSDT',
    'BINANCE:SOLUSDT'
  ];

  constructor(private stockService: StockService, private zone: NgZone, private cdr: ChangeDetectorRef, private socketService: StockSocket) { }
  prices: Record<string, number> = {};
  priceClassMap: Record<string, 'up' | 'down'> = {};
  previousPriceMap: Record<string, number> = {};

  ngOnInit() {
    // this.loadStock();
    // this.intervalId = setInterval(() => {
    //   if (this.isMarketOpen()) {
    //     this.loadStock();
    //   }
    // }, 5000);
    //    this.zone.run(() => {
    //   this.loadStock();
    // });
    // setInterval(() => this.loadStock(), 5000)

    //  this.socketService.connect().subscribe((trade:any) => {
    //   this.stock = {
    //     symbol: trade.s,
    //     price: trade.p,
    //     time: trade.t
    //   };
    // });
    // }

    this.socketService.connect().subscribe((trade: any) => {
      const symbol = trade.symbol;
      const price = trade.price;

      const prev = this.previousPriceMap[symbol];

      if (prev !== undefined) {
        if (price > prev) {
          this.priceClassMap[symbol] = 'up';
        } else if (price < prev) {
          this.priceClassMap[symbol] = 'down';
        }
      }

      this.previousPriceMap[symbol] = price;
      this.prices[symbol] = price;
    });

  }
  previousPrice = 0;
  priceClass = '';
  loadStock() {
    console.log('Loading stock data...');
    this.stockService.getStock('LSEG.L').subscribe({
      next: (data: any) => {
        console.log('Stock data received:', data);
        // this.zone.run(() => {
        this.stock = data;
        // });
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        console.error('Error loading stock:', error);
      }
    });





  }

  toggleChart() {
    console.log("ijuhygvf")
    // this.showChart = !this.showChart;
  }

  minimize() {
    if (window.electronAPI) {
      window.electronAPI.minimizeApp();
    }
  }

  closeApp() {
    if (window.electronAPI) {
      window.electronAPI.closeApp();
    }
  }

  isMarketOpen(): boolean {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();

    const currentMinutes = hours * 60 + minutes;

    const marketOpen = 9 * 60;        // 9:00 AM
    const marketClose = 15 * 60 + 30; // 3:30 PM

    return currentMinutes >= marketOpen && currentMinutes <= marketClose;
  }

  intervalId!: any;

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  unsubscribe(){
    
  }
}
