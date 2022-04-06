import { Component, OnInit } from '@angular/core';
import { Empresa } from '../models/Empresa';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { EmpresaService } from './../_services/empresa.service';
import { ContratoService } from '../_services/contrato.service';
import { Contrato } from '../models/Contrato';
import { first } from 'rxjs/internal/operators/first';
/**
 * En esta clase se encuentra la logica de la pantalla de inicio
 */
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  opened = false;
  Nombre: String;
  emp: Empresa;
  emp2: any;
  premium:boolean;
  miContrato:Contrato;
  url:any;
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private empresaService: EmpresaService,
    public contratoService:ContratoService
  ) {}

  ngOnInit(): void {
    /*Recojemos los datos del usuario que se ha logeado */
    this.emp2 = this.empresaService.getUser();
    this.Nombre = this.emp2.nombre;
    if(this.emp2.idRols!=1){
      this.premium=false;
     }else{
      this.premium=true;
     }

  }

  borrarStorage(){
    localStorage.clear();
    this.router.navigateByUrl("Login");
  }

  serPremium(){
    this.miContrato={
      id:0,
      empresaId:Number.parseInt(this.emp2.id),
      fechaAlta: new Date,
      fechaBaja:new Date,
      contratoEstadoId:2,
      striped:''
    }
   
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
}
