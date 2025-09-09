import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";

@Component({
  selector: 'app-curiosidades',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './curiosidades.component.html',
  styleUrl: './curiosidades.component.scss'
})
export class CuriosidadesComponent {

}
