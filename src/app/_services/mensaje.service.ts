import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Mensaje } from '../models/Mensaje';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con alumnos
 */
export class MensajeService {
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Crea un mensaje
   * @returns
   */
  CrearMensaje(mensaje:Mensaje) {
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Mensaje',mensaje);
  }
 

  
}