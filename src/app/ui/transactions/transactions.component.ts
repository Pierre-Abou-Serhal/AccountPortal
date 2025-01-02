import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../../services/app.state.service";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ToastrService} from 'ngx-toastr';
import {
  Account,
  ApiService,
  DepositReq,
  WithdrawReq
} from "../../services/api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  constructor(private appStateService: AppStateService, private apiService: ApiService, private formBuilder: FormBuilder, private toaster: ToastrService)
  {}

  form: FormGroup = new FormGroup({});
  isUserInteraction: boolean = false;
  accountList: Array<Account> = [];

  //#region Subscriptions
  getAccountsSub: Subscription = new Subscription();
  depositSub: Subscription = new Subscription();
  withdrawSub: Subscription = new Subscription();
  getAccountBalanceSub: Subscription = new Subscription();
  //#endregion

  //#region API Requests
  depositReq: DepositReq = new DepositReq();
  withdrawReq: WithdrawReq = new WithdrawReq();

  //#endregion

  ngOnInit(): void {
    this.appStateService.changeCurrentOpenedTab("transactions");

    this.form = this.formBuilder.group({
      AccountId: ['', Validators.required],
      Amount: ['', [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
    });

    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this.getAccountsSub = this.apiService
      .GetAllAccounts()
      .subscribe({
        next: (res) => {
          this.accountList = res.AccountList;
        },
      });
  }

  getAccountBalance(accountId: number) {
    this.getAccountBalanceSub = this.apiService
      .GetAccountBalance(accountId)
      .subscribe({
        next: (res) => {
          this.toaster.info(res.Balance.toLocaleString('en-us', {minimumFractionDigits: 2}), 'Balance');
          this.form.controls['AccountId'].setValue('');
          this.form.controls['Amount'].setValue('');

          this.isUserInteraction = false;
        },
      });
  }

  onDepositClick(): void {
    this.isUserInteraction = true;

    if (this.form.invalid) {
      return;
    }

    // Deposit Request
    this.depositReq.Transaction.AccountId = this.form.controls['AccountId'].value;
    this.depositReq.Transaction.Amount = this.form.controls['Amount'].value;

    // Create
    this.depositSub = this.apiService
      .Deposit(this.depositReq)
      .subscribe({
        next: (res) => {
          this.getAccountBalance(res.Transaction.AccountId);
        },
      });
  }

  onWithdrawClick(): void {
    this.isUserInteraction = true;

    if (this.form.invalid) {
      return;
    }

    // Withdraw Request
    this.withdrawReq.Transaction.AccountId = this.form.controls['AccountId'].value;
    this.withdrawReq.Transaction.Amount = this.form.controls['Amount'].value;

    // Create
    this.withdrawSub = this.apiService
      .Withdraw(this.withdrawReq)
      .subscribe({
        next: (res) => {
          this.getAccountBalance(res.Transaction.AccountId);
        },
      });
  }

  onFormControlKeyUp(): void {
    this.isUserInteraction = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
