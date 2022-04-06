import { AlumnosComponent } from './../alumnos/alumnos.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil.component';
import { InicioComponent } from './inicio.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AlumnosAcptadosComponent } from '../alumnos/alumnos-acptados/alumnos-acptados.component';
import { AlumnoContactarComponent } from '../alumnos/alumno-contactar/alumno-contactar.component';
import{AlumnosTodosComponent} from '../alumnos/alumnos-todos/alumnos-todos.component';
import{AlumnoContactarMensajeComponent} from '../alumnos/alumno-contactar-mensaje/alumno-contactar-mensaje.component';
/*Esta clase se encarga de crear y guardar las rutas de las otras clases relacionadas con esta */

const IRoutes = [
  {
    path: '',
    component: InicioComponent,

    children: [
      { path: 'perfil', component: PerfilComponent },
      {
        path: 'ofertas',
        loadChildren: () =>
          import('../ofertas/ofertas.module').then((x) => x.OfertaModule),
      },
      { path: 'alumno', component: AlumnosComponent },
      {path:'alumnoacptado',component:AlumnosAcptadosComponent,  pathMatch: 'full'},
      {path:'alumnocontacto',component:AlumnoContactarComponent,  pathMatch: 'full'},
      {path:'alumnoall',component:AlumnosTodosComponent, pathMatch: 'full'},
      {path:'alumnocontactomensaje',component:AlumnoContactarMensajeComponent,pathMatch: 'full'}
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
];

export const InicioRoutingModule = RouterModule.forChild(IRoutes);
