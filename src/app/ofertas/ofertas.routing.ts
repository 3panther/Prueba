import { RouterModule, Routes } from '@angular/router';

import { OfertasCrearComponent } from './ofertas-crear/ofertas-crear.component';
import { OfertasEditComponent } from './ofertas-edit/ofertas-edit.component';
import { OfertasListaComponent } from './ofertas-lista/ofertas-lista.component';
/*Esta clase se encarga de crear y guardar las rutas de las otras clases */

const IRoutes = [
  { path: '', component: OfertasListaComponent },
  { path: 'listaOferta', component: OfertasListaComponent },
  { path: 'crearOferta', component: OfertasCrearComponent },
    {path:'editOferta',component:OfertasEditComponent}
];

export const OfertasRoutingModule = RouterModule.forChild(IRoutes);
