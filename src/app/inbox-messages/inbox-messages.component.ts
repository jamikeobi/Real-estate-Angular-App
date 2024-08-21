import { Component } from '@angular/core';

@Component({
  selector: 'app-inbox-messages',
  templateUrl: './inbox-messages.component.html',
  styleUrls: ['./inbox-messages.component.css']
})
export class InboxMessagesComponent {
  messages = [
    {
      subject: 'Property Inquiry',
      sender: 'John Doe',
      message: 'I am interested in learning more about the property at 123 Main St.',
      date: '2023-11-22'
    },
    {
      subject: 'Property Offer',
      sender: 'Jane Smith',
      message: 'I would like to make an offer on the property at 456 Elm St.',
      date: '2023-12-05'
    },
    // ... more messages
  ];
  
}
