import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class StockService {

    constructor(private http: HttpClient) {  }
  private API = 'http://localhost:3000/api/stock';

  getStock(symbol: string) {
    return this.http.get<any>(`${this.API}/${symbol}`);
  }

  getHistory(symbol: string) {
    return this.http.get<any[]>(`${this.API}/${symbol}/history`);
  }
}
