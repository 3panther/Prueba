import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Empresa } from '../models/Empresa';
import { Empresa2 } from '../models/Empresa2';

@Injectable({
  providedIn: 'root',
})
/**Esta clase guarda las funciones que se conectan a la api que se relacione
 * con empresa
 */
export class EmpresaService {
  constructor(private http: HttpClient, public router: Router) {}

  /**Esta funcion envia un post de logear a la api */
  login(empresa: any): Observable<Empresa> {
    return this.http.post<Empresa>(
      'http://vps-f28e55f8.vps.ovh.net/api/Empresa/Login',
      empresa
    );
    
  }

  /**Esta función envia un post de registrar a la api */
  registro(empresa: Empresa): Observable<any> {
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Empresa', empresa);
  }

  /**
   * Actualiza los datos de la empresa
   * @param empresa
   * @returns
   */
  actualizarEmpresa(empresa: Empresa2) {
    return this.http.put(
      'http://vps-f28e55f8.vps.ovh.net/api/Empresa/ActualizarEmpresaSinPassword',
      empresa
    );
  }
  /**
   * Trae la empresa que coincida con ese nombre
   * @param n
   * @returns
   */
  getEmpresaNombre(n: string | any) {
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Empresa/GetEmpresaNombre?nombre=' + n
    );
  }

  getEmpresaId(id:number|any){
    return this.http.get(
      'http://vps-f28e55f8.vps.ovh.net/api/Empresa/GetEmpresaId?id=' + id
    );
  }
  /**
   * Envia los datos de la empresa logeada en formato JSON
   * @param empresa
   */
  setUser(empresa: Empresa) {
    localStorage.setItem('empresa', JSON.stringify(empresa));
  }

  /**
   * Recoje los datos de la empresa logeada y los parsea correctamente
   * @returns
   */
  getUser(): Empresa | null {
    let l = localStorage.getItem('empresa');
    if (l != null) {
      return JSON.parse(l);
    }
    return null;
  }

  /**
   * 
   * @param correo Esta funcion envia un correo al email pasado con el codigo para recuperar tu cuenta
   * @returns 
   */
  RestaurarPassword(correo:string){
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Empresa/restaurarPassword?correo='+correo,correo);
  }

  /**
   * Verifica si tu codigo y cuenta coinciden
   * @param correo 
   * @param codigo 
   * @returns 
   */
  ValidarCodigo(correo :string,codigo:number){
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Empresa/VerificationCogigo?correo='+correo+'&codigo='+codigo,codigo);
  }

  /**
   * Cambia la contraseña por una nueva
   * @param correo 
   * @param password 
   * @returns 
   */
  updatePassword(correo:string,password:string){
    return this.http.put('http://vps-f28e55f8.vps.ovh.net/api/Empresa/ActualizarPassword?correo='+correo+'&password='+password,correo)
  }

  /**
   * Envia los datos del correo en formato JSON
   * @param empresa
   */
   setCorreo(correo:string) {
    localStorage.setItem('correo', JSON.stringify(correo));
  }

  /**
   * Recoje los datos del correo  y los parsea correctamente
   * @returns
   */
  getCorreo(): string | null {
    let l = localStorage.getItem('correo');
    if (l != null) {
      return JSON.parse(l);
    }
    return null;
  }

  sendEmail(emailDestino:string,emailEmpe:string,asunto:string,descripcion:string,nombreEmpre:string,nombreAlum:string){
    return this.http.post('http://vps-f28e55f8.vps.ovh.net/api/Empresa/ContactarAlumno?emailEmpre='+emailEmpe+'&emailDestino='+emailDestino+'&asunto='+asunto+'&descripcion='+descripcion+'&nombreEmpre='+nombreEmpre+'&nombreAlum='+nombreAlum,asunto);

  }


}
