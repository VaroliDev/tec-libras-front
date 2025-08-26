import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-conta',
  imports: [FormsModule, HeaderComponent, FooterComponent, LoadingComponent],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
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
  
  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.authService.isLogged();
    this.isLoading = true;
    setTimeout(() => {

    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');

    this.firstName = userData.first_name || '';
    this.fullName = userData.full_name || '';
    this.userName = userData.user_name || '';

    this.isLoading = false;
    }, 500);
  }
}
  