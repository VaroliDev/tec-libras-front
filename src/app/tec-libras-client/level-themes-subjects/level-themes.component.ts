import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-nivel',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './level-themes.component.html',
  styleUrl: './level-themes.component.scss'
})
export class LevelThemesComponent {

}
