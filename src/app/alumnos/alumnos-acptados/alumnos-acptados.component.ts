import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Alumno } from 'src/app/models/Alumnos';
import { Ciclos } from 'src/app/models/Ciclo';
import { Inscripcion } from 'src/app/models/Inscripcion';
import { Oferta2 } from 'src/app/models/Oferta2';
import { AlumnoService } from 'src/app/_services/alumno.service';
import { CicloService } from 'src/app/_services/ciclos.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { OfertaService } from 'src/app/_services/oferta.service';


@Component({
  selector: 'app-alumnos-acptados',
  templateUrl: './alumnos-acptados.component.html',
  styleUrls: ['./alumnos-acptados.component.css']
})
export class AlumnosAcptadosComponent implements OnInit {
  inscripciones: Inscripcion[]=[];
  inscripcion: any;
  inscripcion2: Inscripcion;
  alumnos: Alumno[]=[];
  oferta2:any;
  oferta:Oferta2;
  //alumnos2:Alumno[]=[];
  alumno: any;
  n: number[] = [];
  ciclo: any;
  ciclo2: Ciclos;
  empresa: any;
  loading:boolean
  premium:boolean;
  constructor( private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cicloService: CicloService,
    private empresaService: EmpresaService,
    private ofertaService:OfertaService,
    private routerService:Router) { }

  ngOnInit(): void {
    this.loading=true;
    
     /*Recoje los datos de la empresa quese a logeado */
     this.empresa = this.empresaService.getUser();
     if(this.empresa.idRols!=1){
      this.premium=false;
     }else{
      this.premium=true;
     }
     /*Ahora traemos todas las inscripciones de la empresa */
     this.inscripcionService
       .GetEmpresaInscripcion(this.empresa.id)
       .subscribe((inscripcion) => {
         this.inscripcion = inscripcion;
         this.inscripciones = this.inscripcion;
 
         this.inscripciones.forEach((e) => {
            
           if(e.estadoInscripcion==('seleccionado')){
             this.n.push(e.alumnoId);
           }
           
           this.inscripciones=  this.inscripciones.filter((e3)=>e3.estadoInscripcion!=='seleccionado');
           
 
         });
         /*Traemos todos los candidatos de las inscripciones procedentes de la empresa */
         if(this.n.length!=0){
           this.alumnoService
           .GetAllAlumnoId(this.n)
           .pipe(first())
           .subscribe((alumno) => {
             this.alumno = alumno;
 
             this.alumnos = this.alumno;
 
             this.alumnos.forEach((e) => {
               /*Traemos el ciclo que cursa el alumno */
               this.cicloService
                 .getCiclo(e.cicloCursando)
                 .pipe(first())
                 .subscribe((a) => {
                   this.ciclo = a;
                   this.ciclo2 = this.ciclo;
                   e.ciclo = this.ciclo2.nombre;
 
                  
                     this.inscripciones.forEach((e2)=>{
                      
                       
                       if(e2.alumnoId==e.id){
                         this.ofertaService.getOferta(e2.ofertasId).pipe(first())
                         .subscribe((o)=>{
                         
                          this.oferta2=o;
                          this.oferta=this.oferta2;
                          
                          if(e.ofertaInscrito==undefined && this.oferta.empresaId==this.empresa.id){
                           e.ofertaInscrito=this.oferta.nombreOferta;
                           e.ofertaId=this.oferta.id;
                          }else if(this.oferta.empresaId==this.empresa.id){
                          let a = {id:e.id,email: e.email,
                           nombre: e.nombre,
                           apellidos: e.apellidos,
                           idProvincia: e.idProvincia,
                           localidad: e.localidad,
                           ciclo: e.ciclo,
                           cicloCursando: e.cicloCursando,
                           notaMediaGrado: e.notaMediaGrado,
                           ofertaId:this.oferta.id,
                           ofertaInscrito:this.oferta.nombreOferta}
 
                           this.alumnos.push(a);
                          }
                          
                         });
                       }
                     });
                  
                 });
 
                
             });
           });
         
           
           
          
         }
 
         this.loading=false;
       
       });
      
  }

  /**
   * Esta funcion borra la inscripcion en la que se encuentra el
   * candidato no deseado de la base de datos
   */
   borrar(al: Alumno) {
    this.loading=true;
    //al.estadoInscripcion='no seleccionado';
    
      this.inscripciones.forEach((e)=>{
        if(e.alumnoId==al.id && e.ofertasId==al.ofertaId){
          this.inscripcion2=e;
          this.inscripcion2.estadoInscripcion='no seleccionado';
        }
      });
    
    let si_no = window.confirm(
      '¿Estas seguro de quere borra a ' + al.nombre + '?'
    );
    if (si_no) {
      this.inscripcionService.UpdateInscripcion(this.inscripcion2).subscribe(() => {
        let a = this.alumnos.filter((c) => c.id !== al.id);
        this.alumnos = a;
        this.loading=false;
      });
    }
  }
    /**
   * Esta funcion contactar te envia a la pagina de contacto
   * 
   */
     contactar(al: Alumno) {
       this.loading=true;
       this.loading=false;
      this.routerService.navigate(['inicio/alumnocontacto'],{queryParams:{alumnoN:al.nombre,alumnoC:al.email,alumnoId:al.id}});
      
    }

    mensajes(al: Alumno) {
      this.loading=true;
      this.loading=false;
     this.routerService.navigate(['inicio/alumnocontactomensaje'],{queryParams:{alumnoN:al.nombre,alumnoC:al.email,alumnoId:al.id}});
     
   }

}
