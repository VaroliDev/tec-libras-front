import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LEVEL_LIST } from '../../assets/levels/level-index'
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private currentLevel: number | null = null;
  private currentTheme: number | null = null;
  private ProgressData: any = null;

  private router = inject(Router);

  http = inject(HttpClient)
  API_URL = API_URL
  
  constructor() {}

  /*
  * Funções Universais
  */

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

  getProgress(userId: number) {
    return this.http.post(`${this.API_URL}/user/progress/view`, {user_id  : userId});
  }

  createProgress(progress: any) {
    return this.http.post(`${this.API_URL}/user/progress`, progress);
  }

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

  /*
  * Funções de Progresso
  */

  getProgressData(user_id: number) {
    this.getProgress(user_id).subscribe((data: any) => {
      this.ProgressData = this.formatProgressData(data.progresso);
      console.log(this.ProgressData);
      return this.ProgressData;
    });
  }

  formatProgressData(progressList: any[]) {
  const formatted: any[] = [];

  progressList.forEach((item) => {
    // 1. Procurar o nível
    let level = formatted.find(l => l.level_id === item.level_id);
    if (!level) {
      level = {
        level_id: item.level_id,
        subjects: []
      };
      formatted.push(level);
    }

    // 2. Procurar o subject dentro do nível
    let subject = level.subjects.find((s: any) => s.subject_id === item.subject_id);
    if (!subject) {
      subject = {
        subject_id: item.subject_id,
        topics: []
      };
      level.subjects.push(subject);
    }

    // 3. Procurar o tópico dentro do subject
    let topic = subject.topics.find((t: any) => t.topic_id === item.topic_id);
    if (!topic) {
      topic = {
        topic_id: item.topic_id,
        is_completed: item.is_completed,
        completion_date: item.completion_date,
        id: item.id,
        user_id: item.user_id
      };
      subject.topics.push(topic);
    }
  });

  return formatted;
}
}