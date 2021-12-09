import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FiltersService } from '../../filters.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private _filter: FiltersService) {
    this.formGroup = new FormGroup({
      startDateTimeUtc: new FormControl(),
      endDateTimeUtc: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this._filter.dateRangeChanges$.next(value);
      });
  }
}
