import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LisiBalloonComponent } from '../../../components/lisi-balloon/lisi-balloon.component';

@Component({
  selector: 'app-curiosidades',
  imports: [HeaderComponent, FooterComponent, LisiBalloonComponent],
  templateUrl: './curiosidades.component.html',
  styleUrl: './curiosidades.component.scss',
  standalone: true
})
export class CuriosidadesComponent {
  private router = inject(Router);

  PagInicio(){
    this.router.navigate(['temas'])
  }

  PagBack(){
    this.router.navigate(['questionario'])
  }

  PagNext(){
    this.router.navigate(['inicio'])
  }
}
