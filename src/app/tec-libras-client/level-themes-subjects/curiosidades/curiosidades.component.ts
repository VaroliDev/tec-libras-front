import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LisiBalloonComponent } from '../../../components/lisi-balloon/lisi-balloon.component';
import { LisiFeedbackComponent } from '../../../components/lisi-feedback/lisi-feedback.component';

import { LevelService } from '../../../services/level.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

@Component({
  selector: 'app-curiosidades',
  imports: [HeaderComponent, FooterComponent, LisiBalloonComponent, EndHeaderComponent, LisiFeedbackComponent],
  templateUrl: './curiosidades.component.html',
  styleUrl: './curiosidades.component.scss',
  standalone: true
})
export class CuriosidadesComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected curiosidades: string[] = [];
  protected curiosidadeAtual: string = '';
  protected indiceAtual: number = 0;

  protected finished: boolean = false;
  protected redict: string = 'temas';

  @ViewChild('alert') alert!: LisiFeedbackComponent;

  PagInicio(){
    this.router.navigate(['temas']);
  }

  PagBack(){
    if (this.indiceAtual > 0) {
      this.indiceAtual--;
      this.curiosidadeAtual = this.curiosidades[this.indiceAtual];
    } else {
      this.router.navigate(['temas']);
    }
  }

  PagNext(){
    if (this.indiceAtual < this.curiosidades.length - 1) {
      this.indiceAtual++;
      this.curiosidadeAtual = this.curiosidades[this.indiceAtual];
    } else {
      this.levelService.registerProgress(5);
      this.alert.open('Você é demais!', 'Parabéns, você concluiu o último tópico! Pronto(a) para iniciar uma nova fase?', 'success');
    }
  }

  async ngOnInit(){
    const data = await this.levelService.getThemeData(this.theme as number);
    
    this.curiosidades = data.curiosidade
      .split('<hr/>')
      .map((c: string) => c.trim())
      .filter((c: string) => c.length > 0);
    
    this.curiosidadeAtual = this.curiosidades[0];
    
    console.log('Total de curiosidades:', this.curiosidades.length);
    console.log('Curiosidades:', this.curiosidades);
  }

  get isUltimaCuriosidade(): boolean {
    return this.indiceAtual === this.curiosidades.length - 1;
  }
  get isPrimeiraCuriosidade(): boolean {
    return this.indiceAtual === 0;
  }
}