import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-simple',
  imports: [],
  templateUrl: './header-simple.component.html',
  styleUrl: './header-simple.component.scss'
})
export class HeaderSimpleComponent {
  constructor(private themeService: ThemeService, private router: Router) {}
  
    onThemeChange(theme: string): void {
      this.themeService.applyTheme(theme);
    }
    
    isCurrentTheme(theme: string): boolean {
      return this.themeService.getCurrentTheme() === theme;
    } 

  paglogin() {
    this.router.navigate(['/login']); 
  }

  pagcadastro() {
    this.router.navigate(['/cadastro']); 
  }

  pagintroducao() {
    this.router.navigate(['/']); 
  }

  pagsobrenos() {
    this.router.navigate(['/sobre-nos']); 
  }
}
