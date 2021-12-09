import { Injectable } from '@angular/core';
import { ITransaction } from '../shared/interfaces/transaction.interface';
import { TRANSACTIONS } from '../../assets/mock/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() {
  }

  getTransactions(count?: number,
                  startDate?: Date,
                  endDate?: Date): ITransaction[] {

    // TODO запрос на сервер с параметром количества
    return TRANSACTIONS
      .map(transaction => {
        transaction.DateISO = new Date(transaction.DateISO);
        return transaction;
      })
      .filter(transaction => transaction.DateISO < (endDate || new Date())
        && transaction.DateISO > (startDate || new Date(0)))
      .slice(0, count || 1000);
  }
}
