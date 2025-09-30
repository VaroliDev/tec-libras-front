import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-aula-teorica',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './aula-teorica.component.html',
  styleUrl: './aula-teorica.component.scss'
})
export class AulaTeoricaComponent {
  private router = inject(Router);

  textos: string[] = [
    'Bih',
    'Twin',
    'Sybau',
    'Zamn'
  ];

  textoIndex: number = 0;

  get currentText(): string {
    return this.textos[this.textoIndex];
  }

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
      this.router.navigate(['inicio']);
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
