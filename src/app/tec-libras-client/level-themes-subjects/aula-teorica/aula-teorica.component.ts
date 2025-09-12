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

  PagInicio(){
    this.router.navigate(['temas'])
  }

  PagBack(){
    this.router.navigate(['temas'])
  }

  PagNext(){
    this.router.navigate(['demonstracao'])
  }
}
