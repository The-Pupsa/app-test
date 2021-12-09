import { TestBed } from '@angular/core/testing';

import { ChartDatasetService } from './chart-dataset.service';

describe('ChartDatasetService', () => {
  let service: ChartDatasetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDatasetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
