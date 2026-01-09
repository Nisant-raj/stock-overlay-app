// import { Injectable } from '@angular/core';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StockSocket {

  private socket!: WebSocket;

  constructor(private zone: NgZone,private cdr: ChangeDetectorRef) {}

  connect(): Observable<any> {
    this.socket = new WebSocket('ws://localhost:3001');

    return new Observable(observer => {
      this.socket.onmessage = (event) => {
        // this.zone.run(() => {
          observer.next(JSON.parse(event.data));
          this.cdr.detectChanges();
        // });
      };

      this.socket.onerror = err => observer.error(err);
      this.socket.onclose = () => observer.complete();
    });
  }
  
}
