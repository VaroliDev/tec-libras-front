import { Component, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { EndHeaderComponent } from '../../../components/end-header/end-header.component';
import { LevelService } from '../../../services/level.service';
import { UserService } from '../../../services/user.service';
import { LisiFeedbackComponent } from '../../../components/lisi-feedback/lisi-feedback.component';

@Component({
  selector: 'app-aula-teorica',
  imports: [FooterComponent, HeaderComponent, EndHeaderComponent, CommonModule, LisiFeedbackComponent],
  templateUrl: './aula-teorica.component.html',
  styleUrl: './aula-teorica.component.scss'
})
export class AulaTeoricaComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);
  private userService = inject(UserService);

  protected theme = this.levelService.getTheme();
  protected level = this.levelService.getLevel();
  protected title: string = '';
  protected text: string = '';
  protected levelProgress: number = 0;

  @ViewChild('alert') alert!: LisiFeedbackComponent;

  textos: string[] = [];
  textoIndex: number = 0;
  userData: any;

  PagInicio() {
    this.router.navigate(['temas']);
  }

  PagBack() {
    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    if (this.textoIndex > 0) {
      this.textoIndex--;
      this.updateProgress(); // Use o método para atualizar
      conteudo.innerHTML = this.textos[this.textoIndex];
    }
  }

  async PagNext() {
    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    if (this.textoIndex < this.textos.length - 1) {
      this.textoIndex++;
      this.updateProgress(); // Use o método para atualizar
      conteudo.innerHTML = this.textos[this.textoIndex];
    } else {
      // Última página - marca como completo
      await this.levelService.registerProgress(1);
      this.alert.open('Parabéns!', 'Você finalizou a primeira etapa deste tema.', 'success', 5);
      
    }
  }

  // Atualiza o progresso visual
  updateProgress() {
    this.levelProgress = Math.round(((this.textoIndex + 1) / this.textos.length) * 100);
  }

  close(){
    this.router.navigate(['temas']);
  }

  async ngOnInit() {
    const data = await this.levelService.getThemeData(this.theme as number);

    this.title = data.title;
    this.text = data.aulaTeorica;

    this.textos = this.text.split('<hr/>').map(t => t.trim());

    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    conteudo.innerHTML = this.textos[this.textoIndex];
    
    // Inicializa o progresso
    this.updateProgress();

    // Carrega dados do usuário
    const userDataString = localStorage.getItem('token');
    this.userData = JSON.parse(userDataString || '{}');
  }
}