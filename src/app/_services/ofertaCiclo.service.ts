import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OfertaCiclo } from '../models/OfertaCiclo';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con OfertaCiclo
 */
export class OfertaCicloService {
  constructor(private http: HttpClient, public router: Router) {}

  /**Esta función envia un post de crear oferta a la api */
  crearOfertaCiclo(oferta: OfertaCiclo): Observable<any> {
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/OfertasCiclos', oferta);
  }
  /**
   * Trae la ofertaCiclo que coincida con el id
   * @param id
   * @returns
   */
  getOfertaCiclo(id: any) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/OfertasCiclos/GetOfertasCiclos?id=' + id
    );
  }

  /**
   * Trae todas las ofertasCiclos
   * @returns
   */
  getAllOfertaCiclo() {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/OfertasCiclos/GetAllOfertasCiclos'
    );
  }

  deleteOfertaCiclo(id:any){
    return this.http.delete('http://vps-f28e55f8.vps.ovh.net/api/OfertasCiclos/DeleteOfertaCiclos?id='+id);
  }
}
