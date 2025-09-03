
import { Component, inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

export class ContaComponent impl
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
    
    console.log(userData)
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
        first_name:this.userData()!.first_name
      })
      alert('Usuário atualizado com sucesso');
    },
    error: (err) => {
      alert('Erro ao atualizar usuário');
    }
    });

    window.location.reload;

  }

  loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }

  deleteUser(userId: number): void {
    const confirmDelete = confirm('Tem certeza que deseja excluir este usuário?');
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('Usuário excluído com sucesso');
          this.loadUsers(); // Atualiza a lista
        },
        error: (err) => {
          console.error('Erro ao excluir usuário', err);
        }
      });
    }
  }

  userId: number | null = null;
  user_name: string = '';
  full_name: string = '';
  email: string = '';

  editUser(user: any): void {
    if (user && user.id) {
      alert("o id é " + user.id);
      this.userId = user.id;
      this.full_name = user.full_name;
      this.user_name = user.user_name;
      this.email = user.email;

      // Abrir o modal
    const modalElement = document.getElementById('editUserModal');
    const modal = new Modal(modalElement as HTMLElement);
    modal.show();
    }
    else {
    alert("ID indefinido");
  }
  }
  
    updateUser(userId: number) {
    if (this.userId == null) {
      console.error('Erro: Não há um usuário válido selecionado para atualização.');
      return;
    }

    alert("id no update user " + userId);
    const updatedUser = {
      full_name: this.full_name,
      user_name: this.user_name,
      email: this.email
    };
  
    this.userService.updateUser(userId, updatedUser).subscribe({
      next: () => {
        console.log('Usuário atualizado com sucesso');
        this.loadUsers(); // Atualiza a lista
        this.cancelEdit(); // Limpa o formulário
      },
      error: (err) => {
        console.error('Erro ao atualizar usuário', err);
      }
    });
  }
  
    cancelEdit(): void {
    this.userId = null;
    this.user_name = '';
    this.full_name = '';
    this.email = '';
  }
}
