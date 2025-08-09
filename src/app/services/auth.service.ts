import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';

  constructor(private auth: Auth, private router: Router) {}

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
  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('firstName');
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
        const user = result.user;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken || '';

        this.setToken(token);
        this.setFirstName(user.displayName || 'Usuário');

        // Salva o objeto do usuário em localStorage como JSON string
        localStorage.setItem('userData', JSON.stringify({
          first_name: user.displayName?.split(' ')[0] || 'Usuário',
          full_name: user.displayName || '',
          user_name: user.email || ''
        }));

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Erro no login com Google:', error);
      });
}
  }