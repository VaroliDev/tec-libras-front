import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-aula-teorica',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './aula-teorica.component.html',
  styleUrl: './aula-teorica.component.scss'
})
export class AulaTeoricaComponent {

}
