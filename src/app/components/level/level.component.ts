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

  @Input() level: number = 1;    
  @Input() percent: number = 70; 
  @Input() levelstyle: number = this.level % 2;
  private router = inject(Router);

  radius = 33;          
  circumference = 2 * Math.PI * this.radius;

  PagNivel() {
    this.LevelService.setLevel(this.level);
    this.router.navigate(['nivel']);
  }

  ngOnInit(): void {
    // define o raio baseado no tamanho da tela
    const isSmallScreen = window.innerWidth < 575; // você escolhe o valor

    if (isSmallScreen) {
      this.radius = 33;   // tela pequena
    } else {
      this.radius = 65;   // tela grande
    }

    // recalcula o circumference
    this.circumference = 2 * Math.PI * this.radius;
  }
}