import { Component } from '@angular/core';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";

@Component({
  selector: 'app-themes',
  imports: [FooterComponent, HeaderComponent,],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent {

}
