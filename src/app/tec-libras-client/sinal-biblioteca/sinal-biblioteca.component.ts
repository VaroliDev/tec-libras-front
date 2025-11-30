import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { EndHeaderComponent } from "../../components/end-header/end-header.component";
import { Router } from '@angular/router';
import { LoadingSectionComponent } from '../../components/loading-section/loading-section.component';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-sinal-biblioteca',
  imports: [HeaderComponent, FooterComponent, EndHeaderComponent, LoadingSectionComponent, SafePipe],
  templateUrl: './sinal-biblioteca.component.html',
  styleUrl: './sinal-biblioteca.component.scss'
})
export class SinalBibliotecaComponent {
constructor(private authService: AuthService, private router: Router){}

  firstName: string | null = null;

  ngOnInit(): void{
    this.authService.isLogged();
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');
    this.firstName = userData.first_name || '';
    this.isLoading = true;
    setTimeout(() => { this.isLoading = false; }, 800);
  }

  isLoading: boolean = false;
  protected url: string = '';

  PagInicio() {
    this.router.navigate(['biblioteca-sinais']);
  }

}
