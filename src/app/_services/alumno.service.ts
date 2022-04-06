import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con alumnos
 */
export class AlumnoService {
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Trae todos los alumnos
   * @returns
   */
  GetAllAlumno() {
    return this.http.get('http://vps-f28e55f8.vps.ovh.net/api/Alumno/GetAllAlumno');
  }
  /**
   * Trae todos una lista de alumnos que coincidan con los id enviados
   * @param id
   * @returns
   */
  GetAllAlumnoId(id: any) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Alumno/GetAllAlumnoId?i2=' + id
    );
  }

  
}
