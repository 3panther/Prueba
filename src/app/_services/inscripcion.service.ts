import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Inscripcion } from '../models/Inscripcion';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con Inscripciones
 */
export class InscripcionService {
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Trae todas las inscripciones
   * @returns
   */
  GetAllInscripcion() {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Inscripcion/GetAllInscripcion'
    );
  }

  /**
   * Trae todas las inscripciones que pertenezcan al id de la empresa puesta
   * @param id
   * @returns
   */
  GetEmpresaInscripcion(id: any) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Inscripcion/GetEmpresaInscripcion?id=' + id
    );
  }

  /**
   * Borra la inscripcion que coincida con el id
   * @param id
   * @returns
   */
  DeleteInscripcion(id: number) {
    return this.http.delete(
      'http://vps-f28e55f8.vps.ovh.net/api/Inscripcion/DeleteInscripcionIdAlumno?id=' + id
    );
  }
  /**
   * Actualiza una inscripcion
   * @param inscrip 
   * @returns 
   */
  UpdateInscripcion(inscrip:Inscripcion){
    return this.http.put('http://vps-f28e55f8.vps.ovh.net/api/Inscripcion',inscrip);
  }
}
