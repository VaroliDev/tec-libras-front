import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sinal',
  imports: [],
  templateUrl: './sinal.component.html',
  styleUrl: './sinal.component.scss'
})
export class SinalComponent {
  @Input() dadosSinal: any;
}