import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { EndHeaderComponent } from "../../components/end-header/end-header.component";
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-conta',
  standalone: true, 
  imports: [
    FormsModule, HeaderComponent, FooterComponent, LoadingComponent, EndHeaderComponent, AlertComponent
  ],
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.scss']
})
export class ContaComponent implements AfterViewInit {

  constructor(
    private themeService: ThemeService, private router: Router, private authService: AuthService, private http: HttpClient
  ) {}

  private userService = inject(UserService);
  protected userData = this.userService.getUserInfo();

  @ViewChild('alert') alert!: AlertComponent; // ViewChild para o alert reutilizável

  firstName: string | null = null;
  fullName: string | null = null;
  userName: string | null = null;
  isLoading: boolean = false;

  user_name: string = '';
  full_name: string = '';
  email: string = '';
  userId: number | null = null;

  apiUrl: string = 'http://localhost:3333/user';
  user: any;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.authService.isLogged();
    this.isLoading = true;

    this.userId = this.userData()!.id;
    this.full_name = this.userData()!.full_name;
    this.user_name = this.userData()!.user_name;
    this.email = this.userData()!.email;
    this.isLoading = false;
  }

  onThemeChange(theme: string): void {
    this.themeService.applyTheme(theme);
  }
  
  isCurrentTheme(theme: string): boolean {
    return this.themeService.getCurrentTheme() === theme;
  } 

  paginicio() { this.router.navigate(['/inicio']); }
  pagbiblioteca() { this.router.navigate(['/biblioteca-sinais']); }
  pagsobrenos() { this.router.navigate(['/sobre-nos']); }
  pagconta() { this.router.navigate(['/conta']); }

  updateUser(userId:number): void {
    const updatedUser = {
      full_name: this.full_name,
      user_name: this.user_name,
      email: this.email
    };

    this.userService.updateUser(userId, updatedUser).subscribe({
      next: (response) => {
        this.userService.setUserInfo({
          user_name: response.userName,
          full_name: response.fullName,
          email: this.userData()!.email,
          token: this.userData()!.token,
          id: response.id, 
          first_name: this.userData()!.full_name.split(' ')[0]
        });

        this.alert.open('<h3><b>Informações atualizadas!</b></h3> <p>As informações de sua conta foram atualizadas com sucesso.</p>', 'success');

      },
      error: (err) => {
        this.alert.open('<h3><b>Erro ao atualizar!</b></h3> <p>As informações de sua conta não foram atualizadas. Tente novamente.</p>', 'error');
      }
    });
  }

  loadUser(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.user = data,
      error: (err) => console.error('Erro ao carregar usuários', err),
    });
  }
}
