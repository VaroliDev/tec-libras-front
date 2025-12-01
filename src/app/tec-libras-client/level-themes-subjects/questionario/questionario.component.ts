import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LevelService } from '../../../services/level.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";
import { LisiFeedbackComponent } from "../../../components/lisi-feedback/lisi-feedback.component";

@Component({
  selector: 'app-questionario',
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    EndHeaderComponent,
    LisiFeedbackComponent
  ],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {

  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected title: string = '';

  @ViewChild(LisiFeedbackComponent, { static: false }) alert!: LisiFeedbackComponent;

  questionsArray: any[] = [];
  currentQuestion: any = null;
  questionIndex: number = 0;

  levelProgress: number = 0;

  optionKeys = ['a', 'b', 'c', 'd'];

  correctCount: number = 0;
  wrongCount: number = 0;
  answered: boolean = false;

  selectedOption: string | null = null;

  PagInicio() {
    this.router.navigate(['temas']);
  }

  async ngOnInit() {
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

    setTimeout(() => this.nextQuestion(), 1000);
  }

  getOptionClass(optionKey: string): string {
    if (!this.answered) return '';

    const correctAnswer = this.currentQuestion.answer;

    if (optionKey === correctAnswer) return 'option-correct';

    if (optionKey === this.selectedOption && optionKey !== correctAnswer)
      return 'option-wrong';

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
    // ---- AINDA TEM PERGUNTAS ----
    if (this.questionIndex < this.questionsArray.length - 1) {
      this.questionIndex++;
      this.updateProgress();
      this.currentQuestion = this.questionsArray[this.questionIndex];
      this.answered = false;
      this.selectedOption = null;
      return;
    }

    // ---- FINAL DO QUESTIONÁRIO ----
    if (!this.alert) {
      console.error("ALERT não está disponível.");
      return;
    }

    if (this.correctCount >= 3) {
      this.alert.open(
        "Parabéns!",
        `Você acertou ${this.correctCount} perguntas!`,
        "success",
        this.correctCount
      );
    } else {
      this.alert.open(
        "Tente novamente!",
        `Você acertou apenas ${this.correctCount}.`,
        "error",
        this.correctCount
      );
    }
  }

  // Quando fecha o ALERT
  close() {
    // acertos suficientes → avança
    if (this.correctCount >= 3) {
      this.levelService.registerProgress(4);
      this.router.navigate(["temas"]);
      return;
    }

    // Poucos acertos → reinicia
    this.questionIndex = 0;
    this.currentQuestion = this.questionsArray[0];
    this.correctCount = 0;
    this.wrongCount = 0;
    this.selectedOption = null;
    this.answered = false;
    this.updateProgress();
  }

  updateProgress() {
    this.levelProgress = Math.round(
      ((this.questionIndex + 1) / this.questionsArray.length) * 100
    );
  }
}
