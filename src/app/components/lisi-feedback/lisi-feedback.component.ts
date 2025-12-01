import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lisi-feedback',
  imports: [CommonModule],
  templateUrl: './lisi-feedback.component.html',
  styleUrl: './lisi-feedback.component.scss'
})
export class LisiFeedbackComponent {
  private router = inject(Router);
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() title: string = '';
  @Input() message: string = '';

  show: boolean = false;
  stars = Array(5);

  close() { 
    this.router.navigate(['inicio']); 
  }

  open(title: string, message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.title = title;
    this.message = message;
    this.type = type;
    this.show = true;
    
  }
}
