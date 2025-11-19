import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LEVEL_LIST } from '../../assets/levels/level-index';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private currentLevel: number | null = null;
  private currentTheme: number | null = null;
  private router = inject(Router);
  
  constructor() {}

  //Retorna a quantidade de níveis
  getLevelCount(): number {
    return LEVEL_LIST.length;
  }

  //Retorna uma lista dos níveis
  getLevelList(): string[] {
    return LEVEL_LIST.map((_, i) => `level${i+1}`);
  }

  async getData(id: number) {    
    return LEVEL_LIST[id-1]().then(level => level);
  };

  /*
  * Funções de Nivel
  */

  setLevel(level: number) {
    this.currentLevel = level;
  }

  getLevel(): number | null {
    if(!this.currentLevel){
      this.router.navigate(['/inicio']);
      return null;
    }
    return this.currentLevel;
  }

  /*
  * Funções de Temas
  */

  setTheme(theme: number) {
    this.currentTheme = theme;
  }

  getTheme(): number | null {
    if(!this.currentTheme){
      this.router.navigate(['/inicio']);
      return null;
    }
    return this.currentTheme;
  }

  getThemeData(themeId: number){
    return LEVEL_LIST[this.getLevel() as number - 1]().then(theme => (theme as any)[`tema${themeId}`]);
  }
}
