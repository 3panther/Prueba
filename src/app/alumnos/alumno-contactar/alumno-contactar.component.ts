import { Mensaje } from './../../models/Mensaje';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/Alumnos';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { MensajeService } from 'src/app/_services/mensaje.service';


@Component({
  selector: 'app-alumno-contactar',
  templateUrl: './alumno-contactar.component.html',
  styleUrls: ['./alumno-contactar.component.css']
})
export class AlumnoContactarComponent implements OnInit {
  Asunto:string;
  Descripcion:string;
  correoEmpre:string;
  correoAlumno:string;
  empre:Empresa|any;
  nombreEmpre:string;
  nombreAlum:string;
  alumno:Alumno;
  loading:boolean;
 
 
  constructor(private empresaService: EmpresaService,private routerService:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.empre=this.empresaService.getUser();
    this.correoEmpre=this.empre.email;
    this.nombreEmpre=this.empre.nombre;
    this.routerService.queryParams.subscribe((params) => {
      this.nombreAlum = params.alumnoN;
      this.correoAlumno=params.alumnoC;

      
    }
  );
  this.loading=false;
  }

  send(){
  
    this.loading=true;
    if(this.correoAlumno!=null&&this.correoEmpre!=null&&this.Descripcion!=null&&this.nombreAlum!=null&&this.nombreEmpre!=null){
       this.empresaService.sendEmail(this.correoAlumno,this.correoEmpre,this.Asunto,this.Descripcion,this.nombreEmpre,this.nombreAlum).subscribe((e)=>{
         this.loading=false;
         window.alert("correo enviado con exito");
         this.router.navigateByUrl('inicio');
       });

    
    }else{
      this.loading=false;
      window.alert("Error en algun lado")
    }
    
  }

}


