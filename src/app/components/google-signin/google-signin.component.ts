import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-signin',
  imports: [],
  templateUrl: './google-signin.component.html',
  styleUrl: './google-signin.component.scss'
})
export class GoogleSigninComponent {
  constructor(private authService: AuthService, private UserService: UserService, private router: Router) {}

  loginWithGoogle(): void {
    this.authService.loginWithGoogle()
  }
}