import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comunidade',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './comunidade.component.html',
  styleUrl: './comunidade.component.scss'
})
export class ComunidadeComponent {
  constructor(private authService: AuthService){}

  firstName: string | null = null;

  ngOnInit(): void{
    this.authService.isLogged();
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');
    this.firstName = userData.first_name || '';
  }
}