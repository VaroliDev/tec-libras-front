  import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { AulaPraticaComponent } from "./tec-libras-client/aula-pratica/aula-pratica.component";
import { HeaderComponent } from "./components/header/header.component";
import { CadastroComponent } from "./tec-libras-client/cadastro/cadastro.component";
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { NavigationEnd } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'teclibras';


  constructor(private themeService: ThemeService, private userService: UserService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Inicializa todos os dropdowns após cada mudança de rota
        const dropdownElList = Array.from(document.querySelectorAll('.dropdown-toggle'));
        dropdownElList.forEach(el => new bootstrap.Dropdown(el));
      }
    });
  }


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

    //redireciona caso esteja logado -NAO ESTA FUNCIONANDO (nseipq)-
    if(token.token && this.router.url == '/login' || this.router.url == '/cadastro' || this.router.url == '/'){
      this.router.navigate(['/inicio'])
    }

    this.userService.renewData(token.token).subscribe(
    (res) => {      
      const userData = {
        id: res.user.id,
        user_name: res.user.user_name,
        first_name: res.user.full_name.split(' ')[0],
        full_name: res.user.full_name,
        token: res.user.token
      };
      localStorage.setItem('token', JSON.stringify(userData));
    },
    (err) => {
      console.error('Erro:', err);
    })
  }
}
