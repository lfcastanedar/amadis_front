import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  showAlert(title: string, message: string, icon: SweetAlertIcon = 'info'): void {
    Swal.fire({
      title,
      text: message,
      icon,
      confirmButtonText: 'OK',
      confirmButtonColor: '#4b6cb7'
    });
  }
  

  showError(message: string): void {
    this.showAlert('Error', message, 'error');
  }
  

  showSuccess(message: string): void {
    this.showAlert('Success', message, 'success');
  }
  

  showWarning(message: string): void {
    this.showAlert('Warning', message, 'warning');
  }

  showInfo(message: string): void {
    this.showAlert('Information', message, 'info');
  }
  
  showConfirm(
    title: string, 
    message: string, 
    confirmText: string = 'Yes', 
    cancelText: string = 'No'
  ): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: '#4b6cb7',
        cancelButtonColor: '#6c757d'
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  }
  

  showToast(
    message: string, 
    icon: SweetAlertIcon = 'success',
    position: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end' = 'top-end'
  ): void {
    const Toast = Swal.mixin({
      toast: true,
      position,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    
    Toast.fire({
      icon,
      title: message
    });
  }

  closeAll(): void {
    Swal.close();
  }
}