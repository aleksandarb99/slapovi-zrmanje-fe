import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  showError(
    message: string,
    language: string,
    title: string,
    alreadyTranslated: boolean
  ): void {
    if (!alreadyTranslated) {
      message = JSON.parse(message)[language];
    }
    this.toastr.error(message, title);
  }

  showSuccess(message: string, title: string): void {
    this.toastr.success(message, title);
  }
}
