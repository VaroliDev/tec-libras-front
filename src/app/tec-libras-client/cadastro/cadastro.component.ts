import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GoogleSigninComponent } from '../../components/google-signin/google-signin.component';
import { HeaderSimpleComponent } from "../../components/header-simple/header-simple.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { LoadingComponent } from '../../components/loading/loading.component';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    user_name: string;
    fullName:string;
  };
}

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, GoogleSigninComponent, HeaderSimpleComponent, FooterComponent, LoadingComponent],   
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})


export class CadastroComponent {
  
  protected nome: string = ''

  cadastro(){
    console.table(this.nome)
  }

  constructor(private themeService: ThemeService,private UserService: UserService, private router: Router, private authService: AuthService)  {} 

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  }  

  paglogin() {
    this.router.navigate(['/login']); 
  }

  pagintroducao() {
    this.router.navigate(['/']); 
  }

  user = {
    id: '',
    full_name: '',
    user_name: '',
    email:'',
    password: ''
  };
  
  alertNomeInvalido: boolean = false;
  alertUserUso: boolean = false;
  alertUserInvalido: boolean = false;
  alertEmailUso: boolean = false;
  alertEmailInvalido: boolean = false;
  alertSenhaInvalida: boolean = false;
  isGoogleLogin: boolean = false;
  isSending: boolean = false;
  isLoading: boolean = false;

  cadastrar(): void {
      this.isLoading = true;
      if (this.isSending) return;
      if (!this.isGoogleLogin) {
        

      /* erros de validação normais (front)*/
      if (this.user.full_name.trim().length < 5 || !this.user.full_name.includes(' ')) {
        this.alertNomeInvalido = true;
        this.isLoading = false;
        return;
      }

      const userRegex = /^[a-zA-Z0-9._]+$/;
      if (this.user.user_name.length < 4 || !userRegex.test(this.user.user_name)) {
        this.alertUserInvalido = true;
        this.isLoading = false;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.user.email || !emailRegex.test(this.user.email)) {
        this.alertEmailInvalido = true;
        this.isLoading = false;
        return;
      }

      if (this.user.password.length < 6) {
        this.alertSenhaInvalida = true;
        this.isLoading = false;
        return;
      }
      }

      this.isSending = true;

      /*vai puxar os users e cadastrar só se nao tiver erros*/
      this.UserService.createUser(this.user).subscribe({
        next: (response: any) => {
          console.log(response);
          localStorage.setItem('firstLogin', response.firstLogin);
          this.UserService.login(this.user).subscribe(
          (response: LoginResponse) => {
            console.log('Resposta da API:', response);  // Verifique a estrutura da resposta
            const user = response.user;
            const fullName = user.fullName;
            const firstName = fullName.split(' ')[0];  // Pegando o primeiro nome
            this.authService.setToken(response.token); // Armazenando o token com AuthService
            this.setUserToLocalStorage(response, firstName, fullName); // Armazenando o primeiro nome
            this.isSending = false;
            this.isLoading = false;
            this.router.navigateByUrl('/inicio');
          });
        },
        error: (error: any) => {
          if (error?.error?.message?.includes('users_email_unique')) {
            this.alertEmailUso = true;
            this.isLoading = false;
          } else if (error?.error?.message?.includes('users_user_name_unique')) {
            this.alertUserUso = true;
            this.isLoading = false;
          }else {
            alert('Erro ao cadastrar. Tente novamente mais tarde.');
          }
          console.log(error);
        },
        complete: () => {
          this.isSending = false; // Libera para um novo envio
        }
      });
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

    /*serve p mudar o status das verificações*/
    verificarEmailUso(): void {
      if (this.alertEmailUso) {
        this.alertEmailUso = false;
      }
    }

    verificarEmailInvalido(): void {
      if (this.alertEmailInvalido) {
        this.alertEmailInvalido = false;
      }
    }

    verificarUserInvalido(): void {
      if (this.alertUserInvalido) {
        this.alertUserInvalido = false;
      }
    }

    verificarUserUso(): void {
      if (this.alertUserUso) {
        this.alertUserUso = false;
      }
    }

    verificarNomeInvalido(): void {
      if (this.alertNomeInvalido) {
        this.alertNomeInvalido = false;
      }
    }

    verificarSenhaInvalida(): void {
      if (this.alertSenhaInvalida) {
        this.alertSenhaInvalida = false;
      }
    }
}