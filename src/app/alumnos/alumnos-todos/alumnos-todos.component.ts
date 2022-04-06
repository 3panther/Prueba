import { ProvinciaService } from './../../_services/provincia.service';
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
import { Provincias } from 'src/app/models/Provincia';
/**
 * Esta clase guarda la lógica de la lista de candidatos
 */
@Component({
  selector: 'app-alumnos-todos',
  templateUrl: './alumnos-todos.component.html',
  styleUrls: ['./alumnos-todos.component.css'],
})
export class AlumnosTodosComponent implements OnInit {
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
  ciclo4: any;
  ciclo2: Ciclos;
  ciclo3:number;
  ciclos:Ciclos[]=[];
  empresa: any;
  loading:boolean;
  idProvincia:number;
  provincia:any;
  provincias:Provincias[]=[];
  constructor(
    private alumnoService: AlumnoService,
    private inscripcionService: InscripcionService,
    private cicloService: CicloService,
    private empresaService: EmpresaService,
    private ofertaService:OfertaService,
    private services:ProvinciaService,
    private routerService:Router
  ) {}

  ngOnInit(): void {
    this.loading=true;
    /*Recoje los datos de la empresa quese a logeado */
    this.empresa = this.empresaService.getUser();

    this.services
      .traerProvincias()
      .pipe(first())
      .subscribe((provincias2) => {
        /*Paso de Objeto a any */
        this.provincia = provincias2;
        /*Paso de any a Empresa*/
        this.provincias = this.provincia;
      
      });

      this.cicloService.getAllCiclos().subscribe((ciclo)=>{
        this.ciclo4=ciclo;
        this.ciclos=this.ciclo4;
      });
  
     
          this.alumnoService
          .GetAllAlumno()
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

                });

               
            });
            
          });
          

  
          this.loading=false;
     
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

    verAlumnoP() {
      this.alumnos=this.alumno.filter((alumno2:any) => alumno2.idProvincia==this.idProvincia);

    }


    verAlumnoC() {
      this.alumnos=this.alumno.filter((alumno2:any) => alumno2.cicloCursando==this.ciclo3);
      
     
    }

    mensajes(al: Alumno) {
      this.loading=true;
      this.loading=false;
     this.routerService.navigate(['inicio/alumnocontactomensaje'],{queryParams:{alumnoN:al.nombre,alumnoC:al.email,alumnoId:al.id}});
     
   }
}
