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
  emailsArray = [
    {
      EmailUniqueId: 'EMAIL_1',
      EmailFrom: 'Army@lebanon.com.lb',
      EmailTo: 'Salaire@Sgbl.com.lb',
      EmailSubject: 'Army Salaries 2025-01-01',
      EmailBody: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 10px;
      text-align: center;
    }
    .content {
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Our Service</h1>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Thank you for signing up for our service. We're excited to have you on board!</p>
      <p>If you have any questions, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      StatusValue: 'RECEIVED',
      Attachments: [
        {
          AttachmentId: 'ATTACHMENT_1',
          Name: 'SALAIRE.XLXS',
          StatusValue: 'RECEIVED'
        },
        {
          AttachmentId: 'ATTACHMENT_2',
          Name: 'BONUS.XLXS',
          StatusValue: 'DOWNLOADED'
        },
        {
          AttachmentId: 'ATTACHMENT_3',
          Name: 'TEST.TXT',
          StatusValue: 'DISCARDED'
        }
      ]
    },
    {
      EmailUniqueId: 'EMAIL_2',
      EmailFrom: 'Wizara@lebanon.com.lb',
      EmailTo: 'Salaire@Sgbl.com.lb',
      EmailSubject: 'Wizara Salaries 2025-01-01',
      EmailBody: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 10px;
      text-align: center;
    }
    .content {
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Our Service</h1>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Wizara, Wizara, Wizara</p>
      <p>Bla bla bla bla bla, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      StatusValue: 'IN_PROGRESS',
      Attachments: [
        {
          AttachmentId: 'ATTACHMENT_1',
          Name: 'SALAIRE.XLXS',
          StatusValue: 'REJECTED'
        },
        {
          AttachmentId: 'ATTACHMENT_2',
          Name: 'BONUS.XLXS',
          StatusValue: 'SENT_FOR_VALIDATION'
        },
        {
          AttachmentId: 'ATTACHMENT_3',
          Name: 'TRANSPORT.XLXS',
          StatusValue: 'VALIDATED'
        }
      ]
    },
    {
      EmailUniqueId: 'EMAIL_3',
      EmailFrom: 'Darak@lebanon.com.lb',
      EmailTo: 'Salaire@Sgbl.com.lb',
      EmailSubject: 'Darak Salaries 2025-01-01',
      EmailBody: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 10px;
      text-align: center;
    }
    .content {
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Our Service</h1>
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Darak, Darak, Darak</p>
      <p>Bla bla bla bla bla, feel free to <a href="mailto:support@example.com">contact us</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`,
      StatusValue: 'DISCARDED',
      Attachments: [
        {
          AttachmentId: 'ATTACHMENT_1',
          Name: 'SALAIRE.XLXS',
          StatusValue: 'SENT_FOR_VALIDATION'
        },
        {
          AttachmentId: 'ATTACHMENT_2',
          Name: 'BONUS.XLXS',
          StatusValue: 'REJECTED'
        },
        {
          AttachmentId: 'ATTACHMENT_3',
          Name: 'TRANSPORT.XLXS',
          StatusValue: 'VALIDATED'
        }
      ]
    }
  ];


  // emails = [
  //   { id: 1, type: 'Received', from: 'example1@mail.com', to: 'user@mail.com', subject: 'Welcome!', body: 'Welcome to our service.', attachments: [{ name: 'welcome.pdf', type: 'Received' }] },
  //   { id: 2, type: 'In Progress', from: 'example2@mail.com', to: 'user@mail.com', subject: 'Reminder', body: 'Please complete your task.', attachments: [{ name: 'task-details.docx', type: 'Sent For Validation' }] },
  //   { id: 3, type: 'Discarded', from: 'spam@mail.com', to: 'user@mail.com', subject: 'Spam Alert', body: 'This is a spam email.', attachments: [] },
  // ];

  filteredEmails = this.emailsArray;
  selectedEmail: any = null;
  currentTab: string = 'Received/In Progress';

  selectEmail(email: any) {
    this.selectedEmail = email;
  }

  filterEmails(tab: string) {
    this.currentTab = tab;
    if (tab === 'Received/In Progress') {
      this.filteredEmails = this.emailsArray.filter(email => email.StatusValue === 'RECEIVED' || email.StatusValue === 'IN_PROGRESS');
    } else if (tab === 'Completed') {
      this.filteredEmails = this.emailsArray.filter(email => email.StatusValue === 'COMPLETED');
    } else if (tab === 'Discarded') {
      this.filteredEmails = this.emailsArray.filter(email => email.StatusValue === 'DISCARDED');
    }
  }
}
