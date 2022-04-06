import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Contrato } from '../models/Contrato';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con Ciclos
 */
export class ContratoService {
  constructor(private http: HttpClient, public router: Router) {}

  /**
   * Comprueba si el pago se hizo bien
   * @param id
   * @returns
   */
  crearPago(contrato: Contrato){
    return this.http.post(
      'http://vps-f28e55f8.vps.ovh.net/api/Contrato/crearPago',contrato,{responseType: 'text'}
    );
  }

  /**
   * 
   * @param contrato Crea tu usuario en stripe
   * @returns 
   */
  crearUsuarioStripe(contrato:Contrato){
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Contrato/stripe',contrato);
  }
  
}