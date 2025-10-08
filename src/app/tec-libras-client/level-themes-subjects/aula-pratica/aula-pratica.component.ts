import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-aula-pratica',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './aula-pratica.component.html',
  styleUrl: './aula-pratica.component.scss'
})
export class AulaPraticaComponent {
  private router = inject(Router);

  PagInicio(){
    this.router.navigate(['temas'])
  }

  PagBack(){
    this.router.navigate(['demonstracao'])
  }

  PagNext(){
    this.router.navigate(['questionario'])
  }
}
