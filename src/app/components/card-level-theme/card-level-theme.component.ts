import { Component,Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-level-theme',
  imports: [],
  templateUrl: './card-level-theme.component.html',
  styleUrl: './card-level-theme.component.scss'
})
export class CardLevelThemeComponent {
  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;

  radius = 40;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {}
}
