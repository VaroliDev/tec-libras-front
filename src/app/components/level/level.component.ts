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
  private progress: any;

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
    

    const isSmallScreen = window.innerWidth < 575;

    if (isSmallScreen) {
      this.radius = 33;
    } else {
      this.radius = 65; 
    }

    this.circumference = 2 * Math.PI * this.radius;
  }
}