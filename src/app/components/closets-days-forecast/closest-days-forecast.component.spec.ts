import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosestDaysForecastComponent } from './closest-days-forecast.component';

describe('LatestTransactionsComponent', () => {
  let component: ClosestDaysForecastComponent;
  let fixture: ComponentFixture<ClosestDaysForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosestDaysForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosestDaysForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
