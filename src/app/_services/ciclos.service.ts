import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con Ciclos
 */
export class CicloService {
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Trae el ciclo que coincida con el id enviado
   * @param id
   * @returns
   */
  getCiclo(id: number) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Otras/getCiclosId?id=' + id
    );
  }
  /**
   * Trae todos los ciclos
   * @returns
   */
  getAllCiclos() {
    return this.http.get('http://vps-f28e55f8.vps.ovh.net/api/Otras/getAllCiclos');
  }
}
