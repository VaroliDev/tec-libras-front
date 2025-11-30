import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

import { EndHeaderComponent } from '../../../components/end-header/end-header.component';
import { LevelService } from '../../../services/level.service';

@Component({
  selector: 'app-aula-teorica',
  imports: [FooterComponent, HeaderComponent, EndHeaderComponent],
  templateUrl: './aula-teorica.component.html',
  styleUrl: './aula-teorica.component.scss'
})
export class AulaTeoricaComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected title: string = '';
  protected text: string = '';

  textos: string[] = [];
  textoIndex: number = 0;

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
      this.levelService.registerProgress(1);
      this.router.navigate(['temas']);
    }
  }

  async ngOnInit() {
    const data = await this.levelService.getThemeData(this.theme as number);

    this.title = data.title;
    this.text = data.aulaTeorica;

    this.textos = this.text.split('<hr/>').map(t => t.trim());

    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    conteudo.innerHTML = this.textos[this.textoIndex];
  }
}
