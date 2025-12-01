import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lisi-feedback',
  imports: [CommonModule],
  templateUrl: './lisi-feedback.component.html',
  styleUrl: './lisi-feedback.component.scss'
})
export class LisiFeedbackComponent {

  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() title: string = '';
  @Input() message: string = '';

  @Input() score: number = 0;

  @Output() closed = new EventEmitter<void>();

  show: boolean = false;

  stars = Array.from({ length: 5 });

  open(
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success',
    score: number = 0
  ) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.score = score;
    this.show = true;
  }

  close() {
    this.show = false;
    this.closed.emit();
  }

  getStarClass(index: number): string {
    return index < this.score ? 'star-filled' : 'star-empty';
  }
}
