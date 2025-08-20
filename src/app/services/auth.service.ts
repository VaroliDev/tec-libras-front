import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserService } from './user.service';
import { generate } from 'generate-password-ts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  constructor(private auth: Auth, private router: Router, private userService: UserService) {}

  // Armazena o token no localStorage
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Recupera o token armazenado no localStorage
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Verifica se o usuário está autenticado (se o token existe)
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  isLoggedIn(): boolean{
    const token = localStorage.getItem('token')
    if(!token){
      return false;
    }
    return true;
  }

  // Remove o token do localStorage e faz logout
  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
  // Retorna o nome do usuário do token armazenado (se necessário)
  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificando o JWT (se for o caso)
      return decodedToken.user_name; // Supondo que o JWT contenha esse campo
    }
    return null;
  }

  setFirstName(fullName: string): void {
  const firstName = fullName.split(' ')[0];  // Pegando o primeiro nome
  localStorage.setItem('firstName', firstName);
  }

  //Metodo de login com Google
  loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('inicio login google')
        const userGoogle = result.user;

        console.log('resultado', userGoogle)
        const user = {
          user_name: userGoogle.email?.split('@')[0],
          first_name: userGoogle.displayName?.split(' ')[0],
          full_name: userGoogle.displayName,
          email: userGoogle.email,
          password: generate({length: 16, numbers: true})
        }

        console.log('dados capturados', user)

        const doesExist = this.userService.doesUserExists;
        if(!doesExist){
          this.userService.createUser(user).subscribe({});
          console.log('Xereca')
        }
        console.log('inicio cadastro', user)

            //realiza o login
            this.userService.login(user).subscribe({
              next: (res) => {
                console.log('inicio login', res)
                const userData = {
                  id: res.user.id,
                  user_name: res.user.user_name,
                  first_name: res.user.fullName.split(' ')[0],
                  full_name: res.user.fullName,
                  token: res.user.token
                };
                localStorage.setItem('token', JSON.stringify(userData));
                console.log('login finalizado');
                this.router.navigateByUrl('/inicio' )
              },
              error: (err) => {
                console.log("ASDADAS", err)
              }
            })
      })
      .catch((error) => {
        console.error('Erro no login com Google:', error);
      });
  }
}