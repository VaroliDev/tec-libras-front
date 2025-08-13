import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, HeaderComponent, FooterComponent] ,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
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
  
  logout() {
    this.authService.logout()
  }

  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;

  ngOnInit(): void {
    // Recuperando o primeiro nome do localStorage

    const userDataString = localStorage.getItem('userData') || '{}';
    const userData = JSON.parse(userDataString);

    this.firstName = userData.first_name || ''; // Pegando apenas o primeiro nome
    this.fullName = userData.full_name || '';
    this.userName = userData.user_name || ''; 

    if(this.firstName == null || this.fullName == null || this.userName == null) {
      this.router.navigate(['/login']);
    } 
  }
}
