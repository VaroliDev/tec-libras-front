import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LevelStateService } from '../../services/level-state.service';

@Component({
  selector: 'app-level',
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  private levelState = inject(LevelStateService);

  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;
  private router = inject(Router)

  radius = 65;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  PagNivel(){
    this.levelState.setLevel(this.level);
    this.router.navigate(['nivel'])
  }

  ngOnInit(): void {}
}