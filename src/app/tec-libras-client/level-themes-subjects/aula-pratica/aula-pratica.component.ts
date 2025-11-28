import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

import { LevelService } from '../../../services/level.service';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

@Component({
  selector: 'app-aula-pratica',
  imports: [HeaderComponent, FooterComponent, EndHeaderComponent],
  templateUrl: './aula-pratica.component.html',
  styleUrl: './aula-pratica.component.scss'
})
export class AulaPraticaComponent {
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
      this.router.navigate(['temas']);
    }
  }

  async ngOnInit() {
    const data = await this.levelService.getThemeData(this.theme as number);

    this.title = data.title;
    this.text = data.aulaPratica;

    this.textos = this.text.split('<hr/>').map(t => t.trim());

    const conteudo = document.getElementById('text');
    if (!conteudo) return;

    conteudo.innerHTML = this.textos[this.textoIndex];
  }
}
