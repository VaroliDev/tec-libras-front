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

  optionKeys = ['a', 'b', 'c', 'd'];

  correctCount: number = 0;
  wrongCount: number = 0;
  answered: boolean = false;

  PagInicio(){
    this.router.navigate(['temas']);
  }

  async ngOnInit(){
    const data = await this.levelService.getThemeData(this.theme as number);
    this.title = data.title;

    this.questionsArray = Object.values(data.questions);
    this.currentQuestion = this.questionsArray[this.questionIndex];
  }

  selectOption(optionKey: string) {
    if (this.answered) return;
    this.answered = true;

    const correct = this.currentQuestion.answer;

    if (optionKey === correct) {
      this.correctCount++;
    } else {
      this.wrongCount++;
    }
  }

  prevQuestion() {
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.currentQuestion = this.questionsArray[this.questionIndex];
      this.answered = false;
    } else {
      this.router.navigate(['temas']);
    }
  }

  nextQuestion() {
    if (this.questionIndex < this.questionsArray.length - 1) {
      this.questionIndex++;
      this.currentQuestion = this.questionsArray[this.questionIndex];
      this.answered = false;
    } else {
      if(this.correctCount !== 4){
        this.questionIndex = 0;
        this.currentQuestion = this.questionsArray[this.questionIndex];
        this.answered = false;
        this.correctCount = 0;
        this.wrongCount = 0;
        return;
      }
      this.router.navigate(['temas']);
    }
  }
}
