import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import{MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OfertasComponent } from './ofertas/ofertas.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RescupePasswordComponent } from './recuperarPassword/recuperarPas1/rescupe-password.component';
import { RescupePassword2Component } from './recuperarPassword/rescupe-password2/rescupe-password2.component';
import { RescupePassword3Component } from './recuperarPassword/rescupe-password3/rescupe-password3.component';
import { AlumnosAcptadosComponent } from './alumnos/alumnos-acptados/alumnos-acptados.component';
import { AlumnoContactarComponent } from './alumnos/alumno-contactar/alumno-contactar.component';
import{AlumnoContactarMensajeComponent} from './alumnos/alumno-contactar-mensaje/alumno-contactar-mensaje.component';
import{AlumnosTodosComponent} from './alumnos/alumnos-todos/alumnos-todos.component';
import { FuncionoComponent } from './paginasPorDefecto/funciono.component';
import { FailComponent } from './paginasPorDefecto/fail.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent,
    OfertasComponent,
    AlumnosComponent,
    RescupePasswordComponent,
    RescupePassword2Component,
    RescupePassword3Component,
    AlumnosAcptadosComponent,
    AlumnoContactarComponent,
    AlumnoContactarMensajeComponent,
    AlumnosTodosComponent,
    FuncionoComponent,
    FailComponent,
    
  
    
   
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSlideToggleModule,
  
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
    multi: true,
   
   },
   {
    provide: LocationStrategy, 
    useClass: HashLocationStrategy
   }
   
],
  bootstrap: [AppComponent],
})
export class AppModule {}
