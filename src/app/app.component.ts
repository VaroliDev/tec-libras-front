import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

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

  constructor(private themeService: ThemeService, private userService: UserService, private router: Router) {}

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
      //redireciona caso esteja logado
      if(this.router.url == '/login' || this.router.url == '/cadastro' || this.router.url == ''){
        this.router.navigate(['/inicio'])
      }
      const userData = {
        first_name: res.user.fullName.split(' ')[0],
        full_name: res.user.fullName,
        user_name: res.user.user_name,
        id: res.user.id,
        token: res.user.token
      };
      localStorage.setItem('token', JSON.stringify(userData));
    },
    (err) => {
      console.error('Erro:', err);
    })
  }
}