import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { UserService } from './user.service';
import { generate } from 'generate-password-ts';
import { firstValueFrom } from 'rxjs';

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

  isLogged(): boolean{
    const token = localStorage.getItem('token')
    if(token){
      console.log()
      return true;
    }
    this.router.navigate(['/login'])
    return false;
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
  async loginWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(this.auth, provider);
    const userGoogle = result.user;

    if (!userGoogle.email) throw new Error("Usuário do Google sem email");

    const user = {
      user_name: userGoogle.email.split('@')[0],
      first_name: userGoogle.displayName?.split(' ')[0] ?? '',
      full_name: userGoogle.displayName ?? '',
      email: userGoogle.email,
      password: generate({ length: 16, numbers: true }),
      isGoogleLogin: true
    };

    const resExists = await firstValueFrom(this.userService.doesUserExists(user.user_name));

    if (!resExists.exists) {
      await firstValueFrom(this.userService.createUser(user));
      console.log("Usuário criado");
    }

    const resLogin = await firstValueFrom(this.userService.login(user));

    const userData = {
      id: resLogin.user.id,
      user_name: resLogin.user.user_name,
      first_name: resLogin.user.fullName.split(' ')[0],
      full_name: resLogin.user.fullName,
      token: resLogin.user.token
    };

    localStorage.setItem('token', JSON.stringify(userData));
    console.log("login finalizado");
    this.router.navigateByUrl('/inicio');

  } catch (error) {
    console.error("Erro no login com Google:", error);
  }
}
}