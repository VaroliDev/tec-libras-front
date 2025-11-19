import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

import { LevelService } from '../../../services/level.service';

@Component({
  selector: 'app-aula-teorica',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './aula-teorica.component.html',
  styleUrl: './aula-teorica.component.scss'
})
export class AulaTeoricaComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();

  textos: string[] = [
    'Bih',
    'Twin',
    'Sybau',
    'Zamn'
  ];

  textoIndex: number = 0;

  PagInicio(){
    this.router.navigate(['temas'])
  }

  PagBack(){
    const conteudo = document.getElementById('text')
    if(!conteudo){
      return
    }
    if (this.textoIndex > 0) {
      this.textoIndex--;
      conteudo.innerText = this.textos[this.textoIndex]
    }
  }

  PagNext(){
    const conteudo = document.getElementById('text')
    if(!conteudo){
      return
    }
    if (this.textoIndex < this.textos.length - 1) {
      this.textoIndex++;
      conteudo.innerText = this.textos[this.textoIndex]
    } else {
      this.router.navigate(['temas']);
    }
  }

  ngOnInit(): void {
    const conteudo = document.getElementById('text')
    if(!conteudo){
      return
    }

    conteudo.innerText = this.textos[this.textoIndex]
  }
}
