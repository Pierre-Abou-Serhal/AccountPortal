import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  GetAllAccounts(): Observable<GetAccountsRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .get<GetAccountsRes>(
        this.apiUrl + 'GetAccounts',
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  GetAccountById(id: number): Observable<GetAccountRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .get<GetAccountRes>(
        this.apiUrl + `GetAccountById/${id}`,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  CreateAccount(apiReq: CreateAccountReq): Observable<CreateAccountRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .post<CreateAccountRes>(
        this.apiUrl + 'CreateAccount',
        apiReq,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  UpdateAccount(apiReq: UpdateAccountReq): Observable<UpdateAccountRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .post<UpdateAccountRes>(
        this.apiUrl + 'UpdateAccount',
        apiReq,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  DeleteAccount(id: number): Observable<DeleteAccountRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .delete<DeleteAccountRes>(
        this.apiUrl + `DeleteAccount/${id}`,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  Deposit(apiReq: DepositReq): Observable<DepositRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .post<DepositRes>(
        this.apiUrl + 'Deposit',
        apiReq,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  Withdraw(apiReq: WithdrawReq): Observable<WithdrawRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .post<WithdrawRes>(
        this.apiUrl + 'Withdraw',
        apiReq,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  GetAccountBalance(id: number): Observable<GetAccountBalanceRes> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.httpClient
      .get<GetAccountBalanceRes>(
        this.apiUrl + `GetAccountBalance/${id}`,
        httpOptions
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

}

//#region API Models
export class Account {
  Id: number = 0;
  AccountHolderName: string = '';
  InitialDeposit: number = 0.0;
  AccountType: string = '';
}

export class Transaction {
  Amount: number = 0.0;
  AccountId: number = 0.0;
}

//#endregion


//#region API Requests
export class CreateAccountReq {
  Account: Account = new Account();
}

export class UpdateAccountReq {
  Account: Account = new Account();
}

export class DepositReq {
  Transaction: Transaction = new Transaction();
}

export class WithdrawReq {
  Transaction: Transaction = new Transaction();
}

//#endregion

//#region API Response
export class GetAccountsRes {
  AccountList: Array<Account> = [];
}

export class GetAccountRes {
  Account: Account = new Account();
}

export class CreateAccountRes {
  Account: Account = new Account();
}

export class UpdateAccountRes {
  Account: Account = new Account();
}

export class DeleteAccountRes {
  Account: Account = new Account();
}

export class DepositRes {
  Transaction: Transaction = new Transaction();
}

export class WithdrawRes {
  Transaction: Transaction = new Transaction();
}

export class GetAccountBalanceRes {
  Balance: number = 0.0;
}

//#endregion
