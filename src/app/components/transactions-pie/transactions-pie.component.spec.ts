import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsPieComponent } from './transactions-pie.component';

describe('TransactionsPieComponent', () => {
  let component: TransactionsPieComponent;
  let fixture: ComponentFixture<TransactionsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
