import { Component, Input, inject, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-card-level-theme',
  imports: [],
  templateUrl: './card-level-theme.component.html',
  styleUrl: './card-level-theme.component.scss'
})
export class CardLevelThemeComponent implements OnChanges {

  private router = inject(Router);
  private levelService = inject(LevelService);
  private cd = inject(ChangeDetectorRef);

  PagNext() {
    this.levelService.setTheme(this.level);
    this.router.navigate(['temas']);
  }

  @Input() level: number = 1;          // Número do nível
  @Input() title: string = "Tema";     // Título do tema
  @Input() subtitle: string = "Subtítulo"; // Subtítulo do tema
  @Input() percent!: number;           // Progresso em % (SEM valor default)
  @Input() levelstyle: number = this.level % 2;

  radius = 30;                         // raio do círculo
  get circumference() {
    return 2 * Math.PI * this.radius;  // sempre recalculado corretamente
  }

  ngOnChanges(changes: SimpleChanges) {
    // Safari/iPhone precisa de re-render forçado para aplicar o @Input
    setTimeout(() => this.cd.detectChanges(), 0);
  }
}
