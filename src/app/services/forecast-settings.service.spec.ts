import { TestBed } from '@angular/core/testing';

import { ForecastSettingsService } from './forecast-settings.service';

describe('ForecastSettingsService', () => {
  let service: ForecastSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForecastSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
