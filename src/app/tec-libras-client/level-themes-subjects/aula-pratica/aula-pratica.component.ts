import { Component, inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import { LevelService } from '../../../services/level.service';

import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-aula-pratica',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './aula-pratica.component.html',
  styleUrl: './aula-pratica.component.scss'
})
export class AulaPraticaComponent implements OnInit {

  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected title: string = '';
  protected text: string = '';

  textos: string[] = [];
  textoIndex: number = 0;

  @ViewChild('video', { static: false }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('gestureOutput', { static: false }) gestureOutputRef!: ElementRef<HTMLParagraphElement>;

  gestureRecognizer!: GestureRecognizer;
  runningMode: 'IMAGE' | 'VIDEO' = 'IMAGE';
  webcamRunning = false;
  enableWebcamButtonLabel = 'ENABLE WEBCAM';

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
      textContainer.innerHTML = this.textos[this.textoIndex];
    }

    // Carrega modelo de sinais
    const modelPath = this.getSinalModel(data);

    if (!modelPath) {
      console.error("⚠ Nenhum arquivo .task encontrado no JSON.");
      return;
    }

    await this.createGestureRecognizer(modelPath);
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
      conteudo.innerHTML = this.textos[this.textoIndex];
    }
  }

  PagNext() {
    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    if (this.textoIndex < this.textos.length - 1) {
      this.textoIndex++;
      conteudo.innerHTML = this.textos[this.textoIndex];
    } else {
      this.router.navigate(['temas']);
    }
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
      ? 'DISABLE PREDICTIONS'
      : 'ENABLE WEBCAM';

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
          { color: "#00FF00", lineWidth: 5 }
        );
        drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    if (this.results.gestures.length > 0) {
      const g = this.results.gestures[0][0];
      const hand = this.results.handednesses[0][0].displayName;

      this.gestureOutputRef.nativeElement.style.display = "block";
      this.gestureOutputRef.nativeElement.style.width = this.videoWidth + "px";
      this.gestureOutputRef.nativeElement.innerText =
        `GestureRecognizer: ${g.categoryName}\nConfidence: ${(g.score * 100).toFixed(2)}%\nHandedness: ${hand}`;
    } else {
      this.gestureOutputRef.nativeElement.style.display = "none";
    }

    if (this.webcamRunning) {
      requestAnimationFrame(() => this.predictWebcam());
    }
  }

}
