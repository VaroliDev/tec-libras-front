import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { LevelService } from '../../../services/level.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";


import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-aula-pratica',
  imports: [HeaderComponent, FooterComponent, EndHeaderComponent],
  templateUrl: './aula-pratica.component.html',
  styleUrl: './aula-pratica.component.scss'
})
export class AulaPraticaComponent implements OnInit {

  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected title: string = '';
  protected text: string = '';

  protected status_class: string = 'incorrect-sign';

  protected current_signal: string = '';
  protected correct_signal: string = 'letra_a';
  protected signal: string = '';

  levelProgress: number = 0;

  sfx = new Audio('assets/sfx/correct.mp3');

  timer: any = null;
  timerDuration = 3000;
  timerStart: number = 0;


  textos: string[] = [];
  textoIndex: number = 0;

  @ViewChild('video', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gestureOutput', { static: false }) gestureOutputRef!: ElementRef<HTMLParagraphElement>;

  gestureRecognizer!: GestureRecognizer;
  runningMode: 'IMAGE' | 'VIDEO' = 'IMAGE';
  webcamRunning = false;
  enableWebcamButtonLabel = 'Ligar Câmera';

  videoHeight = 360;
  videoWidth = 480;

  results: any;
  lastVideoTime = -1;

  // ---------------------------------------------------------
  // INICIALIZAÇÃO
  // ---------------------------------------------------------
  async ngOnInit() {

    // Carrega dados do tema
    const data = await this.levelService.getThemeData(this.theme as number);

    this.title = data.title;
    this.text = data.aulaPratica;

    this.textos = this.text.split('<hr/>').map(t => t.trim());

    const textContainer = document.getElementById('text');
    if (textContainer) {
      textContainer.innerHTML = `Pratique o sinal: ${this.textos[this.textoIndex]}`;
    }

    // Carrega modelo de sinais
    const modelPath = this.getSinalModel(data);

    if (!modelPath) {
      console.error("⚠ Nenhum arquivo .task encontrado no JSON.");
      return;
    }

    await this.createGestureRecognizer(modelPath);

    this.updateProgress();
  }

  updateProgress() {
    this.levelProgress = Math.round(((this.textoIndex + 1) / this.textos.length) * 100);
  }

  // ---------------------------------------------------------
  // RESOLVE CAMINHO DO MODELO
  // ---------------------------------------------------------
  getSinalModel(data: any): string | null {
    if (!data.sinal) return null;

    // Garante que o JSON contém por exemplo:
    // "sinal": "alfabeto"
    return `assets/models/${data.sinal}.task`;
  }

  // ---------------------------------------------------------
  // CARREGA O MODELO DO MEDIAPIPE
  // ---------------------------------------------------------
  async createGestureRecognizer(modelPath: string) {
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: modelPath,
          delegate: "CPU"
        },
        runningMode: this.runningMode,
        numHands: 2,
      });

      console.log("Modelo carregado:", modelPath);

    } catch (err) {
      console.error("ERRO AO CARREGAR MODELO:", err);
      alert("Erro ao carregar o modelo de sinais.");
    }
  }

  // ---------------------------------------------------------
  // NAVEGAÇÃO ENTRE TEXTOS
  // ---------------------------------------------------------
  PagInicio() {
    this.router.navigate(['temas']);
  }

  PagBack() {
    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    if (this.textoIndex > 0) {
      this.textoIndex--;
      this.updateProgress();
      conteudo.innerHTML = `Pratique o seguinte sinal: ${this.textos[this.textoIndex]}`
      this.correct_signal = `letra_${this.textos[this.textoIndex].toLowerCase().replaceAll("'", "")}`;
      console.log(this.correct_signal);
    }
  }

  PagNext() {
    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    if (this.textoIndex < this.textos.length - 1) {
      this.textoIndex++;
      this.updateProgress();
      conteudo.innerHTML = `Pratique o seguinte sinal: ${this.textos[this.textoIndex]}`
      this.correct_signal = `letra_${this.textos[this.textoIndex].toLowerCase().replaceAll("'", "")}`;
      console.log(this.correct_signal);
    } else {
      this.levelService.registerProgress(3);
      this.router.navigate(['temas']);
    }
  }

  skip(){
    this.levelService.registerProgress(3);
    this.router.navigate(['temas']);
  }

  // ---------------------------------------------------------
  // RECONHECIMENTO EM IMAGEM
  // ---------------------------------------------------------
  async onImageClick(event: Event) {
    if (!this.gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (this.runningMode === 'VIDEO') {
      this.runningMode = 'IMAGE';
      await this.gestureRecognizer.setOptions({ runningMode: 'IMAGE' });
    }

    const target = event.target as HTMLImageElement;

    const results = this.gestureRecognizer.recognize(target);

    if (results.gestures.length > 0) {
      const g = results.gestures[0][0];
      const hand = results.handednesses[0][0].displayName;

      alert(`Gesture: ${g.categoryName}\nConfidence: ${(g.score * 100).toFixed(2)}%\nHand: ${hand}`);
    }
  }

  // ---------------------------------------------------------
  // WEBCAM
  // ---------------------------------------------------------
  enableCam() {
    if (!this.gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    this.webcamRunning = !this.webcamRunning;

    this.enableWebcamButtonLabel = this.webcamRunning
      ? 'Desligar Câmera'
      : 'Ligar Câmera';

    if (this.webcamRunning) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          const video = this.videoRef.nativeElement;
          video.srcObject = stream;

          video.addEventListener('loadeddata', () => this.predictWebcam());
        });
    }
  }

  // ---------------------------------------------------------
  // PREDIÇÃO EM VÍDEO
  // ---------------------------------------------------------
  async predictWebcam() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;

    if (this.runningMode === 'IMAGE') {
      this.runningMode = 'VIDEO';
      await this.gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
    }

    if (video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = video.currentTime;
      this.results = this.gestureRecognizer.recognizeForVideo(video, Date.now());
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawingUtils = new DrawingUtils(ctx);

    canvas.style.height = this.videoHeight + "px";
    video.style.height = this.videoHeight + "px";
    canvas.style.width = this.videoWidth + "px";
    video.style.width = this.videoWidth + "px";

    if (this.results.landmarks) {
      for (const landmarks of this.results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          { color: "#ff6d1fff", lineWidth: 5 }
        );
        drawingUtils.drawLandmarks(landmarks, { color: "#7c16eaff", lineWidth: 2 });
      }
    }

    if (this.results.gestures.length > 0) {
      const g = this.results.gestures[0][0];
      const hand = this.results.handednesses[0][0].displayName;

      this.gestureOutputRef.nativeElement.style.display = "block";
      this.gestureOutputRef.nativeElement.style.width = this.videoWidth + "px";
      this.gestureOutputRef.nativeElement.innerText =
        `GestureRecognizer: ${g.categoryName}\n` +
        `Confidence: ${(g.score * 100).toFixed(2)}%\n` +
        `Handedness: ${hand}`;

      this.current_signal = g.categoryName;

      // ----------------------------------------------------------
      // SISTEMA DE VALIDAÇÃO DO SINAL
      // ----------------------------------------------------------
      if (this.current_signal.toLowerCase() === this.correct_signal.toLowerCase()) {
        
        this.signal = 'Correto!';
        this.status_class = 'correct-sign';

        if (!this.timer) {
          console.log("Iniciando timer de 5 segundos…");
          this.timerStart = Date.now();
          
          this.timer = setInterval(() => {
            const elapsed = Date.now() - this.timerStart;

            if (elapsed >= this.timerDuration) {
              clearInterval(this.timer);
              this.timer = null;

              if (this.current_signal.toLowerCase() === this.correct_signal.toLowerCase()) {
                console.log("Sinal correto mantido por 5 segundos!");
                this.sfx.play();
                console.log(window.innerWidth);
                console.log(screen.width)
                this.PagNext();
              }
            }
          }, 100);
        }

      } else {
        if (this.timer) {
          console.log("Sinal incorreto — cancelando timer");
          clearInterval(this.timer);
          this.timer = null;
        }

        this.signal = 'Incorreto!';
        this.status_class = 'incorrect-sign';
      }

    } else {
      this.gestureOutputRef.nativeElement.style.display = "none";

      if (this.timer) {
        console.log("Gesto perdido — timer cancelado");
        clearInterval(this.timer);
        this.timer = null;
      }
    }
      requestAnimationFrame(() => this.predictWebcam());
  }
}
