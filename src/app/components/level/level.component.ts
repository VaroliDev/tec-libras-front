import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-level',
  imports: [],
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  private LevelService = inject(LevelService);

  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;
  private router = inject(Router)

  radius = 65;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  PagNivel(){
    this.LevelService.setLevel(this.level);
    this.router.navigate(['nivel'])
  }

  ngOnInit(): void {}
}