import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { HeaderSimpleComponent } from '../../components/header-simple/header-simple.component';

interface LoginResponse {
  user: {
    id: number;
    user_name: string;
    fullName:string;
    token: string;
  };
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, GoogleSigninComponent, HeaderSimpleComponent],
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
        console.log('Resposta da API:', response);  // Verifique a estrutura da resposta
        this.alertCredenciaisInvalidas = false;
        const user = response.user;
        const fullName = user.fullName;
        const firstName = fullName.split(' ')[0];  // Pegando o primeiro nome
        this.setUserToLocalStorage(response, firstName, fullName); // Armazenando o primeiro nome
        this.router.navigateByUrl('/inicio');
      },
      (error: any) => {
        console.log('Credenciais inválidas:', error);
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
      token: response.user.token
    };
    localStorage.setItem('token', JSON.stringify(userData));
  }
}
