import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ITransaction } from '../../shared/interfaces/transaction.interface';
import { FiltersService } from '../../filters.service';

@Component({
  selector: 'app-latest-transactions',
  templateUrl: './latest-transactions.component.html',
  styleUrls: ['./latest-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LatestTransactionsComponent implements OnInit {

  latestTransactions?: ITransaction[];

  constructor(private _transactions: TransactionService,
              private _filter: FiltersService,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.latestTransactions = this._transactions.getTransactions(8);

    this._filter.dateRangeChanges$
      .subscribe((value) => {
        this.latestTransactions = this._transactions.getTransactions(8, value.startDateTimeUtc, value.endDateTimeUtc);
        this._cdr.detectChanges();
      });
  }

  isRefund(amount: string): boolean {
    try {
      return parseFloat(amount) < 0;
    } catch {
      return false;
    }
  }

}
