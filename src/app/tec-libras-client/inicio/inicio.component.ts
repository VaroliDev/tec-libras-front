import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private themeService: ThemeService, private router: Router) {}

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
  firstName: string | null = null;
  fullName: string | null = null;
  username: string | null = null;

  ngOnInit(): void {
    // Recuperando o primeiro nome do localStorage
    const userData = JSON.parse(localStorage.getItem('token') || '{}');
    this.firstName = userData.first_name; // Pegando apenas o primeiro nome
    this.fullName = userData.full_name;
    this.username = userData.user_name;  
  }
}
