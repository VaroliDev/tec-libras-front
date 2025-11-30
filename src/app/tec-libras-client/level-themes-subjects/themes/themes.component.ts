import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { LevelService } from '../../../services/level.service';
import { UserService } from '../../../services/user.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

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
export class ThemesComponent implements OnInit {
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

  // Ordem dos tópicos
  private topicOrder: (keyof TopicStatus)[] = [
    'teorica',
    'demonstracao',
    'pratica',
    'questionario',
    'curiosidades'
  ];

  constructor() {
    // Escuta mudanças de rota para recarregar os dados
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.loadTopicsProgress();
      });
  }

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

  /**
   * Manipula o clique em um tópico
   * Previne navegação se o tópico estiver bloqueado
   */
  handleTopicClick(topic: keyof TopicStatus, event: Event) {
    if (this.isTopicLocked(topic)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Navega para a página correspondente
    switch(topic) {
      case 'teorica':
        this.PagTeorica();
        break;
      case 'demonstracao':
        this.PagDemonstracao();
        break;
      case 'pratica':
        this.PagPratica();
        break;
      case 'questionario':
        this.PagQuestionario();
        break;
      case 'curiosidades':
        this.PagCuriosidades();
        break;
    }
  }

  /**
   * Verifica se um tópico está bloqueado
   * Um tópico está bloqueado se o tópico anterior não foi completado
   * O primeiro tópico (teorica) nunca está bloqueado
   */
  isTopicLocked(topic: keyof TopicStatus): boolean {
    const currentIndex = this.topicOrder.indexOf(topic);
    
    // O primeiro tópico nunca está bloqueado
    if (currentIndex === 0) {
      return false;
    }
    
    // Verifica se o tópico anterior foi completado
    const previousTopic = this.topicOrder[currentIndex - 1];
    return !this.topicsCompleted[previousTopic];
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