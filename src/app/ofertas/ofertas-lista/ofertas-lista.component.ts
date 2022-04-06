import { OfertaCicloService } from './../../_services/ofertaCiclo.service';
import { EmpresaService } from './../../_services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Oferta } from 'src/app/models/Oferta';
import { OfertaService } from 'src/app/_services/oferta.service';
import { Ciclos } from 'src/app/models/Ciclo';
import { OfertaCiclo } from 'src/app/models/OfertaCiclo';
import { CicloService } from 'src/app/_services/ciclos.service';
import { Oferta2 } from 'src/app/models/Oferta2';
import { OfertaCiclo2 } from 'src/app/models/OfertaCiclo2';

@Component({
  selector: 'app-ofertas-lista',
  templateUrl: './ofertas-lista.component.html',
  styleUrls: ['./ofertas-lista.component.css'],
})
export class OfertasListaComponent implements OnInit {
  ofertas: Oferta[];
  ofertas2: Oferta[] = [];
  oferta: any;
  empresa: any;
  ciclos: Ciclos[];
  ciclos2: Ciclos;
  ciclo: string;
  ofertaCiclo: OfertaCiclo[] = [];
  ofertaCiclo2: OfertaCiclo;
  ofertaCiclo22: OfertaCiclo2[] = [];
  ofertaCiclo3: any;
  ofertas3: Oferta2[];
  ofertas4: Oferta2[] = [];
  ofertas5: any;
  loading:boolean;
  constructor(
    private ofertaService: OfertaService,
    private empresaService: EmpresaService,
    private ofertaCicloService: OfertaCicloService,
    private cicloService: CicloService
  ) {}

  ngOnInit(): void {
    this.loading=true;
    /**
     * Recojemos los datos de la empresa
     */
    this.empresa = this.empresaService.getUser();

    /**Recojemos todas las ofertas y cojemos las que coincidan con el id de la empresa */
    this.ofertaService
      .getAllOfertas()
      .pipe(first())
      .subscribe((oferta) => {
        this.oferta = oferta;
        this.ofertas3 = this.oferta;
        this.ofertas = this.oferta;

        this.ofertas.forEach((e) => {
          if (e.empresaId === this.empresa.id) {
            this.ofertas2.push(e);
          }
        });

        this.ofertas3.forEach((e) => {
          if (e.empresaId === this.empresa.id) {
            this.ofertaCicloService.getAllOfertaCiclo().subscribe((a) => {
              this.ofertaCiclo3 = a;
              this.ofertaCiclo = this.ofertaCiclo3;
              this.ofertaCiclo22 = this.ofertaCiclo3;
              this.ofertaCiclo22.forEach((element: OfertaCiclo2) => {
                if (e.id === element.idOfertas) {
                  this.cicloService
                    .getCiclo(element.idCiclos)
                    .subscribe((z) => {
                      this.ofertas5 = z;
                      if (e.ciclos === undefined) {
                        e.ciclos = this.ofertas5.nombre;
                      } else {
                        e.ciclos += ',' + this.ofertas5.nombre;
                      }

                      
                    });
                }
              });
            });

            this.ofertas4.push(e);
          }
        });
      });
      this.loading=false;
  }

  borrarOferta(oferta: Oferta2) {
    
   
    let si_no = window.confirm(
      '¿Estas seguro de quere borra a ' + oferta.nombreOferta + '?'
    );

    if (si_no) {
      this.loading=true;
      this.ofertaCicloService.getAllOfertaCiclo().subscribe((a) => {
        this.ofertaCiclo3 = a;
        this.ofertaCiclo22 = this.ofertaCiclo3;

        this.ofertaCiclo22.forEach((e) => {
          if ((e.idOfertas == oferta.id)) {
            

            this.ofertaCicloService.deleteOfertaCiclo(e.id).subscribe(() => {
              
            });
          }
        });

        this.ofertaService.deleteOferta(oferta.id).subscribe(() => {
          let of = this.ofertas4.filter(function(o) {
             return o.nombreOferta !== oferta.nombreOferta; 
             
         });
         this.loading=false;
         this.ofertas4=of;
           window.alert('La oferta a sido borrada');
         });
       
      });
      this.loading=false;
    }
    
  }

  edit(oferta:Oferta2){
    this.ofertaService.setOfert(oferta);
  }
}
