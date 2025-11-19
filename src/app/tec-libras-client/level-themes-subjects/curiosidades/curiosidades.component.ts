import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { FooterComponent } from "../../../components/footer/footer.component";
import { LisiBalloonComponent } from '../../../components/lisi-balloon/lisi-balloon.component';

import { LevelService } from '../../../services/level.service';

@Component({
  selector: 'app-curiosidades',
  imports: [HeaderComponent, FooterComponent, LisiBalloonComponent],
  templateUrl: './curiosidades.component.html',
  styleUrl: './curiosidades.component.scss',
  standalone: true
})
export class CuriosidadesComponent {
  private router = inject(Router);
  private levelService = inject(LevelService);

  protected theme = this.levelService.getTheme();
  protected curiosidade: string = '';

  PagInicio(){
    this.router.navigate(['temas'])
  }

  PagBack(){
    this.router.navigate(['questionario'])
  }

  PagNext(){
    this.router.navigate(['inicio'])
  }

  async ngOnInit(){
    const data = await this.levelService.getThemeData(this.theme as number);
    this.curiosidade = data.curiosidade;
    console.log(this.curiosidade);
  }
}
