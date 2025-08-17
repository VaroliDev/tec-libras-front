import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    user_name: string;
    fullName:string;
  };
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, GoogleSigninComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected nome: string = '';

  cadastro(){
    console.table(this.nome);
  }

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 
  
  pagcadastro() {
    this.router.navigate(['/cadastro']); 
  }

  pagintroducao() {
    this.router.navigate(['/']); 
  }

  // Tipagem da variável user
  user = {
    user_name: '',
    password: '',
    fullName:''
  };

  alertCredenciaisInvalidas: boolean = false;

  // Método de login com tipagem do retorno
  login(): void {
  this.userService.login(this.user).subscribe(
    (response: LoginResponse) => {
      this.alertCredenciaisInvalidas = false;
      this.authService.setToken(response.token);
      localStorage.setItem('token', JSON.stringify(response.token));
      this.router.navigateByUrl('/inicio');
    },
    (error: any) => {
      this.alertCredenciaisInvalidas = true;
    }
  );
}
  
  setUserToLocalStorage(response: LoginResponse, firstName: string, fullName: string): void {
    const userData = {
      first_name: firstName,
      full_name: fullName,
      user_name: response.user.user_name,
      id: response.user.id,
      token: response.token
    };
    localStorage.setItem('token', JSON.stringify(userData));
  }
}
