import { Component,Input, OnInit} from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-nivel',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './level-themes.component.html',
  styleUrl: './level-themes.component.scss'
})
export class LevelThemesComponent implements OnInit {
  @Input() level: number = 1;     // Número do nível
  @Input() percent: number = 70;   // Progresso em %
  @Input() levelstyle: number = this.level % 2;

  radius = 65;          // raio do círculo
  circumference = 2 * Math.PI * this.radius;

  ngOnInit(): void {}
}
