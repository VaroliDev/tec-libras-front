import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { LoadingSectionComponent } from '../../../components/loading-section/loading-section.component';
import { CardLevelThemeComponent } from '../../../components/card-level-theme/card-level-theme.component';
import { LevelService } from '../../../services/level.service';
import { UserService } from '../../../services/user.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

interface itemLevel {
  level: number;
  title: string;
  subtitle: string;
  percent: number;
}

@Component({
  selector: 'app-nivel',
  imports: [FooterComponent, HeaderComponent, LoadingSectionComponent, CardLevelThemeComponent, EndHeaderComponent],
  templateUrl: './level-themes.component.html',
  styleUrl: './level-themes.component.scss'
})

export class LevelThemesComponent { 
  private router = inject(Router)
  private levelService = inject(LevelService);
  private userService = inject(UserService);

  protected level_id = this.levelService.getLevel();
  protected userData = this.userService.getUserInfo();
  protected levelProgress: number = 0;
  
  PagBack(){
    this.router.navigate(['inicio'])
  }
  
  item:itemLevel[] = []
  isLoading: boolean = false;

  async ngOnInit() {
    this.isLoading = true;

    try {
      // Carrega os dados do nível
      const data_level = await this.levelService.getData(this.level_id as number);
      
      // Carrega o progresso do usuário
      const userDataString = localStorage.getItem('token');
      const userData = JSON.parse(userDataString || '{}');
      
      // Garante que o progresso está carregado
      await this.levelService.getProgressData(userData.id);
      
      // Obtém o progresso geral do nível
      this.levelProgress = this.levelService.getLevelProgress(this.level_id as number);
      
      // Obtém o progresso dos subjects
      const subjectsProgress = this.levelService.getLevelSubjectsProgress(this.level_id as number);
      
      console.log('Progresso do nível:', this.levelProgress);
      console.log('Progresso dos subjects:', subjectsProgress);

      // Monta os cards dos temas com progresso real
      for(let i = 1; i <= 5; i++){
        const tema = (data_level as any)[`tema${i}`];
        
        // Busca o progresso real do subject (tema)
        const subjectProgress = subjectsProgress.find((s: any) => s.subject_id === i);
        
        this.item.push({
          level: i,
          title: tema.title,
          subtitle: tema.subtitle,
          percent: subjectProgress?.percentage || 0 // Progresso real ou 0
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar dados do nível:', error);
    } finally {
      this.isLoading = false;
    }
  }
}