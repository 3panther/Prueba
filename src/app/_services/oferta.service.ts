import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Oferta } from '../models/Oferta';
import { Oferta2 } from '../models/Oferta2';
import { Oferta3 } from '../models/Oferta3';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con Ofertas
 */
export class OfertaService {
  constructor(private http: HttpClient, public router: Router) {}

  /**Esta función envia un post de crear oferta a la api */
  crearOferta(oferta: Oferta): Observable<any> {
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Ofertas', oferta);
  }

  /**
   * Trae todas la ofertas
   * @returns
   */
  getAllOfertas() {
    return this.http.get('http://vps-f28e55f8.vps.ovh.net/api/Ofertas/getAllOfertas');
  }

  /**
   * Trae las ofertas que coincidan o se parezcan al nombre introducido
   * @param nombre
   * @returns
   */
  getOfertasNombre(nombre: any) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Ofertas/getOfertasNombre?nombre=' + nombre
    );
  }

   /**
   * Trae la oferta por id
   * @param nombre
   * @returns
   */
    getOferta(id: any) {
      return this.http.get(
        'http://vps-f28e55f8.vps.ovh.net/api/Ofertas/GetOferta?id=' + id
      );
    }

    deleteOferta(id:any){
      return this.http.delete('http://vps-f28e55f8.vps.ovh.net/api/Ofertas/DeleteOferta?id=' + id);
    }

    updateOferta(oferta:Oferta3){
      return this.http.put('http://vps-f28e55f8.vps.ovh.net/api/Ofertas',oferta);
    }

     /**
   * Envia los datos de la empresa logeada en formato JSON
   * @param empresa
   */
  setOfert(oferta: Oferta2) {
    localStorage.setItem('oferta', JSON.stringify(oferta));
  }

  /**
   * Recoje los datos de la empresa logeada y los parsea correctamente
   * @returns
   */
  getOfert(): Oferta2 | null {
    let l = localStorage.getItem('oferta');
    if (l != null) {
      return JSON.parse(l);
    }
    return null;
  }
}
