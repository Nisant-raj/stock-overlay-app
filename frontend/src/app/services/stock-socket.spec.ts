import { TestBed } from '@angular/core/testing';

import { StockSocket } from './stock-socket';

describe('StockSocket', () => {
  let service: StockSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
