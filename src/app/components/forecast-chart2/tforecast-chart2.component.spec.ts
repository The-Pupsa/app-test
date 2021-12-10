import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastChart2Component } from './forecast-chart2.component';

describe('TransactionsPieComponent', () => {
  let component: ForecastChart2Component;
  let fixture: ComponentFixture<ForecastChart2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastChart2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
