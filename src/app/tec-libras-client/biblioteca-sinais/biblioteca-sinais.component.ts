import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SinalComponent } from "../../components/sinal/sinal.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-biblioteca-sinais',
  imports: [FormsModule, HeaderComponent, FooterComponent, SinalComponent],
  templateUrl: './biblioteca-sinais.component.html',
  styleUrl: './biblioteca-sinais.component.scss'
})
export class BibliotecaSinaisComponent {
  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  paginicio(){
    this.router.navigate(['/inicio']);
  }

  pagbiblioteca(){
    this.router.navigate(['/biblioteca-sinais']);
  }
  
  pagsobrenos(){
    this.router.navigate(['/sobre-nos']);
  }

  pagconta(){
    this.router.navigate(['/conta']);
  }
  
  //o length define a quantidade de sinais que vao aparecer
  sinais = Array.from({ length: 16 });
  
  firstName: string = ''

  ngOnInit(): void{
    this.authService.isLogged();
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');
    this.firstName = userData.first_name || '';
  }
}
