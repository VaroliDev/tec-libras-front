import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LEVEL_LIST } from '../assets/levels/level-index';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private currentLevel: number | null = null;
  private router = inject(Router);
  
  constructor() {}

  //Retorna a quantidade de níveis
  getLevelCount(): number {
    return LEVEL_LIST.length;
  }

  //Retorna uma lista dos níveis
  getLevelList(): string[] {
    return LEVEL_LIST.map((_, i) => `level${i + 1}`);
  }

  setLevel(level: number) {
    this.currentLevel = level;
  }

  getLevel(): number | null {
    /*
    * Verficação para garantir que um nível foi definido
    if(!this.currentLevel){
      this.router.navigate(['/inicio']);
      return null;
    }
    */
    return this.currentLevel;
  }
}
