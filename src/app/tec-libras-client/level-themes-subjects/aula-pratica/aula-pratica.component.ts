import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";
import { LevelService } from '../../../services/level.service';
import { MediaPipeService } from '../../../services/mediapipe.service';
import { LisiFeedbackComponent } from '../../../components/lisi-feedback/lisi-feedback.component';

@Component({
  selector: 'app-aula-pratica',
  imports: [HeaderComponent, FooterComponent, EndHeaderComponent, LisiFeedbackComponent],
  templateUrl: './aula-pratica.component.html',
  styleUrl: './aula-pratica.component.scss'
})
export class AulaPraticaComponent implements OnInit {
  // ==================== Injeção de Dependências ====================
  private router = inject(Router);
  private levelService = inject(LevelService);
  private mediaPipeService = inject(MediaPipeService);

  // ==================== Referências do Template ====================
  @ViewChild('video', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gestureOutput', { static: false }) gestureOutputRef!: ElementRef<HTMLParagraphElement>;

  // ==================== Propriedades do Componente ====================
  protected theme = this.levelService.getTheme();
  protected title: string = '';
  protected text: string = '';
  protected status_class: string = 'incorrect-sign';
  protected signal: string = '';
  protected levelProgress: number = 0;

  @ViewChild('alert') alert!: LisiFeedbackComponent;

  // Configuração de vídeo
  protected videoHeight = 360;
  protected videoWidth = 480;
  protected webcamRunning = false;
  protected enableWebcamButtonLabel = 'Ligar Câmera';

  // Controle de textos e sinais
  protected textos: string[] = [];
  protected sinaisOrder: string[] = []; // NOVO: Array com a ordem dos sinais
  protected textoIndex: number = 0;
  protected current_signal: string = '';
  protected correct_signal: string = 'letra_a';

  // Timer de validação
  private timer: any = null;
  private timerDuration = 3000;
  private timerStart: number = 0;

  // Áudio
  private sfx = new Audio('assets/sfx/correct.mp3');

  // ==================== Inicialização ====================

  async ngOnInit() {
    await this.loadThemeData();
    await this.initializeMediaPipe();
    this.updateProgress();
  }

  private async loadThemeData(): Promise<void> {
    const data = await this.levelService.getThemeData(this.theme as number);

    this.title = data.title;
    this.text = data.aulaPratica;
    this.textos = this.text.split('<hr/>').map(t => t.trim());

    // NOVO: Carrega a ordem dos sinais do JSON
    if (data.sinal_order) {
      this.sinaisOrder = data.sinal_order.split('<hr/>').map((s: string) => s.trim());
    }

    this.updateTextDisplay();
    this.updateCorrectSignal();
  }

  private async initializeMediaPipe(): Promise<void> {
    const data = await this.levelService.getThemeData(this.theme as number);
    const modelPath = this.mediaPipeService.getModelPath(data.sinal);

    if (!modelPath) {
      console.error("⚠️ Nenhum modelo de sinal encontrado.");
      return;
    }

    try {
      await this.mediaPipeService.initializeGestureRecognizer(modelPath);
    } catch (error) {
      alert("Erro ao carregar o modelo de sinais.");
    }
  }

  // ==================== Controle de Progresso ====================

  updateProgress(): void {
    this.levelProgress = Math.round(((this.textoIndex + 1) / this.textos.length) * 100);
  }

  private updateTextDisplay(): void {
    const textContainer = document.getElementById('text');
    if (textContainer) {
      textContainer.innerHTML = `Pratique o sinal: ${this.textos[this.textoIndex]}`;
    }
  }

  private updateCorrectSignal(): void {
    // MODIFICADO: Usa o array sinaisOrder em vez de gerar o nome
    if (this.sinaisOrder.length > 0 && this.textoIndex < this.sinaisOrder.length) {
      this.correct_signal = this.sinaisOrder[this.textoIndex];
    } else {
      // Fallback caso o sinal_order não esteja disponível
      this.correct_signal = `letra_${this.textos[this.textoIndex].toLowerCase().replaceAll("'", "")}`;
    }
    
    console.log('Sinal correto:', this.correct_signal);
  }

  // ==================== Navegação ====================

  PagInicio(): void {
    this.router.navigate(['temas']);
  }

  PagBack(): void {
    if (this.textoIndex > 0) {
      this.textoIndex--;
      this.updateProgress();
      this.updateTextDisplay();
      this.updateCorrectSignal();
    }
  }

  PagNext(): void {
    if (this.textoIndex < this.textos.length - 1) {
      this.textoIndex++;
      this.updateProgress();
      this.updateTextDisplay();
      this.updateCorrectSignal();
    } else {
      this.completeLesson();
      this.alert.open('Você é demais!', `Parabéns, você concluiu a aula prática de ${this.title}! Avance para o questionário e teste suas habilidades!`, 'success', 5);
      
    }
  }

  close(){
    this.router.navigate(['temas']);
    this.completeLesson();
  }

  skip(): void {
    this.alert.open('Tudo bem!', `Você pode realizar a aula prática de ${this.title} quando puder!`, 'success', 5);
  }

  private completeLesson(): void {
    this.levelService.registerProgress(3);
    this.router.navigate(['temas']);
  }

  // ==================== Reconhecimento em Imagem ====================

  async onImageClick(event: Event): Promise<void> {
    if (!this.mediaPipeService.isInitialized()) {
      alert("Por favor, aguarde o carregamento do modelo.");
      return;
    }

    const target = event.target as HTMLImageElement;

    try {
      const result = await this.mediaPipeService.recognizeImage(target);

      if (result) {
        alert(
          `Gesto: ${result.gesture}\n` +
          `Confiança: ${result.confidence.toFixed(2)}%\n` +
          `Mão: ${result.hand}`
        );
      }
    } catch (error) {
      console.error("Erro ao reconhecer imagem:", error);
    }
  }

  // ==================== Controle da Webcam ====================

  enableCam(): void {
    if (!this.mediaPipeService.isInitialized()) {
      alert("Por favor, aguarde o carregamento do modelo.");
      return;
    }

    this.webcamRunning = !this.webcamRunning;
    this.enableWebcamButtonLabel = this.webcamRunning ? 'Desligar Câmera' : 'Ligar Câmera';

    if (this.webcamRunning) {
      this.startWebcam();
    }
  }

  private startWebcam(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = this.videoRef.nativeElement;
        video.srcObject = stream;
        video.addEventListener('loadeddata', () => this.predictWebcam());
      })
      .catch(error => {
        console.error("Erro ao acessar webcam:", error);
        alert("Não foi possível acessar a câmera.");
      });
  }

  // ==================== Predição em Tempo Real ====================

  async predictWebcam(): Promise<void> {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    // Ajusta dimensões do canvas e vídeo
    this.adjustVideoCanvasSize(video, canvas);

    try {
      const result = await this.mediaPipeService.recognizeVideo(video, canvas);

      if (result) {
        this.displayGestureInfo(result);
        this.validateSignal(result.gesture);
      } else {
        this.hideGestureInfo();
        this.cancelTimer();
      }
    } catch (error) {
      console.error("Erro na predição:", error);
    }

    if (this.webcamRunning) {
      requestAnimationFrame(() => this.predictWebcam());
    }
  }

  private adjustVideoCanvasSize(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
    canvas.style.height = this.videoHeight + "px";
    canvas.style.width = this.videoWidth + "px";
    video.style.height = this.videoHeight + "px";
    video.style.width = this.videoWidth + "px";
  }

  private displayGestureInfo(result: { gesture: string; confidence: number; hand: string }): void {
    const output = this.gestureOutputRef.nativeElement;
    output.style.display = "block";
    output.style.width = this.videoWidth + "px";
    output.innerText =
      `Gesto: ${result.gesture}\n` +
      `Confiança: ${result.confidence.toFixed(2)}%\n` +
      `Mão: ${result.hand}`;

    this.current_signal = result.gesture;
  }

  private hideGestureInfo(): void {
    this.gestureOutputRef.nativeElement.style.display = "none";
  }

  // ==================== Validação de Sinal ====================

  private validateSignal(detectedSignal: string): void {
    const isCorrect = detectedSignal.toLowerCase() === this.correct_signal.toLowerCase();

    if (isCorrect) {
      this.handleCorrectSignal();
    } else {
      this.handleIncorrectSignal();
    }
  }

  private handleCorrectSignal(): void {
    this.signal = 'Correto!';
    this.status_class = 'correct-sign';

    if (!this.timer) {
      console.log("✅ Iniciando timer de validação...");
      this.timerStart = Date.now();

      this.timer = setInterval(() => {
        const elapsed = Date.now() - this.timerStart;

        if (elapsed >= this.timerDuration) {
          clearInterval(this.timer);
          this.timer = null;

          if (this.current_signal.toLowerCase() === this.correct_signal.toLowerCase()) {
            console.log("🎉 Sinal mantido com sucesso!");
            this.sfx.play();
            this.PagNext();
          }
        }
      }, 100);
    }
  }

  private handleIncorrectSignal(): void {
    this.signal = 'Incorreto!';
    this.status_class = 'incorrect-sign';
    this.cancelTimer();
  }

  private cancelTimer(): void {
    if (this.timer) {
      console.log("❌ Timer cancelado");
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}