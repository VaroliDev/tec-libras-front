import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { LevelService } from '../../../services/level.service';
import { UserService } from '../../../services/user.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";
import { CommonModule } from '@angular/common';

interface TopicStatus {
  teorica: boolean;
  demonstracao: boolean;
  pratica: boolean;
  questionario: boolean;
  curiosidades: boolean;
}

@Component({
  selector: 'app-themes',
  imports: [FooterComponent, HeaderComponent, EndHeaderComponent, CommonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
  private router = inject(Router)
  private levelService = inject(LevelService);
  private userService = inject(UserService);

  title: string = '';
  description: string = '';
  
  // Status de conclusão dos tópicos
  topicsCompleted: TopicStatus = {
    teorica: false,
    demonstracao: false,
    pratica: false,
    questionario: false,
    curiosidades: false
  };

  PagBack(){
    this.router.navigate(['nivel'])
  }

  PagTeorica(){
    this.router.navigate(['aula-teorica'])
  }

  PagDemonstracao(){
    this.router.navigate(['demonstracao'])
  }

  PagPratica(){
    this.router.navigate(['aula-pratica'])
  }

  PagQuestionario(){
    this.router.navigate(['questionario'])
  }

  PagCuriosidades(){
    this.router.navigate(['curiosidades'])
  }

  async ngOnInit(){
    const data = await this.levelService.getThemeData(this.levelService.getTheme() as number);
    this.title = data.title;
    this.description = data.description;

    // Carrega o progresso dos tópicos
    await this.loadTopicsProgress();
  }

  async loadTopicsProgress() {
    try {
      const userDataString = localStorage.getItem('token');
      const userData = JSON.parse(userDataString || '{}');
      
      const levelId = this.levelService.getLevel();
      const themeId = this.levelService.getTheme();

      await this.levelService.getProgressData(userData.id);
    
      const subjectsProgress = this.levelService.getLevelSubjectsProgress(levelId as number);
      const currentSubject = subjectsProgress.find((s: any) => s.subject_id === themeId);
      
      if (currentSubject && currentSubject.topics) {
        currentSubject.topics.forEach((topic: any) => {
          switch(topic.topic_id) {
            case 1:
              this.topicsCompleted.teorica = topic.is_completed;
              break;
            case 2:
              this.topicsCompleted.demonstracao = topic.is_completed;
              break;
            case 3:
              this.topicsCompleted.pratica = topic.is_completed;
              break;
            case 4:
              this.topicsCompleted.questionario = topic.is_completed;
              break;
            case 5:
              this.topicsCompleted.curiosidades = topic.is_completed;
              break;
          }
        });
      }
      
    } catch (error) {
      console.error('Erro ao carregar progresso dos tópicos:', error);
    }
  }
}