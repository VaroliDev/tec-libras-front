import { Injectable } from '@angular/core';
import {
  GestureRecognizer,
  FilesetResolver
} from '@mediapipe/tasks-vision';
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4],        // dedão
  [0, 5], [5, 6], [6, 7], [7, 8],        // indicador
  [5, 9], [9, 10], [10, 11], [11, 12],   // dedo médio
  [9, 13], [13, 14], [14, 15], [15, 16], // anelar
  [13, 17], [17, 18], [18, 19], [19, 20],// mínimo
  [0, 17]                                // palma
];

@Injectable({
  providedIn: 'root'
})
export class MediaPipeService {
  // ==================== Propriedades ====================
  private gestureRecognizer!: GestureRecognizer;
  private runningMode: 'IMAGE' | 'VIDEO' = 'IMAGE';
  private lastVideoTime = -1;
  private results: any;
  

  constructor() {}

  // ==================== Inicialização ====================

  async initializeGestureRecognizer(modelPath: string): Promise<void> {
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
        numHands: 1,
      });

      console.log("✅ Modelo MediaPipe carregado:", modelPath);
    } catch (err) {
      console.error("❌ Erro ao carregar modelo MediaPipe:", err);
      throw new Error("Não foi possível carregar o modelo de sinais.");
    }
  }

  // ==================== Reconhecimento em Imagem ====================

  async recognizeImage(image: HTMLImageElement): Promise<{
    gesture: string;
    confidence: number;
    hand: string;
  } | null> {
    if (!this.gestureRecognizer) {
      throw new Error("GestureRecognizer não foi inicializado.");
    }

    if (this.runningMode === 'VIDEO') {
      this.runningMode = 'IMAGE';
      await this.gestureRecognizer.setOptions({ runningMode: 'IMAGE' });
    }

    const results = this.gestureRecognizer.recognize(image);

    if (results.gestures.length > 0) {
      const g = results.gestures[0][0];
      const hand = results.handednesses[0][0].displayName;

      return {
        gesture: g.categoryName,
        confidence: g.score * 100,
        hand: hand
      };
    }

    return null;
  }

  // ==================== Reconhecimento em Vídeo ====================

  async recognizeVideo(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ): Promise<{
    gesture: string;
    confidence: number;
    hand: string;
  } | null> {
    if (!this.gestureRecognizer) {
      throw new Error("GestureRecognizer não foi inicializado.");
    }

    const ctx = canvas.getContext('2d')!;

    // Muda para modo VIDEO se necessário
    if (this.runningMode === 'IMAGE') {
      this.runningMode = 'VIDEO';
      await this.gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
    }

    // Processa frame apenas se mudou
    if (video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = video.currentTime;
      this.results = this.gestureRecognizer.recognizeForVideo(video, Date.now());
    }

    // Limpa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Não desenha landmarks (removido para melhor performance)
    // ========================================
// DESENHAR LINHAS DAS MÃOS
// ========================================
if (this.results?.landmarks) {
  this.results.landmarks.forEach((landmarks: any) => {
    HAND_CONNECTIONS.forEach(([start, end]) => {
      const p1 = landmarks[start];
      const p2 = landmarks[end];

      ctx.beginPath();
      ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
      ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'purple';
      ctx.stroke();
    });
  });
}

// ========================================
// DESENHAR PONTOS DAS MÃOS
// ========================================
if (this.results?.landmarks) {
  this.results.landmarks.forEach((landmarks: any) => {
    landmarks.forEach((p: any) => {
      ctx.beginPath();
      ctx.arc(p.x * canvas.width, p.y * canvas.height, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "orange";
      ctx.fill();
    });
  });
}


    // Retorna resultado do gesto
    if (this.results?.gestures?.length > 0) {
      const g = this.results.gestures[0][0];
      const hand = this.results.handednesses[0][0].displayName;

      return {
        gesture: g.categoryName,
        confidence: g.score * 100,
        hand: hand
      };
    }

    return null;
  }

  // ==================== Utilitários ====================

  isInitialized(): boolean {
    return !!this.gestureRecognizer;
  }

  getModelPath(modelName: string): string {
    return `assets/models/alfabeto.task`;
  }

  reset(): void {
    this.lastVideoTime = -1;
    this.results = null;
  }
}