import { Routes } from '@angular/router';
import { CadastroComponent } from './tec-libras-client/cadastro/cadastro.component';
import { LoginComponent } from './tec-libras-client/login/login.component';
import { InicioComponent } from './tec-libras-client/inicio/inicio.component';
import { IntroducaoComponent } from './tec-libras-client/introducao/introducao.component';
import { BibliotecaSinaisComponent } from './tec-libras-client/biblioteca-sinais/biblioteca-sinais.component';
import { SobreNosComponent } from './tec-libras-client/sobre-nos/sobre-nos.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { ContaComponent } from './tec-libras-client/conta/conta.component';
import { ComunidadeComponent } from './tec-libras-client/comunidade/comunidade.component';
import { TermosCondicoesComponent } from './tec-libras-client/termos-condicoes/termos-condicoes.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
        import('./tec-libras-client/introducao/introducao.component').then(m => m.IntroducaoComponent)
    },

    {
        path: 'login',
        loadComponent: () =>
        import('./tec-libras-client/login/login.component').then(m => m.LoginComponent)
    },

    {
        path: 'cadastro',
        loadComponent: () =>
        import('./tec-libras-client/cadastro/cadastro.component').then(m => m.CadastroComponent)
        
    },

    {
        path: 'inicio',
        loadComponent: () =>
        import('./tec-libras-client/inicio/inicio.component').then(m => m.InicioComponent)
    },
    
    {
        path: 'biblioteca-sinais',
        loadComponent: () =>
        import('./tec-libras-client/biblioteca-sinais/biblioteca-sinais.component').then(m => m.BibliotecaSinaisComponent)
    },

    {
        path: 'comunidade',
        loadComponent: () =>
        import('./tec-libras-client/comunidade/comunidade.component').then(m => m.ComunidadeComponent)
    },

    {
        path: 'sobre-nos',
        loadComponent: () =>
        import('./tec-libras-client/sobre-nos/sobre-nos.component').then(m => m.SobreNosComponent)
    },

    {
        path: 'conta',
        loadComponent: () =>
        import('./tec-libras-client/conta/conta.component').then(m => m.ContaComponent)
    },

    {
        path: 'lista-usuarios',
        loadComponent: () =>
        import('./lista-usuarios/lista-usuarios.component').then(m => m.ListaUsuariosComponent)
    },

    {
        path: 'termos-condicoes',
        loadComponent: () =>
        import('./tec-libras-client/termos-condicoes/termos-condicoes.component').then(m => m.TermosCondicoesComponent)
    }
   
];