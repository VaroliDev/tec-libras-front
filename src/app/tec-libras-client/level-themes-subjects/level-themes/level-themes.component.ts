import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { LoadingSectionComponent } from '../../../components/loading-section/loading-section.component';
import { CardLevelThemeComponent } from '../../../components/card-level-theme/card-level-theme.component';
import { LevelService } from '../../../services/level.service';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { EndHeaderComponent } from "../../../components/end-header/end-header.component";

interface itemLevel {
  level: number;
  title: string;
  subtitle: string;
  percent: number;
}

@Component({
  selector: 'app-nivel',
  imports: [FooterComponent, HeaderComponent, LoadingSectionComponent, CardLevelThemeComponent, EndHeaderComponent],
  templateUrl: './level-themes.component.html',
  styleUrl: './level-themes.component.scss'
})

export class LevelThemesComponent { 
  private router = inject(Router)
  private levelService = inject(LevelService);

  protected level_id = this.levelService.getLevel();
  
  PagBack(){
    this.router.navigate(['inicio'])
  }
  
  item:itemLevel[] = []
  isLoading: boolean = false;

  async ngOnInit() {
    const data_level = await this.levelService.getData(this.level_id as number);

    this.isLoading = true;
    
    //O setTimeout é para simular o carregamento dos niveis
    setTimeout(() => {
      for(let i=1; i<=5; i++){
        const tema = (data_level as any)[`tema${i}`];

        this.item.push({
          level: i,
          title: tema.title,
          subtitle: tema.subtitle,
          percent: Math.floor(Math.random() * 11) * 10
        });
      }
      this.isLoading = false;

    },800);
  }
}
