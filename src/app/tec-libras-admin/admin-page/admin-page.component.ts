import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  router = inject(Router);

  pagLista(){
    this.router.navigate(['/lista-usuarios']);
  }

  pagCadastroConteudo(){
    this.router.navigate(['/conteudo'])
  }
}
