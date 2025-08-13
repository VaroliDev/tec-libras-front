import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conta',
  imports: [FormsModule],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
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
  userName: string | null = null;

  ngOnInit(): void {
    // Recuperando o primeiro nome do localStorage

    const userDataString = localStorage.getItem('userData') || '{}';
    const userData = JSON.parse(userDataString);

    this.firstName = userData.first_name || 'Usuário'; // Pegando apenas o primeiro nome
    this.fullName = userData.full_name || '';
    this.userName = userData.user_name || ''; 

    if(this.firstName == null || this.fullName == null || this.userName == null) {
      this.router.navigate(['/login']);
    } 

  }
}
  