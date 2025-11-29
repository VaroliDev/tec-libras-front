import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderSimpleComponent } from "../../components/header-simple/header-simple.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { EndHeaderSimpleComponent } from "../../components/end-header-simple/end-header-simple.component";

@Component({
  selector: 'app-introducao',
  imports: [FormsModule, HeaderSimpleComponent, FooterComponent, EndHeaderSimpleComponent],
  templateUrl: './introducao.component.html',
  styleUrl: './introducao.component.scss'
})
export class IntroducaoComponent {
  constructor(private themeService: ThemeService, private router: Router) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  pagcadastro() {
    this.router.navigate(['/cadastro']); 
  }
  paglogin() {
    this.router.navigate(['/login']); 
  }

  pagintroducao() {
    this.router.navigate(['/']); 
  }

  pagsobrenos() {
    this.router.navigate(['/sobre-nos']); 
  }
}
