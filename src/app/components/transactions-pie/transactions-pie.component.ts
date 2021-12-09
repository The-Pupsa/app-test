import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ITransaction } from '../../shared/interfaces/transaction.interface';
import { FiltersService } from '../../filters.service';

@Component({
  selector: 'app-transactions-pie',
  templateUrl: './transactions-pie.component.html',
  styleUrls: ['./transactions-pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsPieComponent implements OnInit {

  rawEntries: ITransaction[];

  constructor(private _transactions: TransactionService,
              private _filter: FiltersService,
              private _cdr: ChangeDetectorRef) {

    this.rawEntries = this._transactions.getTransactions();
  }

  ngOnInit(): void {
    this._filter.dateRangeChanges$
      .subscribe((value) => {
        this.rawEntries = this._transactions.getTransactions(undefined, value.startDateTimeUtc, value.endDateTimeUtc);
        this._cdr.detectChanges();
      });
  }
}
