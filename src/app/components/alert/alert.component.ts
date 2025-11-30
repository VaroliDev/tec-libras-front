import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- IMPORTAR

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],  // <-- ADICIONAR AQUI
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() type: 'success' | 'error' | 'warning' = 'success';
  @Input() message: string = '';

  show: boolean = false;

  close() { this.show = false; }

  open(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.message = message;
    this.type = type;
    this.show = true;
    setTimeout(() => this.close(), 10000);
  }
}
