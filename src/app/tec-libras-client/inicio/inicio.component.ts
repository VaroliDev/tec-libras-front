import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { LevelComponent } from '../../components/level/level.component';
import { LoadingSectionComponent } from '../../components/loading-section/loading-section.component';
import { PhaseService } from '../../services/phase.service';
import { UserService } from '../../services/user.service';
import { LevelService } from '../../services/level.service';
import { EndHeaderComponent } from "../../components/end-header/end-header.component";

interface ItemLevel {
  level: number;
  percent: number;
  unlocked: boolean;
}

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, HeaderComponent, FooterComponent, LevelComponent, LoadingSectionComponent, EndHeaderComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  private themeService = inject(ThemeService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private phase = inject(PhaseService);
  private levelService = inject(LevelService);
  private userService = inject(UserService);

  protected userData = this.userService.getUserInfo();
  protected isLoading = false;
  protected currentFrase: string = '';
  protected item: ItemLevel[] = [];

  async ngOnInit() {
    this.authService.isLogged();
    this.currentFrase = this.getCurrentFrase();
    
    // Força a atualização do userData a partir do localStorage
    const userDataString = localStorage.getItem('token');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Atualiza o signal do UserService se necessário
      this.userService.setUserInfo(userData);
    }

    await this.loadLevelsData();
  }

  private async loadLevelsData(): Promise<void> {
    this.isLoading = true;
    
    try {
      const currentUser = this.userData();
      if (!currentUser?.id) {
        console.error('Usuário não encontrado');
        return;
      }

      const [progressData, unlockedLevelIds] = await Promise.all([
        this.levelService.getProgressData(currentUser.id),
        this.levelService.getUnlockedLevelsData(currentUser.id)
      ]);
      
      const totalLevels = this.levelService.getLevelCount();
      const updatedUnlockedLevels = [...unlockedLevelIds];

      for (let i = 1; i <= totalLevels; i++) {
        const levelProgress = progressData[i - 1]?.percentage || 0;

        // Verifica se deve desbloquear o próximo nível
        if (this.shouldUnlockNextLevel(levelProgress, i, totalLevels, updatedUnlockedLevels)) {
          await this.unlockNextLevel(currentUser.id, i + 1, updatedUnlockedLevels);
        }

        this.item.push({
          level: i,
          percent: levelProgress,
          unlocked: updatedUnlockedLevels.includes(i)
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private shouldUnlockNextLevel(
    levelProgress: number, 
    currentLevel: number, 
    totalLevels: number, 
    unlockedLevels: number[]
  ): boolean {
    return levelProgress === 100 && 
           currentLevel < totalLevels && 
           !unlockedLevels.includes(currentLevel + 1);
  }

  private async unlockNextLevel(
    userId: number, 
    nextLevel: number, 
    unlockedLevels: number[]
  ): Promise<void> {
    try {
      await this.levelService.unlockLevel({
        user_id: userId,
        level_id: nextLevel
      }).toPromise();
      
      unlockedLevels.push(nextLevel);
    } catch (error) {
      console.error(`Erro ao desbloquear nível ${nextLevel}:`, error);
    }
  }

  private getCurrentFrase(): string {
    return this.phase.frases[Math.floor(Math.random() * this.phase.frases.length)];
  }

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  }

  paginicio(): void {
    this.router.navigate(['/inicio']);
  }

  pagbiblioteca(): void {
    this.router.navigate(['/biblioteca-sinais']);
  }
  
  pagsobrenos(): void {
    this.router.navigate(['/sobre-nos']);
  }

  pagconta(): void {
    this.router.navigate(['/conta']);
  }
  
  logout(): void {
    this.authService.logout();
  }
}