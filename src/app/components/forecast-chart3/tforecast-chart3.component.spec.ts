import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastChart3Component } from './forecast-chart3.component';

describe('TransactionsPieComponent', () => {
  let component: ForecastChart3Component;
  let fixture: ComponentFixture<ForecastChart3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastChart3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastChart3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
