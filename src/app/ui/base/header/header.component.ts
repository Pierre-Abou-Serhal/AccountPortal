import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AppStateService} from "../../../services/app.state.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  activeTab: string = 'accounts'; // Default active tab

  constructor(private appStateService: AppStateService) {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {
    this.appStateService.currentOpenedTab.subscribe((tab) => {
      this.activeTab = tab;
    });
  }
}
