import { Provincias } from './../models/Provincia';
import { EmpresaService } from './../_services/empresa.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Empresa } from '../models/Empresa';
import { ProvinciaService } from '../_services/provincia.service';
import { first } from 'rxjs/operators';
import { Empresa2 } from '../models/Empresa2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  Usurname: string | any;
  Nombre: String | any;
  Perfil: String | any;
  Correo: String | any;
  Direccion: string | any;
  Localidad: string | any;
  TypeInput = true;
  emp: Empresa | null;
  emp2: any;
  em: Empresa2|any;
  idP: any;
  Provincia: Provincias;
  p: any;
  Provincias: Provincias[];
  idProvincia: number|any;
  codigo:number|null|any;
  idRols:number|any;
  stripeIds:string|any;

  pn: string | null;
  idE: number;
  id: any;
  password: string | any;
  empresa: Empresa;
  loading:boolean;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private empresaServive: EmpresaService,
    private provinciaService: ProvinciaService
  ) {}

  ngOnInit(): void {
    this.loading=true;
    /*Recoje los datos de la empresa */
    this.emp = this.empresaServive.getUser();
    this.em=this.empresaServive.getUser();
   
    if (this.empresaServive.getUser() === null) {
    } else {
      /*Muesta los datos actuales de la empresa menos la contraseña */
      this.id=this.em?.id;
      this.Nombre = this.emp?.nombre;
      this.Correo = this.emp?.email;
      this.Direccion = this.emp?.direccion;
      this.Localidad = this.emp?.localidad;
      this.idProvincia = this.emp?.idProvincia;
      this.codigo=this.emp?.codigo;
      this.idRols=this.emp?.idRols;
      this.stripeIds=this.emp?.stripeIds;


      this.password = this.emp?.password;
      this.provinciaService.traerProvinciaId(this.idProvincia).subscribe((c) => {
        this.p = c;
        this.Provincia = this.p;
        this.pn = this.Provincia.nombre;
      });

      this.provinciaService
        .traerProvincias()
        .pipe(first())
        .subscribe((c) => {
          this.p = c;
          this.Provincias = this.p;
        });

    }
    this.loading=false;
  }
  /**
   * Esta funcion te permite cambiar de no editable a editable
   */
  togglePasswordMode() {
    this.TypeInput = this.TypeInput === false ? true : false;
  }

  /**
   * Envia un put a la api para actualizar los datos de la empresa
   */
  updateEmpresa() {
    this.loading=true;
    let n3 = 0;
    if (this.TypeInput == false) {
      if (this.idProvincia !== undefined) {
        let n = this.idProvincia.toString();
        let n2 = n.replace('"', '');
        n3 = parseInt(n2);
      } else {
        n3 = this.idP;
      }
      this.empresaServive.getEmpresaId(this.id).pipe(first()).subscribe((e)=>{
        
        this.p=e;
        this.password=this.p.password;
        
        this.em = {
          id: this.id,
          email: this.Correo,
          nombre: this.Nombre,
          password: this.password,
          idProvincia: n3,
          localidad: this.Localidad,
          direccion: this.Direccion,
          codigo:this.codigo,
          idRols:this.idRols,
          stripeIds:this.stripeIds
        };
        
  
        this.empresaServive.actualizarEmpresa(this.em).subscribe(
          (res) => {
            this.loading=false;
            
            window.confirm("Perfil Actualizado");
            this.empresaServive.setUser(this.em);
          },
          (err) => {

          }
        );
      });
     

      this.empresa = {
        email: this.em.email,
        nombre: this.em.nombre,
        password: this.em.password,
        idProvincia: n3,
        localidad: this.em.localidad,
        direccion: this.em.direccion,
        codigo:this.em.codigo,
        idRols:this.em.idRols,
        stripeIds:this.em.stripeIds
      };
     
    } else {
      window.alert('Tine que pulsar editar para poder actualizar tu perfil');
    }
  }
}
