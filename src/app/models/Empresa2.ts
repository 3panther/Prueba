/**
 * Esta interfaz hace referencia a la clase de empresa pero tiene id
 */
export interface Empresa2 {
  id: number | any;
  email: string;
  nombre: string;
  password: string;
  idProvincia: number;
  localidad: string;
  direccion: string;
  codigo:number|null;
  idRols:number;
  stripeIds:string;
}
