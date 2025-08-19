import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';

interface RenewResponse {
  user: {
    id: number;
    user_name: string;
    fullName:string;
  };
}

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
    const tokenData = localStorage.getItem('token') || '';
    const token = JSON.parse(tokenData);

    this.userService.renewData(token.token).subscribe(
    (res) => {
      console.log('Usuário encontrado:', res);
    },
    (err) => {
      console.error('Erro:', err);
    })
  }
}