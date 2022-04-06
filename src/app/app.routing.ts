import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import{RescupePasswordComponent} from './recuperarPassword/recuperarPas1/rescupe-password.component';
import{RescupePassword2Component} from './recuperarPassword/rescupe-password2/rescupe-password2.component';
import{RescupePassword3Component} from './recuperarPassword/rescupe-password3/rescupe-password3.component';
import { FuncionoComponent } from './paginasPorDefecto/funciono.component';
import { FailComponent } from './paginasPorDefecto/fail.component';



/**Esta clase se encarga de crear y guardar las rutas de las otras clases */
const appRoutes = [
  { path: 'Login', component: LoginComponent,  pathMatch: 'full'},
  { path: '', component:  LoginComponent,  pathMatch: 'full'},
  { path: 'Registrar', component: RegisterComponent,  pathMatch: 'full'},
  {path:'recuPas1',component: RescupePasswordComponent,  pathMatch: 'full'},
  {path:'recuPas2',component:RescupePassword2Component,  pathMatch: 'full'},
  {path:'recuPas3',component:RescupePassword3Component,  pathMatch: 'full'},
  {path:'funciono',component:FuncionoComponent,  pathMatch: 'full'},
  {path:'fail',component:FailComponent,  pathMatch: 'full'},
  { path: 'inicio',loadChildren: () =>
  import('./inicio/Inicio.module').then((x) => x.InicioModule)},
 
  
  
];

export const routing = RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'});