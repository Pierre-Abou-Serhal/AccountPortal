import {Component, inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faAdd, faEdit, faRemove, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {DecimalPipe} from "@angular/common";

import {
  Account,
  ApiService,
} from "../../services/api.service";
import {AccountModalComponent} from "../modals/account-modal/account-modal.component";
import {ConfirmModalComponent} from "../modals/confirm-modal/confirm-modal.component";
import {AppStateService} from "../../services/app.state.service";

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    DecimalPipe,
    FontAwesomeModule,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit {
  constructor(private appStateService: AppStateService, private apiService: ApiService, private toaster: ToastrService) {
  }

  //#region Subscriptions
  getAccountsSub: Subscription = new Subscription();
  deleteAccountSub: Subscription = new Subscription();
  getAccountBalanceSub: Subscription = new Subscription();
  //#endregion

  //#region Icons
  faAdd = faAdd;
  faEdit = faEdit;
  faRemove = faRemove;
  faMoneyBill = faMoneyBill;
  //#endregion

  //#region Modal
  accountModalOption: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    centered: true,
  };

  private accountModalService = inject(NgbModal);

  private confirmModalService = inject(NgbModal);
  //#endregion

  accountList: Array<Account> = [];

  ngOnInit(): void {
    this.appStateService.changeCurrentOpenedTab("accounts");

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

  editAccount(account: Account = new Account()) {
    const modalRef = this.accountModalService.open(
      AccountModalComponent,
      this.accountModalOption
    );

    modalRef.componentInstance.account = account;

    modalRef.componentInstance.returnedAccount.subscribe(
      (account: Account) => {
        if (account.Id > 0) {
          this.getAllAccounts();
        }
      }
    );

    modalRef.result.then(
      (data: any) => {
      },
      (reason: any) => {
      }
    );
  }

  private deleteAccount(accountId: number) {

    this.deleteAccountSub = this.apiService
      .DeleteAccount(accountId)
      .subscribe({
        next: (res) => {
          // delete success
          this.getAllAccounts();
        },
      });
  }

  openDeleteConfirmModal(accountId: number) {
    const modalRef = this.confirmModalService.open(ConfirmModalComponent);

    modalRef.result.then(
      (data: any) => {
        if (data === true) {
          this.deleteAccount(accountId);
        }
      },
      (reason: any) => {
      }
    );
  }

  getAccountBalance(accountId: number) {
    this.getAccountBalanceSub = this.apiService
      .GetAccountBalance(accountId)
      .subscribe({
        next: (res) => {
          this.toaster.info(res.Balance.toLocaleString('en-us', {minimumFractionDigits: 2}), 'Balance');
        },
      });
  }
}
