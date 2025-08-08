import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  // Importar o HttpClient
import { Modal } from 'bootstrap';  // Importação direta do modal (se você precisar de algo específico)



@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']  // Corrigido para 'styleUrls' ao invés de 'styleUrl'
})
export class ListaUsuariosComponent implements OnInit {
  users: any[] = [];
  user: any;  
  apiUrl: string = 'http://localhost:3333/users';  // Defina a URL da sua API aqui

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private userService: UserService,
    private http: HttpClient  // Injetar o HttpClient aqui
  ) {}

  ngOnInit(): void {
     this.loadUsers();
    this.userService.getUsers().subscribe({
      next: (data) => {
         console.log('Dados recebidos:', data);
        this.users = data;
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }

  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  }

  pagsobrenos() {
    this.router.navigate(['/sobre-nos']);
  }

  paginicio() {
    this.router.navigate(['/inicio']);
  }
  
  loadUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({  // Corrigido para 'any[]' em vez de '.user[]'
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
    if (user && user.id) {  // Verifica se user está definido
      alert("o id é" + user.id);
    this.userId = user.id;
    this.full_name = user.full_name;
    this.user_name = user.user_name;
    this.email = user.email;
  
    // Abrir o modal
    const modalElement = document.getElementById('editUserModal');
    const modal = new Modal(modalElement as HTMLElement);
    modal.show();
  } else {
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
