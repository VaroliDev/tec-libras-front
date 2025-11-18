import { Injectable } from '@angular/core';
import { LEVEL_LIST } from '../assets/levels/level-index';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor() {}

  //Retorna a quantidade de níveis
  getLevelCount(): number {
    return LEVEL_LIST.length;
  }

  //Retorna uma lista dos níveis
  getLevelList(): string[] {
    return LEVEL_LIST.map((_, i) => `level${i + 1}`);
  }
}
