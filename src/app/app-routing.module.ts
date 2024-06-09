import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroMoradorComponent } from './pages/cadastro-morador/cadastro-morador.component';
import { CadastroPorteirosComponent } from './pages/cadastro-porteiros/cadastro-porteiros.component';
import { CadastroAvisosComponent } from './pages/cadastro-avisos/cadastro-avisos.component';
import { GerenciarMoradorComponent } from './pages/gerenciar-morador/gerenciar-morador.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeMoradorComponent } from './pages/home/home-morador/home-morador.component';
import { MenuMoradorComponent } from './menu-morador/menu-morador.component';


const routes: Routes = [ 
  { path: '', component: LoginComponent}, 
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home-morador', component: HomeMoradorComponent},
  { path: 'cadastro-morador', component: CadastroMoradorComponent},
  { path: 'cadastro-porteiros', component: CadastroPorteirosComponent},
  { path: 'cadastro-avisos', component: CadastroAvisosComponent},
  { path: 'gerenciar-morador', component: GerenciarMoradorComponent},
  { path: 'registro', component: RegistroComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
  { path: 'menu-morador', component: MenuMoradorComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
