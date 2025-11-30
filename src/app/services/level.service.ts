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
  private unlockedLevels: any = null;

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

  getUnlockedLevels(userId: number) {
    return this.http.post(`${this.API_URL}/user/level/unlocks`, {user_id  : userId});
  }

  unlockLevel(data: any) {
    return this.http.post(`${this.API_URL}/user/level/unlock`, data);
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

  getProgressData(user_id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getProgress(user_id).subscribe({
        next: (data: any) => {
          this.ProgressData = this.formatProgressData(data.progresso);
          resolve(this.ProgressData);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  getFormattedData() {
    return this.ProgressData;
  }

  formatProgressData(progressList: any[]) {
  const formatted: any[] = [];

  progressList.forEach((item: any) => {
    let level = formatted.find((l: any) => l.level_id === item.level_id);
    if (!level) {
      level = {
        level_id: item.level_id,
        subjects: [],
        percentage: 0
      };
      formatted.push(level);
    }

    let subject = level.subjects.find((s: any) => s.subject_id === item.subject_id);
    if (!subject) {
      subject = {
        subject_id: item.subject_id,
        topics: [],
        percentage: 0
      };
      level.subjects.push(subject);
    }

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

  formatted.forEach((level: any) => {
    let levelCompleted = 0;

    level.subjects.forEach((subject: any) => {
      const totalTopics = 5;
      const completedTopics = subject.topics.filter((t: any) => t.is_completed).length;

      subject.percentage = Math.round((completedTopics / totalTopics) * 100);

      levelCompleted += completedTopics;
    });

    const totalTopicsLevel = 25;

    level.percentage = Math.round((levelCompleted / totalTopicsLevel) * 100);
  });

  return formatted;
}

  getUnlockedLevelsData(user_id: number): Promise<number[]> {
    return new Promise((resolve, reject) => {
      this.getUnlockedLevels(user_id).subscribe({
        next: (data: any) => {
          const unlocks = data.niveis || data.desbloqueios || [];
          const unlockedLevelIds = unlocks.map((nivel: any) => nivel.level_id);
          this.unlockedLevels = unlockedLevelIds;
          resolve(unlockedLevelIds);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  getLevelProgress(levelId: number): number {
    if (!this.ProgressData) return 0;
    const level = this.ProgressData.find((l: any) => l.level_id === levelId);
    return level?.percentage || 0;
  }

  // Retorna o progresso de todos os subjects de um nível
  getLevelSubjectsProgress(levelId: number): any[] {
    if (!this.ProgressData) return [];
    const level = this.ProgressData.find((l: any) => l.level_id === levelId);
    return level?.subjects || [];
  }

  // Retorna o progresso de um subject específico
  getSubjectProgress(levelId: number, subjectId: number): number {
    const subjects = this.getLevelSubjectsProgress(levelId);
    const subject = subjects.find((s: any) => s.subject_id === subjectId);
    return subject?.percentage || 0;
  }

  registerProgress(topicId: number) {
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');

    const user_id = userData.id;
    const level_id = this.getLevel();
    const subject_id = this.getTheme();
    const topic_id = topicId;

    const progress = {
      user_id: user_id,
      level_id: level_id,
      subject_id: subject_id,
      topic_id: topic_id,
      is_completed: true
    };

    this.createProgress(progress).subscribe({
      next: (response) => {
        console.log('Progresso registrado com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao registrar progresso:', error);
      }
    });
  }
}