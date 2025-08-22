import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-level',
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 80;   // Progresso em %

  radius = 65;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {}
}