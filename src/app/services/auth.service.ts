import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  constructor(private router: Router) {}

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

  // Remove o token do localStorage e faz logout
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']); // Redireciona para a página de login
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
}
