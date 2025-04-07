import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  constructor(private spinner: NgxSpinnerService) {}
  

  show(name: string = 'primary'): void {
    this.spinner.show(name);
  }
  
  hide(name: string = 'primary'): void {
    this.spinner.hide(name);
  }
  
  showForDuration(duration: number, name: string = 'primary'): void {
    this.show(name);
    setTimeout(() => {
      this.hide(name);
    }, duration);
  }
}