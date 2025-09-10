import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LoadingSectionComponent } from '../../../components/loading-section/loading-section.component';

@Component({
  selector: 'app-demonstracoes',
  imports: [HeaderComponent, FooterComponent, LoadingSectionComponent],
  templateUrl: './demonstracoes.component.html',
  styleUrl: './demonstracoes.component.scss'
})
export class DemonstracoesComponent {
  isLoading: boolean = false;

  ngOnInit(): void {

    this.isLoading = true;
    setTimeout(() => {

      this.isLoading = false;

    },800);
  }
}
