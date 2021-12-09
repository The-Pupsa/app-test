import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IDateRange } from './shared/interfaces/date-range.interface';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  /** Emitted when application filter  changes. */
  readonly dateRangeChanges$ = new Subject<IDateRange>();

  constructor() { }
}
