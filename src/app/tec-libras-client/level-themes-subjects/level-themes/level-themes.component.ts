import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from "../../../components/footer/footer.component";
import { HeaderComponent } from "../../../components/header/header.component";
import { LoadingSectionComponent } from '../../../components/loading-section/loading-section.component';
import { CardLevelThemeComponent } from '../../../components/card-level-theme/card-level-theme.component';
import { LevelService } from '../../../services/level.service';

interface itemLevel {
  level: number;
  percent: number;
}

@Component({
  selector: 'app-nivel',
  imports: [FooterComponent, HeaderComponent, LoadingSectionComponent, CardLevelThemeComponent],
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

  ngOnInit(): void {

    this.isLoading = true;

    const x = 5;

    //O setTimeout é para simular o carregamento dos niveis
    setTimeout(() => {
      for(let i=1; i<=x; i++){
        this.item.push({
          level: i,
          percent: Math.floor(Math.random() * 11) * 10
        });
      }
      this.isLoading = false;

    },800);
  }
}
