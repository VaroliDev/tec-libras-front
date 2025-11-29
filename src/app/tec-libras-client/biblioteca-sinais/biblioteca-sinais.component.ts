import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SinalComponent } from "../../components/sinal/sinal.component";
import { AuthService } from '../../services/auth.service';
import { EndHeaderComponent } from "../../components/end-header/end-header.component";

@Component({
  selector: 'app-biblioteca-sinais',
  imports: [FormsModule, CommonModule, HeaderComponent, FooterComponent, SinalComponent, EndHeaderComponent],
  templateUrl: './biblioteca-sinais.component.html',
  styleUrl: './biblioteca-sinais.component.scss'
})
export class BibliotecaSinaisComponent {
  constructor(
    private themeService: ThemeService, 
    private router: Router, 
    private authService: AuthService
  ) {}

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
  
  // Arrays de sinais
  sinais: any[] = [];
  sinaisPagina: any[] = [];
  
  // Configurações de paginação
  itemsPerPage: number = 12;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];
  
  firstName: string = '';

  ngOnInit(): void {
    this.authService.isLogged();
    const userDataString = localStorage.getItem('token');
    const userData = JSON.parse(userDataString || '{}');
    this.firstName = userData.first_name || '';

    // Inicializa os sinais - AJUSTE AQUI COM SEUS DADOS REAIS
    this.sinais = Array.from({ length: 25 }, (_, i) => ({ 
      id: i + 1,
      nome: `Sinal ${i + 1}`,
      categoria: 'Categoria',
      imagem: 'img/Icone_web.png',
      link: '#'
    }));
    
    this.inicializarPaginacao();
  }

  inicializarPaginacao(): void {
    this.totalPages = Math.ceil(this.sinais.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.atualizarPagina();
  }

  atualizarPagina(): void {
    const inicio = (this.currentPage - 1) * this.itemsPerPage;
    const fim = inicio + this.itemsPerPage;
    this.sinaisPagina = this.sinais.slice(inicio, fim);
    
    console.log('Página atual:', this.currentPage);
    console.log('Sinais exibidos:', this.sinaisPagina.length);
  }

  irParaPagina(numeroPagina: number): void {
    if (numeroPagina >= 1 && numeroPagina <= this.totalPages) {
      this.currentPage = numeroPagina;
      this.atualizarPagina();
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll para o topo
    }
  }

  paginaAnterior(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.atualizarPagina();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  proximaPagina(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.atualizarPagina();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get inicioContador(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get fimContador(): number {
    const fim = this.currentPage * this.itemsPerPage;
    return fim > this.sinais.length ? this.sinais.length : fim;
  }
}