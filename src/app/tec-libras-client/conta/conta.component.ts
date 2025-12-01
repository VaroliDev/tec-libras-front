import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UserService } from '../../services/user.service';
import { LevelService } from '../../services/level.service';
import { HttpClient } from '@angular/common/http';
import { EndHeaderComponent } from "../../components/end-header/end-header.component";
import { AlertComponent } from '../../components/alert/alert.component';
import { AchievementService } from '../../services/achievement.service';

@Component({
  selector: 'app-conta',
  standalone: true, 
  imports: [
    FormsModule, HeaderComponent, FooterComponent, LoadingComponent, EndHeaderComponent, AlertComponent
  ],
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements AfterViewInit {

  constructor(
    private themeService: ThemeService, 
    private router: Router, 
    private authService: AuthService, 
    private http: HttpClient,
    private achievementService: AchievementService
  ) {}

  private userService = inject(UserService);
  private levelService = inject(LevelService);
  protected userData = this.userService.getUserInfo();

  protected levelStatistic: number = 0;
  protected topicStatistic: number = 0;
  protected achievementStatistic: number = 0;
  protected achievementsTitles: string[] = [];

  @ViewChild('alert') alert!: AlertComponent;

  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;
  isLoading: boolean = false;

  user_name: string = '';
  full_name: string = '';
  email: string = '';
  userId: number | null = null;

  apiUrl: string = 'http://localhost:3333/user';
  user: any;

  ngAfterViewInit(): void {
  }

  async ngOnInit(): Promise<void> {
    this.authService.isLogged();
    this.isLoading = true;

    this.userId = this.userData()!.id;
    this.full_name = this.userData()!.full_name;
    this.user_name = this.userData()!.user_name;
    this.email = this.userData()!.email;

    // Carrega as estatísticas
    await this.loadStatistics();

    this.isLoading = false;
  }

  async loadStatistics(): Promise<void> {
    try {
      const userId = this.userData()!.id;

      // Carrega o progresso do usuário
      const progressData = await this.levelService.getProgressData(userId);

      // Calcula o nível atual (último nível com progresso > 0)
      this.levelStatistic = this.calculateCurrentLevel(progressData);

      // Conta quantos tópicos foram concluídos
      this.topicStatistic = this.countCompletedTopics(progressData);

      this.achievementService.getAchievementsData(userId).subscribe({
        next: (data) => {
          this.achievementStatistic = data.count;
          this.achievementsTitles = data.titles;
        },
        error: (err) => console.error('Erro:', err)
      });

    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  }

  // Calcula qual é o nível atual do usuário
  calculateCurrentLevel(progressData: any[]): number {
    if (!progressData || progressData.length === 0) return 1;

    // Encontra o último nível com progresso maior que 0
    let currentLevel = 1;
    
    for (let i = 0; i < progressData.length; i++) {
      if (progressData[i].percentage > 0) {
        currentLevel = progressData[i].level_id;
      }
    }

    return currentLevel;
  }

  // Conta quantos tópicos foram concluídos no total
  countCompletedTopics(progressData: any[]): number {
    if (!progressData || progressData.length === 0) return 0;

    let completedCount = 0;

    progressData.forEach((level: any) => {
      if (level.subjects && level.subjects.length > 0) {
        level.subjects.forEach((subject: any) => {
          if (subject.topics && subject.topics.length > 0) {
            // Conta apenas os tópicos com is_completed = true
            const completed = subject.topics.filter((topic: any) => topic.is_completed === true);
            completedCount += completed.length;
          }
        });
      }
    });

    return completedCount;
  }

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  paginicio() { this.router.navigate(['/inicio']); }
  pagbiblioteca() { this.router.navigate(['/biblioteca-sinais']); }
  pagsobrenos() { this.router.navigate(['/sobre-nos']); }
  pagconta() { this.router.navigate(['/conta']); }

  updateUser(userId:number): void {
    const updatedUser = {
      full_name: this.full_name,
      user_name: this.user_name,
      email: this.email
    };

    this.userService.updateUser(userId, updatedUser).subscribe({
      next: (response) => {
        this.userService.setUserInfo({
          user_name: response.userName,
          full_name: response.fullName,
          email: this.userData()!.email,
          token: this.userData()!.token,
          id: response.id, 
          first_name: this.userData()!.full_name.split(' ')[0]
        });

        this.alert.open('<h3><b>Informações atualizadas!</b></h3> <p>As informações de sua conta foram atualizadas com sucesso.</p>', 'success');

      },
      error: (err) => {
        this.alert.open('<h3><b>Erro ao atualizar!</b></h3> <p>As informações de sua conta não foram atualizadas. Tente novamente.</p>', 'error');
      }
    });
  }

  loadUser(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }
}