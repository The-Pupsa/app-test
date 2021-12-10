import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';

import { FiltersService } from '../../filters.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private _filter: FiltersService) {
    const date = new Date(); // Now
    date.setDate(date.getDate() + 30); // Set now + 30 days as the new date

    this.formGroup = new FormGroup({
      startDateTimeUtc: new FormControl(new Date()),
      endDateTimeUtc: new FormControl(date),
    });
  }

  /** @inheritdoc */
  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._filter.dateRangeChanges$.next(value);
      });
  }
}
