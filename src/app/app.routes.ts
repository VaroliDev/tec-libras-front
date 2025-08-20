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


export const routes: Routes = [
    {
        path: '',
        component: IntroducaoComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'cadastro',
        component: CadastroComponent
        
    },

    {
        path: 'inicio',
        component: InicioComponent
    },
    
    {
        path: 'biblioteca-sinais',
        component: BibliotecaSinaisComponent
    },

    {
        path: 'comunidade',
        component: ComunidadeComponent
    },

    {
        path: 'sobre-nos',
        component: SobreNosComponent
    },

    {
        path: 'conta',
        component: ContaComponent
    },

    {
        path: 'lista-usuarios',
        component: ListaUsuariosComponent
    }
   
];