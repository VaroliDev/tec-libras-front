import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LevelStateService {
  private currentLevel: number | null = null;
  private router = inject(Router);

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
