import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { LevelComponent } from '../../components/level/level.component';
import { LoadingSectionComponent } from '../../components/loading-section/loading-section.component';
import { PhaseService } from '../../services/phase.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';

interface itemLevel {
  level: number;
  percent: number;
}

@Component({
  selector: 'app-inicio',
  imports: [FormsModule, HeaderComponent, FooterComponent, LevelComponent, LoadingSectionComponent] ,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {
  constructor(private themeService: ThemeService, private router: Router, private authService: AuthService, private phase: PhaseService,
     private http: HttpClient) {}

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
  
  logout() {
    this.authService.logout()
  }

  firstName: string | null = null;
  isLoading: boolean = false;
  user_name: string = '';
  full_name: string = '';
  email: string = '';
  userId: number | null = null;
  currentFrase: string | undefined;

  item:itemLevel[] = []

  ngOnInit(): void {
    this.getCurrentFrase();
    this.authService.isLogged();

    this.isLoading = true;
    this.full_name = this.userData()!.full_name;
    this.user_name = this.userData()!.user_name;
    this.firstName = this.full_name.split(" ")[0];


    //Define a quantidade de niveis que vao aparecer
    const x = 5;

    //O setTimeout é para simular o carregamento dos niveis
    setTimeout(() => {

      for(let i=1; i<=x; i++){
        this.item.push({
          level: i,
          percent: Math.floor(Math.random() * 11) * 10
        });
      }
      this.isLoading = false;

    },800);
  }

  getCurrentFrase(): string {
    this.currentFrase = this.phase.frases[Math.floor(Math.random()*(87))]
    return this.currentFrase
  }
}
