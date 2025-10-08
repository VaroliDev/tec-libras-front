import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-themes',
  imports: [FooterComponent, HeaderComponent,],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {
  private router = inject(Router)

  PagBack(){
    this.router.navigate(['nivel'])
  }

  PagTeorica(){
    this.router.navigate(['aula-teorica'])
  }

  PagDemonstracao(){
    this.router.navigate(['demonstracao'])
  }

  PagPratica(){
    this.router.navigate(['aula-pratica'])
  }

  PagQuestionario(){
    this.router.navigate(['questionario'])
  }

  PagCuriosidades(){
    this.router.navigate(['curiosidades'])
  }
}
