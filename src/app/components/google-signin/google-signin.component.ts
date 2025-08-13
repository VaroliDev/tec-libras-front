import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { generate } from 'generate-password-ts';

@Component({
  selector: 'app-google-signin',
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.scss'
})
export class GoogleSigninComponent {
  constructor(private authService: AuthService, private UserService: UserService, private router: Router) {}

  user = {
    id: '',
    full_name: '',
    user_name: '',
    email:'',
    password: ''
  };

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
    .then(() => {
      const userDataString = localStorage.getItem('userData') || '{}';
      const userData = JSON.parse(userDataString);

      this.user.full_name = userData.full_name || '';
      this.user.user_name = userData.user_name ? userData.user_name.split('@')[0] : '';
      this.user.email = userData.user_name || '';
      this.user.password = generate({length: 10,numbers: true,});
      this.UserService.createUser(this.user).subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao criar usuário:', error);
        }})
    })
  }
}