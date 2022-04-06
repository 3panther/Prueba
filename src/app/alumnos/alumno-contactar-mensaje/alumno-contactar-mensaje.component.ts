import { Mensaje } from '../../models/Mensaje';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/Alumnos';
import { Empresa } from 'src/app/models/Empresa';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { MensajeService } from 'src/app/_services/mensaje.service';


@Component({
  selector: 'app-alumno-contactar-mensaje',
  templateUrl: './alumno-contactar-mensaje.component.html',
  styleUrls: ['./alumno-contactar-mensaje.component.css']
})
export class AlumnoContactarMensajeComponent implements OnInit {
  Asunto:string;
  Descripcion:string;
  correoEmpre:string;
  correoAlumno:string;
  empre:Empresa|any;
  nombreEmpre:string;
  nombreAlum:string;
  alumno:Alumno;
  loading:boolean;
  mensaje:Mensaje;
  alumnoId:number;
  constructor(private empresaService: EmpresaService,private routerService:ActivatedRoute,private router:Router,private mensajeService:MensajeService) { }

  ngOnInit(): void {
    this.loading=true;
    this.empre=this.empresaService.getUser();
    this.correoEmpre=this.empre.email;
    this.nombreEmpre=this.empre.nombre;
    this.routerService.queryParams.subscribe((params) => {
      this.nombreAlum = params.alumnoN;
      this.correoAlumno=params.alumnoC;
      this.alumnoId=params.alumnoId;
    }
  );
  this.loading=false;
  }

  send(){
    this.mensaje= {empresaId:this.empre.id,alumnoId: parseInt(this.alumnoId.toString()),contenido:this.Descripcion+' '+'nuestro correo es'+' '+this.correoAlumno,leido:false};
    this.loading=true;
    if(this.correoAlumno!=null&&this.correoEmpre!=null&&this.Descripcion!=null&&this.nombreAlum!=null&&this.nombreEmpre!=null){
      

      this.mensajeService.CrearMensaje(this.mensaje).subscribe((e)=>{
        this.loading=false;
        window.alert("mensaje enviado con exito");
        this.router.navigateByUrl('inicio');
      })
    }else{
      this.loading=false;
      window.alert("Error en algun lado")
    }
    
  }

 

}


