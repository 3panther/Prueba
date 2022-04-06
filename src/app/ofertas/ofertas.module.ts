import { OfertasCrearComponent } from './ofertas-crear/ofertas-crear.component';
import { OfertasListaComponent } from './ofertas-lista/ofertas-lista.component';
import { OfertasEditComponent } from './ofertas-edit/ofertas-edit.component';
import { NgModule } from '@angular/core';
import { OfertasRoutingModule } from './ofertas.routing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import{MatInputModule} from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

/**
 * Esta clase contiene los imports y declaraciones necesarias para el funcionamiento del componente
 */
@NgModule({
  declarations: [OfertasCrearComponent, OfertasListaComponent,OfertasEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientModule,
    OfertasRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
     MatChipsModule ,
     MatIconModule,
     MatOptionModule,
     MatAutocompleteModule,

  ],
})
export class OfertaModule {}
