import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LoadingSectionComponent } from '../../../components/loading-section/loading-section.component';

import { LevelService } from '../../../services/level.service';
import { SafePipe } from '../../../pipes/safe.pipe';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

@Component({
  selector: 'app-demonstracoes',
  imports: [HeaderComponent, FooterComponent, LoadingSectionComponent, SafePipe, EndHeaderComponent],
  templateUrl: './demonstracoes.component.html',
  styleUrl: './demonstracoes.component.scss'
})
export class DemonstracoesComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);
  protected theme = this.levelService.getTheme();

  protected url: string = '';

  isLoading: boolean = false;

  urls: string[] = [];
  urlIndex: number = 0;

  PagInicio() {
    this.router.navigate(['temas']);
  }

  PagBack() {
    if (this.urlIndex > 0) {
      this.urlIndex--;
      this.url = this.urls[this.urlIndex];
    }
  }

  PagNext() {
    if (this.urlIndex < this.urls.length - 1) {
      this.urlIndex++;
      this.url = this.urls[this.urlIndex];
    } else {
      this.levelService.registerProgress(2);
      this.router.navigate(['temas']);
    }
  }

  async ngOnInit() {
    const data = await this.levelService.getThemeData(this.theme as number);

    this.urls = data.demonstracao.split('<hr/>').map((t: string) => t.trim());
    this.url = this.urls[this.urlIndex];

    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 800);
  }
}
