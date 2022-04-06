import { OfertaService } from './../../_services/oferta.service';
import { OfertaCicloService } from './../../_services/ofertaCiclo.service';
import { EmpresaService } from './../../_services/empresa.service';
import { Ciclos } from './../../models/Ciclo';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl} from '@angular/forms';
import { CicloService } from 'src/app/_services/ciclos.service';
import { OfertaCiclo } from 'src/app/models/OfertaCiclo';
import { Oferta } from 'src/app/models/Oferta';
import { Empresa } from 'src/app/models/Empresa';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ofertas-crear',
  templateUrl: './ofertas-crear.component.html',
  styleUrls: ['./ofertas-crear.component.css'],
})
export class OfertasCrearComponent implements OnInit {
  
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  constructor(
    private ciclosServices: CicloService,
    private empresaService: EmpresaService,
    private ofertaCicloService: OfertaCicloService,
    private ofertaService: OfertaService,
    public router: Router
  ) {}
  fechaCreacion: Date;
  fechaFin: Date;
  nombreOferta: string;
  descripcion: string;
  horario: string;
  remuneracion: number;
  ciclos: Ciclos[];
  c: any;
  ciclo: number;
  ciclos2: Ciclos[] = [];
  ofertaCiclo: OfertaCiclo;
  nuevaOferta: Oferta;
  empresa: Empresa | null;
  empresa2: any;
  ciclo2: Ciclos[];
  ciclo3: Ciclos;
  c2: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<Ciclos[]>;
  loading:boolean;
 

  ngOnInit(): void {
    this.loading=true;
    /**Trae todos los ciclos */
    this.ciclosServices.getAllCiclos().subscribe((e) => {
      this.c = e;
      this.ciclos = this.c;

      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: Ciclos | null) => (fruit ? this._filter(fruit) : this.ciclos.slice())),
      );
    });
    /**Regoje los datos de la empresa */
    this.empresa2 = this.empresaService.getUser();
    this.empresa = this.empresaService.getUser();
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

  /**
   * Mete los ciclos que quieres en el array de ciclos de la oferta
   */
  meterCiclo(c: number) {
     if (c != null) {
      /*Coje el ciclo que coincida por la id */
      this.ciclosServices.getCiclo(c).subscribe((e) => {
        this.c = e;
        this.ciclos2.push(this.c);
      
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = event as unknown as Ciclos;

    // Add our fruit
    if (value) {
      this.ciclos2.push(value);
      
    }

    // Clear the input value
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

  return this.ciclos.filter((fruit: Ciclos) => fruit.nombre.toLowerCase().includes(filterValue));
}

  /**
   * Envia un post a la api y si va bien crea la oferta  y ofertaCiclo
   */
  crear() {
    this.loading=true;

    this.fechaCreacion = this.formatDate(this.fechaCreacion);

    this.fechaFin = this.formatDate(this.fechaFin);

    if (
      this.fechaCreacion < this.fechaFin &&
      this.descripcion !== null &&
      this.horario !== null &&
      this.nombreOferta !== null &&
      this.fechaFin !== null &&
      this.fechaCreacion !== null &&
      this.remuneracion !== null && this.remuneracion>=1 &&
      this.ciclos2.length !== 0
    ) {
      this.nuevaOferta = {
        empresaId: this.empresa2.id,
        nombreOferta: this.nombreOferta,
        descripcion: this.descripcion,
        horarios: this.horario,
        remuneracion: this.remuneracion,
        fechaInicio: this.fechaCreacion,
        fechaFinal: this.fechaFin,
      };

      this.ofertaService.crearOferta(this.nuevaOferta).subscribe((e) => {
        window.alert('La oferta a sido creada');
        this.ofertaService
          .getOfertasNombre(this.nombreOferta)
          .subscribe((e) => {
            this.c2 = e;
            this.ciclo2 = this.c2;
            this.ciclo3 = this.ciclo2[0];
           
            this.ciclos2.forEach((e) => {
              this.ofertaCiclo = {
                idOfertas: this.ciclo3.id,
                idCiclos: e.id,
              };
              this.ofertaCicloService
                .crearOfertaCiclo(this.ofertaCiclo)
                .subscribe();
            });
          });
          this.loading=false;
         this.router.navigateByUrl('inicio/ofertas');
      }
      );
    } else {
      this.loading=false;
      window.alert(
        'Las fecha de inicio es mayor a la de fin o algun dato esta en blanco o la remuneracion es menor a 1€'
      );
    }
  }
}
