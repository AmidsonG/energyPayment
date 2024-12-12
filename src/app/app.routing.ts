import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { CarregamentoEnergiaComponent } from './carregamento-energia/carregamento-energia.component';
import { DebitoDiretctoComponent } from './debito-diretcto/debito-diretcto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
  {
    path: 'home-page',
    component: HomePageComponent
  },
  { path: 'login',          
    component: LoginComponent 
  },
  { path: 'register',          
    component: SignupComponent 
  },
  { path: 'user-profile',     
    component: ProfileComponent 
  },
  {
    path: 'carregamento',
    component: CarregamentoEnergiaComponent
  },
  {
    path:'debito-directo',
    component: DebitoDiretctoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


