import { OfertaService } from 'src/app/_services/oferta.service';
import { AlumnoService } from './../_services/alumno.service';
import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../models/Inscripcion';
import { Alumno } from '../models/Alumnos';
import { InscripcionService } from './../_services/inscripcion.service';
import { first } from 'rxjs/operators';
import { CicloService } from './../_services/ciclos.service';
import { Ciclos } from '../models/Ciclo';
import { EmpresaService } from '../_services/empresa.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Oferta } from '../models/Oferta';
import { Oferta2 } from '../models/Oferta2';
/**
 * Esta clase guarda la lógica de la lista de candidatos
 */
@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
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
  loading:boolean;
  constructor(
    private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cicloService: CicloService,
    private empresaService: EmpresaService,
    private ofertaService:OfertaService
  ) {}

  ngOnInit(): void {
    this.loading=true;
    /*Recoje los datos de la empresa quese a logeado */
    this.empresa = this.empresaService.getUser();
    /*Ahora traemos todas las inscripciones de la empresa */
    this.inscripcionService
      .GetEmpresaInscripcion(this.empresa.id)
      .subscribe((inscripcion) => {
        this.inscripcion = inscripcion;
        this.inscripciones = this.inscripcion;

        this.inscripciones.forEach((e) => {
           
          if(e.estadoInscripcion!==('no seleccionado') &&e.estadoInscripcion!==('seleccionado')){
            this.n.push(e.alumnoId);
          }
          
          this.inscripciones=  this.inscripciones.filter((e3)=>e3.estadoInscripcion!=='no seleccionado');
          

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
      });
    }
  }
    /**
   * Esta funcion borra la inscripcion en la que se encuentra el
   * candidato no deseado de la base de datos
   */
     aceptar(al: Alumno) {
      //al.estadoInscripcion='no seleccionado';
      
        this.inscripciones.forEach((e)=>{
          if(e.alumnoId==al.id && e.ofertasId==al.ofertaId){
            this.inscripcion2=e;
            this.inscripcion2.estadoInscripcion='seleccionado';
          }
        });
      
      let si_no = window.confirm(
        '¿Estas seguro de quere quiere aceptar a ' + al.nombre + '?'
      );
      if (si_no) {
        this.inscripcionService.UpdateInscripcion(this.inscripcion2).subscribe(() => {
          let a = this.alumnos.filter((c) => c.id !== al.id);
          this.alumnos = a;
        });
      }
    }
}
