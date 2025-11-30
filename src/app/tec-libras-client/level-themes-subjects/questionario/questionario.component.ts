import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LevelService } from '../../../services/level.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

@Component({
  selector: 'app-questionario',
  imports: [HeaderComponent, FooterComponent, CommonModule, EndHeaderComponent],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected title: string = '';

  questionsArray: any[] = [];
  currentQuestion: any = null;
  questionIndex: number = 0;

  levelProgress: number = 0;

  optionKeys = ['a', 'b', 'c', 'd'];

  correctCount: number = 0;
  wrongCount: number = 0;
  answered: boolean = false;
  
  selectedOption: string | null = null;

  PagInicio(){
    this.router.navigate(['temas']);
  }

  async ngOnInit(){
    const data = await this.levelService.getThemeData(this.theme as number);
    this.title = data.title;

    this.questionsArray = Object.values(data.questions);
    this.currentQuestion = this.questionsArray[this.questionIndex];

    this.updateProgress();
  }

  selectOption(optionKey: string) {
    if (this.answered) return;
    this.answered = true;
    this.selectedOption = optionKey;

    const correct = this.currentQuestion.answer;

    if (optionKey === correct) {
      this.correctCount++;
    } else {
      this.wrongCount++;
    }

    // Avança automaticamente após 1 segundo
    setTimeout(() => {
      this.nextQuestion();
    }, 1000);
  }

  getOptionClass(optionKey: string): string {
    if (!this.answered) {
      return '';
    }

    const correctAnswer = this.currentQuestion.answer;

    // Se esta é a resposta correta, sempre mostra verde
    if (optionKey === correctAnswer) {
      return 'option-correct';
    }

    // Se esta foi a opção selecionada e está errada, mostra vermelho
    if (optionKey === this.selectedOption && optionKey !== correctAnswer) {
      return 'option-wrong';
    }

    return '';
  }

  prevQuestion() {
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.updateProgress();
      this.currentQuestion = this.questionsArray[this.questionIndex];
      this.answered = false;
      this.selectedOption = null;
    } else {
      this.router.navigate(['temas']);
    }
  }

  nextQuestion() {
    if (this.questionIndex < this.questionsArray.length - 1) {
      this.questionIndex++;
      this.updateProgress();
      this.currentQuestion = this.questionsArray[this.questionIndex];
      this.answered = false;
      this.selectedOption = null;
    } else {
      if(this.correctCount !== this.questionsArray.length){
        this.questionIndex = 0;
        this.currentQuestion = this.questionsArray[this.questionIndex];
        this.answered = false;
        this.selectedOption = null;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.updateProgress();
        return;
      }
      this.levelService.registerProgress(4);
      this.router.navigate(['temas']);
    }
  }

  updateProgress() {
    this.levelProgress = Math.round(((this.questionIndex + 1) / this.questionsArray.length) * 100);
  }
}