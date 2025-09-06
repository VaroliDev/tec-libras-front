import { Component,Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-level-theme',
  imports: [],
  templateUrl: './level-theme.component.html',
  styleUrl: './level-theme.component.scss'
})
export class LevelThemeComponent {
  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;

  radius = 65;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {}
}
