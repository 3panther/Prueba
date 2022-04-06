import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Empresa } from '../models/Empresa';
import { EmpresaService } from '../_services/empresa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Email: string;
  Password: string;

  passwordTypeInput = 'password';
  empresa: Empresa;
  loading:boolean;

  constructor(
    public router: Router,
    public services: EmpresaService,
  ) {
    this.Email = '';
    this.Password = '';
  }

  ngOnInit(): void {
    this.loading=false;
  }

  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === 'text' ? 'password' : 'text';
  }
  @HostListener('document:keydown', ['$event'])
  loginEnter($event: KeyboardEvent) {
    
    if ($event.keyCode === 13 && !$event.shiftKey) {
      this.loading=true;
      $event.preventDefault();
      this.empresa = {
        email: '',
        nombre: '',
        password: '',
        idProvincia: 0,
        localidad: '',
        direccion: '',
        codigo:0,
        idRols:0,
        stripeIds:''
      };
      const user = { Email: this.Email, Password: this.Password };
      /*Si la funcion de logear devuelve 200 pasa al inicio, si no manda
    un mensaje de error*/
      this.services.login(user).subscribe((rep:any) => {
        this.loading=false;
        if (rep == null) {
     
          window.alert('No se ha encontrado este usuario');
        } else {
          var u = rep;
          this.empresa = u;
         
          localStorage.setItem('token',rep.token);
          this.services.setUser(this.empresa);
          this.router.navigateByUrl('/inicio');
        }
      });
    }
  }

  /**Esta función envia el usuario a la api y lo logea */
  login() {
    this.loading=true;
    this.empresa = {
      email: '',
      nombre: '',
      password: '',
      idProvincia: 0,
      localidad: '',
      direccion: '',
      codigo:0,
      idRols:0,
      stripeIds:''
    };
    const user = { Email: this.Email, Password: this.Password };
    /*Si la funcion de logear devuelve 200 pasa al inicio, si no manda
  un mensaje de error*/
    this.services.login(user).subscribe((rep:any) => {
      this.loading=false;
  
      
      if (rep == null) {
     
        window.alert('No se ha encontrado este usuario');
      } else {
        var u = rep;
        this.empresa = u;
        
        localStorage.setItem('token',rep.token);
       
        this.services.setUser(this.empresa);
        this.router.navigateByUrl('/inicio');
      }
    });
  }
}
