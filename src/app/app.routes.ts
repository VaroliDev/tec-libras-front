import { Routes } from '@angular/router';
import { CadastroComponent } from './Usuário/cadastro/cadastro.component';
import { LoginComponent } from './Usuário/login/login.component';
import { InicioComponent } from './Usuário/inicio/inicio.component';
import { IntroducaoComponent } from './Usuário/introducao/introducao.component';
import { BibliotecaSinaisComponent } from './Usuário/biblioteca-sinais/biblioteca-sinais.component';
import { SobreNosComponent } from './Usuário/sobre-nos/sobre-nos.component';
import { ListaUsuariosComponent } from './Gerenciamento/lista-usuarios/lista-usuarios.component';
import { ContaComponent } from './Usuário/conta/conta.component';


export const routes: Routes = [
    {
        path: 'cadastro',
        component: CadastroComponent
        
    },
    
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'inicio',
        component: InicioComponent
    },

    {
        path: '',
        component: IntroducaoComponent
    },

    {
        path: 'biblioteca-sinais',
        component: BibliotecaSinaisComponent
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