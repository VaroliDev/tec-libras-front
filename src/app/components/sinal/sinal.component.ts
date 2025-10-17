import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';



@Component({
  selector: 'app-sinal',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sinal.component.html',
  styleUrl: './sinal.component.scss'
})
export class SinalComponent implements OnInit{
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

  async ngOnInit() {
    await this.createGestureRecognizer();
  }

  async createGestureRecognizer() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );
    this.gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'models/alfabeto.task',
        delegate: "CPU"
      },
      runningMode: this.runningMode,
      numHands: 2,
    });
  }

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
    console.log(results);

    if (results.gestures.length > 0) {
      const categoryName = results.gestures[0][0].categoryName;
      const categoryScore = (results.gestures[0][0].score * 100).toFixed(2);
      const handedness = results.handednesses[0][0].displayName;

      alert(`Gesture: ${categoryName}\nConfidence: ${categoryScore}%\nHand: ${handedness}`);
    }
  }

  enableCam() {
    if (!this.gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    this.webcamRunning = !this.webcamRunning;
    this.enableWebcamButtonLabel = this.webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE WEBCAM';

    if (this.webcamRunning) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        const video = this.videoRef.nativeElement;
        video.srcObject = stream;
        video.addEventListener('loadeddata', () => this.predictWebcam());
      });
    }
  }

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
      this.gestureOutputRef.nativeElement.style.display = "block";
      this.gestureOutputRef.nativeElement.style.width = this.videoWidth + "px";
      const categoryName = this.results.gestures[0][0].categoryName;
      const categoryScore = (this.results.gestures[0][0].score * 100).toFixed(2);
      const handedness = this.results.handednesses[0][0].displayName;
      this.gestureOutputRef.nativeElement.innerText =
        `GestureRecognizer: ${categoryName}\nConfidence: ${categoryScore}%\nHandedness: ${handedness}`;
    } else {
      this.gestureOutputRef.nativeElement.style.display = "none";
    }

    if (this.webcamRunning) {
      requestAnimationFrame(() => this.predictWebcam());
    }
  }
}