import { Component } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent {
  userProfile = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    imageUrl: ''
  };

  constructor(private modalService: DialogService) {}

  openChangePassword() {
    const content = `<app-change-password></app-change-password>`;
    this.modalService.open(content);
  }

  openUploadImage() {
    const content = `<app-upload-image (imageUploaded)="updateProfileImage($event)"></app-upload-image>`;
    this.modalService.open(content);
  }

  updateProfileImage(imageUrl: string) {
    this.userProfile.imageUrl = imageUrl;
  }
}
