import { Injectable } from '@angular/core';
import {
  GestureRecognizer,
  FilesetResolver
} from '@mediapipe/tasks-vision';

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