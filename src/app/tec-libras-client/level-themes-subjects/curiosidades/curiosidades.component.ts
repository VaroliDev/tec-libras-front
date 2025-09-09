import { Component } from '@angular/core';
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

}
