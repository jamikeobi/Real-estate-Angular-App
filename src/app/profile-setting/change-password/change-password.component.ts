import { Component } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword = '';
  newPassword = '';

  constructor(private modalService: DialogService) {}

  onSubmit() {
    console.log('Changing password...');
    this.modalService.close();
  }

  close() {
    this.modalService.close();
  }
}
