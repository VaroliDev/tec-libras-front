import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderSimpleComponent } from "../../components/header-simple/header-simple.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-introducao',
  imports: [FormsModule, HeaderSimpleComponent, FooterComponent],
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
}
