import { Component,Input, inject} from '@angular/core';
import { Router } from '@angular/router';

import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-card-level-theme',
  imports: [],
  templateUrl: './card-level-theme.component.html',
  styleUrl: './card-level-theme.component.scss'
})
export class CardLevelThemeComponent {
  private router= inject(Router)
  private levelService = inject(LevelService);

  PagNext(){
    this.levelService.setTheme(this.level);
    this.router.navigate(['temas'])
  }

  @Input() level: number = 1;     // Número do nível
  @Input() title: string = "Tema"; // Título do tema
  @Input() subtitle: string = "Subtítulo"; // Subtítulo do tema
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;

  radius = 40;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {}
}
