import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';  // Importação direta do modal (se você precisar de algo específico)


@Component({
  selector: 'app-conta',
  imports: [FormsModule, HeaderComponent, FooterComponent, LoadingComponent],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss'
})
export class ContaComponent {
  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService, private userService: UserService,
      private http: HttpClient ) {}

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  paginicio(){
    this.router.navigate(['/inicio']);
  }

  pagbiblioteca(){
    this.router.navigate(['/biblioteca-sinais']);
  }
  pagsobrenos(){
    this.router.navigate(['/sobre-nos']);
  }

  pagconta(){
    this.router.navigate(['/conta']);
  }
  
  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;
  isLoading: boolean = false;

  user_name: string = '';
  full_name: string = '';
  email: string = '';
    userId: number | null = null;


  ngOnInit(): void {
    
    this.authService.isLogged();
    this.isLoading = true;
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');

    this.firstName = userData.first_name;
    this.fullName = userData.full_name ;
    this.userName = userData.user_name;
    this.userId = userData.user_id;

    this.isLoading = false;

     this.userId = userData.id;
    this.full_name = userData.full_name;
    this.user_name = userData.user_name;
    this.email = userData.email;
    
  }

   apiUrl: string = 'http://localhost:3333/user';
    user: any;


  updateUser(userId:number): void {


     const updatedUser = {
      full_name: this.full_name,
      user_name: this.user_name,
      email: this.email
  };

      this.userService.updateUser(userId,updatedUser).subscribe({
    next: () => {
      alert('Usuário atualizado com sucesso');

    },
    error: (err) => {
      alert('Erro ao atualizar usuário');
    }
    });
  }

}
  