/**
 * Esta interfaz hace referencia a la clase de alumno
 */
export interface Alumno {
  id: number;
  email: string;
  nombre: string;
  apellidos: string;
  idProvincia: number;
  localidad: string;
  ciclo: string;
  cicloCursando: number;
  notaMediaGrado: number;
  ofertaId:number;
  ofertaInscrito:string;
}
