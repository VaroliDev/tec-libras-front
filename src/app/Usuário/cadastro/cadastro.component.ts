import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule],   
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  
  protected nome: string = ''

  cadastro(){
    console.table(this.nome)
  }

  constructor(private themeService: ThemeService,private UserService: UserService, private router: Router)  {} 

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
  isSending: boolean = false;
  

    cadastrar(): void {

      if (this.isSending) return;
      

      /* erros de validação normais (front)*/
      if (this.user.full_name.trim().length < 5 || !this.user.full_name.includes(' ')) {
        this.alertNomeInvalido = true;
        return;
      }

      const userRegex = /^[a-zA-Z0-9._]+$/;
      if (this.user.user_name.length < 4 || !userRegex.test(this.user.user_name)) {
        this.alertUserInvalido = true;
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.user.email || !emailRegex.test(this.user.email)) {
        this.alertEmailInvalido = true;
        return;
      }

      if (this.user.password.length < 6) {
        this.alertSenhaInvalida = true;
        return;
      }

      this.isSending = true;

      /*vai puxar os users e cadastrar só se nao tiver erros*/
      this.UserService.createUser(this.user).subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigateByUrl('/login');
        },

        /* erros de validação do backend */
        error: (error: any) => {
          if (error?.error?.message?.includes('users_email_unique')) {
            this.alertEmailUso = true;
          } else if (error?.error?.message?.includes('users_user_name_unique')) {
            this.alertUserUso = true;
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