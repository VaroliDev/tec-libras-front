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

interface itemLevel {
  level: number;
  percent: number;
  unlocked: boolean;
}

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, HeaderComponent, FooterComponent, LevelComponent, LoadingSectionComponent, EndHeaderComponent] ,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService, private phase: PhaseService) {}

  private levelService = inject(LevelService)
  private userService = inject(UserService)
  protected userData = this.userService.getUserInfo();
  
  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  paginicio(){
    this.router.navigate(['/inicio']);
  }

  pagbiblioteca(){
    this.router.navigate(['/biblioteca-sinais']);
  }
  
  pagsobrenos(){
    this.router.navigate(['/sobre-nos']);
  }

  pagconta(){
    this.router.navigate(['/conta']);
  }
  
  logout() {
    this.authService.logout()
  }

  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;
  isLoading: boolean = false;
  currentFrase: string | undefined
  first_name = this.userData()?.full_name.split(' ')[0];

  item:itemLevel[] = []

  async ngOnInit() {
    this.getCurrentFrase();
    this.authService.isLogged();
    this.first_name = this.userData()?.first_name;

    this.isLoading = true;
    
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');
    this.firstName = userData.first_name || '';
    this.fullName = userData.full_name || '';
    this.userName = userData.user_name || '';

    try {
      const [progressData, unlockedLevelIds] = await Promise.all([
        this.levelService.getProgressData(userData.id),
        this.levelService.getUnlockedLevelsData(userData.id)
      ]);
      
      const totalLevels = this.levelService.getLevelCount();

      for(let i = 1; i <= totalLevels; i++){
        const levelProgress = progressData[i - 1]?.percentage || 0;

        // Verifica se o nível está 100% completo e o próximo não está desbloqueado
        if (levelProgress === 100 && i < totalLevels && !unlockedLevelIds.includes(i + 1)) {
          try {
            // Desbloqueia o próximo nível
            await this.levelService.unlockLevel({
              user_id: userData.id,
              level_id: i + 1
            }).toPromise();
            
            // Adiciona o novo nível desbloqueado ao array
            unlockedLevelIds.push(i + 1);
          } catch (error) {
            console.error(`Erro ao desbloquear nível ${i + 1}:`, error);
          }
        }

        this.item.push({
          level: i,
          percent: levelProgress,
          unlocked: unlockedLevelIds.includes(i)
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getCurrentFrase(): string {
    this.currentFrase = this.phase.frases[Math.ceil(Math.random() * 10)]
    return this.currentFrase
  }
}
