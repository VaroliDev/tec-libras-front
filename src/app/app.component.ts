import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

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
    if(!tokenData){
      return;
    }
  
    const token = JSON.parse(tokenData);

    //redireciona caso esteja logado
    if(token.token){
      if(this.router.url === '/login' || this.router.url === '/cadastro'){
        this.router.navigate(['/inicio'])
      }
    }

    this.userService.renewData(token.token).subscribe(
    (res) => {      
      const userData = {
        id: res.user.id,
        user_name: res.user.user_name,
        first_name: res.user.full_name.split(' ')[0],
        full_name: res.user.full_name,
        email: res.user.email,
        token: res.user.token
      };
      localStorage.setItem('token', JSON.stringify(userData));
    },
    (err) => {
      console.error('Erro:', err);
    })
  }
}
