import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lisi-feedback',
  imports: [CommonModule],
  templateUrl: './lisi-feedback.component.html',
  styleUrl: './lisi-feedback.component.scss'
})
export class LisiFeedbackComponent {
  stars = Array(5);
}
