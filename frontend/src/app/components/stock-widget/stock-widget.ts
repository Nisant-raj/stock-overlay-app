import { Component, HostListener, OnInit } from '@angular/core';
import { StockService } from '../../services/stock';
import { StockChart } from "../stock-chart/stock-chart";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
  imports: [HttpClientModule,CommonModule],
  templateUrl: './stock-widget.html',
  styleUrl: './stock-widget.css',
  providers: [StockService]
})
export class StockWidget implements OnInit {

  stock: any;
  showChart = true;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.loadStock();
    setInterval(() => this.loadStock(), 5000);
  }

  loadStock() {
    console.log('Loading stock data...');
    this.stockService.getStock('AEROFLEX.NS').subscribe({
      next: (data: any) => {
        console.log('Stock data received:', data);
        this.stock = data;
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

}
