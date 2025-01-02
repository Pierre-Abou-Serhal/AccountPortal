import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  //#region a way to transfer data between any two components
  private currentOpenedTabObservable = new BehaviorSubject<string>('accounts');
  currentOpenedTab = this.currentOpenedTabObservable.asObservable();

  changeCurrentOpenedTab(tab: string): void {
    this.currentOpenedTabObservable.next(tab);
  }

  constructor() {}
}
