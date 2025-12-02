import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
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

  // controla abrir/fechar
  show: boolean = false;

  // gera 5 estrelas
  stars = Array(5).fill(0);

  // Fecha o alert
  close() {
    this.show = false;
    this.closed.emit();
  }

  // Abre o alert
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

  getStarClass(index: number): string {
    return index < this.score ? 'star-filled' : 'star-empty';
  }
}
