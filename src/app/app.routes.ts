import { Routes } from '@angular/router';
import {AccountsComponent} from "./ui/accounts/accounts.component";
import {TransactionsComponent} from "./ui/transactions/transactions.component";
import {PageNotFound400Component} from "./ui/base/page-not-found-400/page-not-found-400.component";

export const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: '', redirectTo: 'accounts', pathMatch: 'full' },
  { path: '**', component: PageNotFound400Component },
];
