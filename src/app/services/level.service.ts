import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LEVEL_LIST } from '../../assets/levels/level-index';
import { API_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  // ==================== Propriedades ====================
  private currentLevel: number | null = null;
  private currentTheme: number | null = null;
  private ProgressData: any = null;
  private unlockedLevels: any = null;

  private router = inject(Router);
  private http = inject(HttpClient);
  private API_URL = API_URL;
  
  constructor() {}

  // ==================== Métodos de Níveis ====================
  
  getLevelCount(): number {
    return LEVEL_LIST.length;
  }

  getLevelList(): string[] {
    return LEVEL_LIST.map((_, i) => `level${i+1}`);
  }

  async getData(id: number) {    
    return LEVEL_LIST[id-1]().then(level => level);
  }

  setLevel(level: number): void {
    this.currentLevel = level;
  }

  getLevel(): number | null {
    if (!this.currentLevel) {
      this.router.navigate(['/inicio']);
      return null;
    }
    return this.currentLevel;
  }

  // ==================== Métodos de Temas ====================
  
  setTheme(theme: number): void {
    this.currentTheme = theme;
  }

  getTheme(): number | null {
    if (!this.currentTheme) {
      this.router.navigate(['/inicio']);
      return null;
    }
    return this.currentTheme;
  }

  getThemeData(themeId: number) {
    return LEVEL_LIST[this.getLevel() as number - 1]()
      .then(theme => (theme as any)[`tema${themeId}`]);
  }

  // ==================== Métodos de Progresso (API) ====================
  
  getProgress(userId: number) {
    return this.http.post(`${this.API_URL}/user/progress/view`, { user_id: userId });
  }

  createProgress(progress: any) {
    return this.http.post(`${this.API_URL}/user/progress`, progress);
  }

  registerProgress(topicId: number): void {
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');

    const progress = {
      user_id: userData.id,
      level_id: this.getLevel(),
      subject_id: this.getTheme(),
      topic_id: topicId,
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

  // ==================== Métodos de Desbloqueio de Níveis ====================
  
  getUnlockedLevels(userId: number) {
    return this.http.post(`${this.API_URL}/user/level/unlocks`, { user_id: userId });
  }

  unlockLevel(data: any) {
    return this.http.post(`${this.API_URL}/user/level/unlock`, data);
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

  // ==================== Métodos de Dados de Progresso ====================
  
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

  getLevelProgress(levelId: number): number {
    if (!this.ProgressData) return 0;
    const level = this.ProgressData.find((l: any) => l.level_id === levelId);
    return level?.percentage || 0;
  }

  getLevelSubjectsProgress(levelId: number): any[] {
    if (!this.ProgressData) return [];
    const level = this.ProgressData.find((l: any) => l.level_id === levelId);
    return level?.subjects || [];
  }

  getSubjectProgress(levelId: number, subjectId: number): number {
    const subjects = this.getLevelSubjectsProgress(levelId);
    const subject = subjects.find((s: any) => s.subject_id === subjectId);
    return subject?.percentage || 0;
  }

  // ==================== Métodos Auxiliares ====================
  
  private formatProgressData(progressList: any[]): any[] {
    const formatted: any[] = [];

    // Agrupa os dados por level, subject e topic
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

    // Calcula as porcentagens
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
}