import { Component, inject, input, Input } from '@angular/core';
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
  @Input() title: string = '';
  @Input() destination: string = ''; 

  stars = Array(5);

  fechar(destination: string){
    this.router.navigate([`${destination}`])
  }
}
