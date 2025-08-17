import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'teclibras';

  constructor(private themeService: ThemeService, private userService: UserService) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  }
  
  ngOnInit() {
  const token = localStorage.getItem('token');
  if (token) {
    this.userService.getUserByToken(token).subscribe({
      next: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
      },
      error: (error) => {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        }
      });
    }
  }
}
