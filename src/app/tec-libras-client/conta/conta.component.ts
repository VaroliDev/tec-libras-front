import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-conta',
  standalone: true, 
  imports: [FormsModule, HeaderComponent, FooterComponent, LoadingComponent],
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})

export class ContaComponent {
  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService,
      private http: HttpClient ) {}

      private userService = inject(UserService)

      protected userData = this.userService.getUserInfo()

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

    this.isLoading = false;
    this.userId = this.userData()!.id;
    this.full_name = this.userData()!.full_name;
    this.user_name = this.userData()!.user_name;
    this.email = this.userData()!.email;
    
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
    next: (response) => {
      this.userService.setUserInfo({
        user_name: response.userName,
        full_name:response.fullName,
        email: this.userData()!.email,
        token:this.userData()!.token,
        id: response.id, 
        first_name:this.userData()!.full_name.split(' ')[0]
      })
      alert('Usuário atualizado com sucesso');
    },
    error: (err) => {
      alert('Erro ao atualizar usuário');
    }
    });


  }

  loadUser(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }
  
}   
