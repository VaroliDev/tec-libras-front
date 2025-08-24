import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AfterViewInit} from '@angular/core';
declare var bootstrap: any;


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [CommonModule],
    standalone: true,
})


export class HeaderComponent implements AfterViewInit {

     ngAfterViewInit() {
    const dropdownElList = Array.from(document.querySelectorAll('.dropdown-toggle'));
    dropdownElList.forEach(el => new bootstrap.Dropdown(el));
  }
    constructor(private themeService: ThemeService, private router: Router, private authService: AuthService) {}

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

    logout() {
        this.authService.logout()
    }
};