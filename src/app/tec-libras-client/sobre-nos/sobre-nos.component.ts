import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderSimpleComponent } from "../../components/header-simple/header-simple.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-sobre-nos',
  imports: [FormsModule, FooterComponent, HeaderSimpleComponent, HeaderComponent],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.scss'
})
export class SobreNosComponent {
  constructor(private themeService: ThemeService, private router: Router) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  pagsobrenos(){
    this.router.navigate(['/sobre-nos']);
  }
  paginicio(){
    this.router.navigate(['/inicio']);
  }

  isLogged: boolean = false;

  ngOnInit(){
    const user = localStorage.getItem('token');
    if(user){
      this.isLogged = true;
    }
  }
}
