import { Router } from '@angular/router';
import { OfertaCiclo } from './../../models/OfertaCiclo';
import { Oferta2 } from './../../models/Oferta2';
import { Oferta } from './../../models/Oferta';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { first, map, startWith } from 'rxjs/operators';
import { CicloService } from 'src/app/_services/ciclos.service';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { OfertaService } from 'src/app/_services/oferta.service';
import { OfertaCicloService } from 'src/app/_services/ofertaCiclo.service';
import { Ciclos } from 'src/app/models/Ciclo';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { OfertaCiclo2 } from 'src/app/models/OfertaCiclo2';
import { Oferta3 } from 'src/app/models/Oferta3';

@Component({
  selector: 'app-ofertas-edit',
  templateUrl: './ofertas-edit.component.html',
  styleUrls: ['./ofertas-edit.component.css']
})
export class OfertasEditComponent implements OnInit {
  idOferta: number;
  oferta: any;
  ofertas: Oferta2|any;
  fechaCreacion: Date|any;
  fechaFin: Date|any;
  nombreOferta: string|any;
  descripcion: string|any;
  horario: string|any;
  remuneracion: number|any;
  ciclos: string|any;
  ciclos2:Ciclos[]=[];
  ciclosP:Ciclos[]=[];
  ciclosConfirm:Ciclos[]=[];
  ciclo:Ciclos;
  ofertaCiclos:OfertaCiclo2[]=[];
  ofertaCiclos2:OfertaCiclo2;
  CiclosRemove:Ciclos[]=[];
  CicloCreate:Ciclos[]=[];
  ofertaCicloCreate2:OfertaCiclo;
  id:number;
  c:any;
  i:number;
  ofretaNueva:Oferta3;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<Ciclos[]>;
  loading:boolean;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  constructor(private ofertaService: OfertaService,
    private empresaService: EmpresaService,
    private ofertaCicloService: OfertaCicloService,
    private cicloService: CicloService,
    private router:Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.ofertas=this.ofertaService.getOfert();
    this.id=this.ofertas.id;
    this.cicloService.getAllCiclos().pipe(first()).subscribe((e)=>{
      this.c=e;
      this.ciclosP=this.c;
    
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: Ciclos | null) => (fruit ? this._filter(fruit) : this.ciclosP.slice())),
      );
      
      this.filteredFruits.forEach((e)=>{
       
      })
    });
  this.ofertaCicloService.getAllOfertaCiclo().subscribe((e)=>{
    this.c=e;
    this.ofertaCiclos=this.c;
    this.ofertaCiclos.forEach((oc)=>{
      
      if(oc.idOfertas==this.id){
        this.cicloService.getCiclo(oc.idCiclos).subscribe((ciclo)=>{
          this.c=ciclo;
          this.ciclo=this.c;
          this.ciclos2.push(this.ciclo);
         
        })
      }
    })
  });

      
     
     
      this.nombreOferta=this.ofertas?.nombreOferta;
      this.remuneracion=this.ofertas?.remuneracion;
      this.fechaFin=this.ofertas?.fechaFinal;
    
      this.fechaCreacion=this.ofertas?.fechaInicio;
      this.horario=this.ofertas?.horarios;
      this.descripcion=this.ofertas?.descripcion;
      this.ciclos=this.ofertas?.ciclos;
      
      this.loading=false;
    
  }

    /**Formatea la fecha a la que queremos */
    formatDate(date: Date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
  
      return new Date([year, month, day].join('-'));
    }
    add(event: MatChipInputEvent): void {
      const value = event as unknown as Ciclos;
  
      if (value) {
        this.ciclos2.push(value);
        
      }

      event.chipInput!.clear();
  
      this.fruitCtrl.setValue(null);
    }
  
    remove(fruit: Ciclos): void {
      const index = this.ciclos2.indexOf(fruit);
  
      if (index >= 0) {
        this.ciclos2.splice(index, 1);
      }
    }
  
    
  selected(event: MatAutocompleteSelectedEvent): void {
    this.ciclos2.push(event.option.value as unknown as Ciclos);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: Ciclos): Ciclos[] {
    const filterValue = value.nombre;

    return this.ciclosP.filter((fruit: Ciclos) => fruit.nombre.toLowerCase().includes(filterValue));
  }

    crear(){
      this.loading=true;
      this.ciclos2.forEach((c)=>{
        this.CicloCreate.push(c);
      })
      this.ofertaCiclos2={
        id:0,
        idOfertas:0,
        idCiclos:0
      };
     
      this.ofertaCicloService.getAllOfertaCiclo().subscribe((e)=>{
        this.c=e;
        this.ofertaCiclos=this.c;
  
        this.ofertaCiclos.forEach((oc)=>{
          
        if(oc.idOfertas==this.id){
          this.ofertaCicloService.deleteOfertaCiclo(oc.id).subscribe();
        }
        })

       
       
         
     
        this.ciclos2.forEach((c)=>{
        
          const ciclo={
            idOfertas:this.id,
            idCiclos:c.id
          };
          this.ofertaCicloCreate2=ciclo;
       
          this.ofertaCicloService.crearOfertaCiclo(this.ofertaCicloCreate2).subscribe();

        })
        
     
      
   
       
           const ofertaUp={
            id:this.id,
            empresaId:this.ofertas.empresaId,
            nombreOferta:this.nombreOferta,
            descripcion:this.descripcion,
            horarios:this.horario,
            remuneracion:this.remuneracion,
            fechaInicio:this.fechaCreacion,
            fechaFinal:this.fechaFin
           }
              
              this.ofretaNueva=ofertaUp;
          
              this.ofertaService.updateOferta(this.ofretaNueva).subscribe(
                (res) => {
                  this.loading=false;
              
               window.confirm("Oferta Actualizada");
               this.router.navigateByUrl('inicio/ofertas')
             },
             (err) => {
              this.loading=false;
               
             });
          })
          
    
        }

}
