import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sinais-info',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './sinais-info.component.html',
  styleUrl: './sinais-info.component.scss'
})
export class SinaisInfoComponent {
  constructor(
    private router: Router 
  ) {}

  paginicio() {
    this.router.navigate(['/inicio']);
  }
}
