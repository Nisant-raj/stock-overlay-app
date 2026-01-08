import { Component, HostListener, OnInit,NgZone  } from '@angular/core';
import { StockService } from '../../services/stock';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  imports: [ CommonModule],
  templateUrl: './stock-widget.html',
  styleUrl: './stock-widget.css',
  providers: [StockService]
})
export class StockWidget implements OnInit {

  stock: any;
  showChart = true;

  constructor(private stockService: StockService,private zone: NgZone,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadStock();
    // this.intervalId = setInterval(() => {
    //   if (this.isMarketOpen()) {
    //     this.loadStock();
    //   }
    // }, 5000);
  //    this.zone.run(() => {
  //   this.loadStock();
  // });
    setInterval(() => this.loadStock(), 5000)
  }

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
}
