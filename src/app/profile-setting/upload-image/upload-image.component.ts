import { Component, EventEmitter, Output } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  @Output() imageUploaded = new EventEmitter<string>();

  constructor(private modalService: DialogService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      this.imageUploaded.emit(imageUrl);
      this.modalService.close();
    }
  }

  close() {
    this.modalService.close();
  }
}
