import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Account, ApiService, CreateAccountReq, UpdateAccountReq} from "../../../services/api.service";
import {NgClass, NgIf} from "@angular/common";


@Component({
  selector: 'app-account-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.scss'
})
export class AccountModalComponent implements OnInit {
  @Input()
  account: Account = new Account();

  @Output() returnedAccount = new EventEmitter<Account>();

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  form: FormGroup = new FormGroup({});
  isUserInteraction: boolean = false;

  //#region Subscriptions
  updateAccountSub: Subscription = new Subscription();
  createAccountSub: Subscription = new Subscription();
  //#endregion

  //#region API Requests
  createAccountReq: CreateAccountReq = new CreateAccountReq();
  updateAccountReq: UpdateAccountReq = new UpdateAccountReq();
  //#endregion

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      AccountHolderName: [this.account.AccountHolderName, Validators.required],
      InitialDeposit: [this.account.InitialDeposit, [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
      AccountType: [this.account.AccountType, [Validators.required]],
    });
  }

  onCancelClick(): void {
    this.activeModal.dismiss();
  }

  onSaveClick(): void {
    this.isUserInteraction = true;

    if (this.form.invalid) {
      return;
    }

    // Create Request
    this.createAccountReq.Account.Id = -1;
    this.createAccountReq.Account.AccountHolderName = this.form.controls['AccountHolderName'].value;
    this.createAccountReq.Account.InitialDeposit = this.form.controls['InitialDeposit'].value;
    this.createAccountReq.Account.AccountType = this.form.controls['AccountType'].value;

    // Edit Request
    this.updateAccountReq.Account.Id = this.account.Id;
    this.updateAccountReq.Account.AccountHolderName = this.form.controls['AccountHolderName'].value;
    this.updateAccountReq.Account.InitialDeposit = this.form.controls['InitialDeposit'].value;
    this.updateAccountReq.Account.AccountType = this.form.controls['AccountType'].value;

    if(this.account.Id < 1){
      // Create
      this.createAccountSub = this.apiService
        .CreateAccount(this.createAccountReq)
        .subscribe({
          next: (res) => {
            this.returnedAccount.emit(res.Account);
            this.activeModal.close(res.Account);
          },
        });
    }
    else{
      // Update
      this.updateAccountSub = this.apiService
        .UpdateAccount(this.updateAccountReq)
        .subscribe({
          next: (res) => {
            this.returnedAccount.emit(res.Account);
            this.activeModal.close(res.Account);
          },
        });
    }
  }

  onFormControlKeyUp(): void {
    this.isUserInteraction = true;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
