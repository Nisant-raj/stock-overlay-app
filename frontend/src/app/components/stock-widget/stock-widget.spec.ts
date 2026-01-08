import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockWidget } from './stock-widget';

describe('StockWidget', () => {
  let component: StockWidget;
  let fixture: ComponentFixture<StockWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
