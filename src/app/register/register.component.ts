import { Empresa2 } from './../models/Empresa2';
import { ContratoService } from './../_services/contrato.service';
import { Empresa } from './../models/Empresa';
import { Provincias } from './../models/Provincia';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProvinciaService } from '../_services/provincia.service';
import { EmpresaService } from '../_services/empresa.service';
import { Contrato } from '../models/Contrato';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  Usurname: string;
  Password: string;
  Password2: string;
  Correo: string;
  Direccion: string;
  Localidad: string;
  provincia2: any;
  Provincia3: Provincias[];
  IdProvincia: number;
  user: Empresa;
  passwordTypeInput = 'password';
  passwordTypeInput2 = 'password';
  empresa: Empresa;
  loading:boolean;
  premium:boolean;
  miContrato:Contrato;
  empresa2:Empresa2;
  url:any;

  constructor(
    public router: Router,
    public services: ProvinciaService,
    public empreService: EmpresaService,
    public contratoService:ContratoService
  ) {}

  ngOnInit(): void {
    /*En esta zona recogemos el getAll de provincias y lo transformamos de
    Objeto a any y de eso a Empresa  */
    this.services
      .traerProvincias()
      .pipe(first())
      .subscribe((provincias) => {
        /*Paso de Objeto a any */
        this.provincia2 = provincias;
        /*Paso de any a Empresa*/
        this.Provincia3 = this.provincia2;
      });
  }

  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === 'text' ? 'password' : 'text';
  }

  togglePasswordMode2() {
    this.passwordTypeInput2 =
      this.passwordTypeInput2 === 'text' ? 'password' : 'text';
  }

  /**
   * Esta función se encarga de recojer los datos de los inputs y enviarlos a la api
   * para registrar a la empresa
   */
  registrar() {
    this.loading=true;
    var idP: number = +this.IdProvincia;
    /**Si ningun campo es nulo sigue */
    if (
      this.Correo != undefined &&
      this.Usurname != undefined &&
      this.Password != undefined &&
      this.Password2 != undefined &&
      this.Localidad != undefined &&
      this.Direccion != undefined
    ) {
      if (this.Password == this.Password2) {
        /*Recojo los dato en un Objeto Empresa*/
        this.user = {
          email: this.Correo,
          nombre: this.Usurname,
          password: this.Password,
          idProvincia: idP,
          localidad: this.Localidad,
          direccion: this.Direccion,
          codigo:0,
          idRols:2,
          stripeIds:''
        };
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
        /*Se envia la empresa a registrar y si devuelve 200 pasas al inicio*/
        this.empreService.registro(this.user).subscribe(
          (usuario) => {
            this.loading=false;
            var u = usuario;
            this.empresa = u;
            this.empresa2=u;
            this.miContrato={
              id:0,
              empresaId:Number.parseInt(this.empresa2.id),
              fechaAlta: new Date,
              fechaBaja:new Date,
              contratoEstadoId:2,
              striped:''
            }

            if(this.premium==true){
            this.contratoService.crearUsuarioStripe(this.miContrato).subscribe((u)=>{
              this.contratoService.crearPago(this.miContrato).pipe(first()).subscribe((u)=>{
                 var u2 =u;
                 this.url=u2;
                 window.close();
                 window.open(this.url);
                 this.router.navigateByUrl('/Login');
              })
              
            })

        
            }
            this.router.navigateByUrl('/Login');
            
          },
          (error) => {
            this.loading=false;
            window.alert('Algun dato no es correcto');
          }
        );
      } else {
        window.alert('Las contraseñas no son iguales');
      }
    } else {
      window.alert('Algun dato esta en blanco');
    }

   
  }
}
