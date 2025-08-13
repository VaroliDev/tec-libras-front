import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: true,
})

export class HeaderComponent {
    constructor(private themeService: ThemeService, private router: Router, private authService: AuthService) {}

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
};