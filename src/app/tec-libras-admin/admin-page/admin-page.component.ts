import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  pagLista(){
    this.router.navigate(['/lista-usuarios']);
  }

  pagCadastroConteudo(){
    this.router.navigate(['/conteudo'])
  }
  ngOnInit(): void{
  
  const userDataString = localStorage.getItem('token') || '';
  if(!userDataString){
    this.router.navigate(['/login']);
    return;
  }

  const userData = JSON.parse(userDataString);

  this.userService.getUserRole(userData.id).subscribe({
      next: (data) => {
        if(data.role !== 'admin'){
          this.router.navigate(['/inicio']);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar papel do usuário:', err);
        return
      }
    });
  }
}
