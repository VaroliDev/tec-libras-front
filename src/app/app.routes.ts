import { Routes } from '@angular/router';
import { CadastroComponent } from './tec-libras-client/cadastro/cadastro.component';
import { LoginComponent } from './tec-libras-client/login/login.component';
import { InicioComponent } from './tec-libras-client/inicio/inicio.component';
import { IntroducaoComponent } from './tec-libras-client/introducao/introducao.component';
import { BibliotecaSinaisComponent } from './tec-libras-client/biblioteca-sinais/biblioteca-sinais.component';
import { SobreNosComponent } from './tec-libras-client/sobre-nos/sobre-nos.component';
import { ListaUsuariosComponent } from './tec-libras-admin/lista-usuarios/lista-usuarios.component';
import { ContaComponent } from './tec-libras-client/conta/conta.component';
import { ComunidadeComponent } from './tec-libras-client/comunidade/comunidade.component';
import { LevelThemesComponent } from './tec-libras-client/level-themes-subjects/level-themes/level-themes.component';
import { CadastroDeConteudoComponent } from './tec-libras-admin/cadastro-de-conteudo/cadastro-de-conteudo.component';
import { ThemesComponent } from './tec-libras-client/level-themes-subjects/themes/themes.component';
import { AulaTeoricaComponent } from './tec-libras-client/level-themes-subjects/aula-teorica/aula-teorica.component';
import { AulaPraticaComponent } from './tec-libras-client/aula-pratica/aula-pratica.component';
import { DemonstracoesComponent } from './tec-libras-client/level-themes-subjects/demonstracoes/demonstracoes.component';
import { QuestionarioComponent } from './tec-libras-client/questionario/questionario.component';
import { CuriosidadesComponent } from './tec-libras-client/level-themes-subjects/curiosidades/curiosidades.component';
import { AdminPageComponent } from './tec-libras-admin/admin-page/admin-page.component';
import { SinalComponent } from './components/sinal/sinal.component';

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
    },
    
    {
        path: 'admin',
        component: AdminPageComponent
    },

    {
        path: 'nivel',
        component: LevelThemesComponent
    },

    {
        path: 'temas',
        component: ThemesComponent
    },

    {
        path: 'aula-teorica',
        component: AulaTeoricaComponent
    },

    {
        path: 'demonstracoes',
        component: DemonstracoesComponent
    },

    {
        path: 'aula-pratica',
        component: AulaPraticaComponent
    },

    {
        path: 'questionario',
        component: QuestionarioComponent
    },

    {
        path: 'curiosidades',
        component: CuriosidadesComponent
    },

    {
        path: 'conteudo',
        component: CadastroDeConteudoComponent
    },
     {
        path: 'sinal',
        component: SinalComponent
    }
   
];