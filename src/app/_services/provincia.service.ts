import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con provincias
 */
export class ProvinciaService {
  constructor(private http: HttpClient, public router: Router) {}

  /**Esta función hace un get que trae todas las provincias */
  traerProvincias() {
    return this.http.get('http://vps-f28e55f8.vps.ovh.net/api/Otras/getAll');
  }
  /**
   * Trae la provincia que coincida con el id
   * @param id
   * @returns
   */
  traerProvinciaId(id: number) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Otras/getProvinciaId?id=' + id
    );
  }
}
