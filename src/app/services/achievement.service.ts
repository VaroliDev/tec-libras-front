import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {
    private router = inject(Router);
    private http = inject(HttpClient);
    private API_URL = API_URL;

    getAchievements(userId: number) {
        return this.http.get<any[]>(`${this.API_URL}/user/${userId}/achievements`);
    }

    createAchievements(data: any) {
        return this.http.post(`${this.API_URL}/user/achievement`, data);
    }

    getAchievementsData(userId: number) {
        return this.http.get<any[]>(`${this.API_URL}/user/${userId}/achievements`).pipe(
            map((achievements: any[]) => {
            return {
                count: achievements.length,
                titles: achievements.map(achievement => achievement.title)
            };
            }),
            catchError(error => {
            console.error('Erro ao buscar conquistas:', error);
            return of({ count: 0, titles: [] });
            })
        );
    }
}