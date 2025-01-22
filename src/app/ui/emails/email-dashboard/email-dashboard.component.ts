import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-email-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './email-dashboard.component.html',
  styleUrl: './email-dashboard.component.scss'
})
export class EmailDashboardComponent {
  emails = [
    { id: 1, type: 'Received', from: 'example1@mail.com', to: 'user@mail.com', subject: 'Welcome!', body: 'Welcome to our service.', attachments: [{ name: 'welcome.pdf', type: 'Received' }] },
    { id: 2, type: 'In Progress', from: 'example2@mail.com', to: 'user@mail.com', subject: 'Reminder', body: 'Please complete your task.', attachments: [{ name: 'task-details.docx', type: 'Sent For Validation' }] },
    { id: 3, type: 'Discarded', from: 'spam@mail.com', to: 'user@mail.com', subject: 'Spam Alert', body: 'This is a spam email.', attachments: [] },
  ];

  selectedEmail: any = null;

  selectEmail(email: any) {
    this.selectedEmail = email;
  }
}
