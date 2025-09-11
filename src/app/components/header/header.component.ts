import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule],
    standalone: true,
})

export class HeaderComponent {
    constructor(private themeService: ThemeService, private router: Router, private authService: AuthService, private userService: UserService) {}

    onThemeChange(theme: string): void {
        this.themeService.applyTheme(theme);
    }
    
    isCurrentTheme(theme: string): boolean {
        return this.themeService.getCurrentTheme() === theme;
    }

    isCurrentPage(route: string): boolean {
    return this.router.url === route;
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
    
    pagcomunidade() {
        this.router.navigate(['/comunidade']);
    }

    pagAdmin() {
        this.router.navigate(['/admin']);
    }

    logout() {
        this.authService.logout()
    }

    isLogged: boolean = false;

    ngOnInit(){
        const userDataString = localStorage.getItem('token');
        const userData = JSON.parse(userDataString || '{}');

        this.userService.getUserRole(userData.id).subscribe({
        next: (data) => {
            if(data.role === 'admin'){
            this.isLogged = true;
            }
        },
        error: (err) => {
            console.error('Erro ao buscar papel do usuário:', err);
            return
        }
        });
    }
};