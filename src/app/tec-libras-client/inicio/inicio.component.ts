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
  protected userData = this.userService.getUserInfo()
  
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

    // Aguarde os dados serem carregados
    try {
      const progressData = await this.levelService.getProgressData(userData.id);
      
      const x = this.levelService.getLevelCount();

      for(let i=1; i<=x; i++){
        this.item.push({
          level: i,
          percent: progressData[i - 1]?.percentage || 0
        });
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getCurrentFrase(): string {
    this.currentFrase = this.phase.frases[Math.ceil(Math.random() * 10)]
    return this.currentFrase
  }
}
