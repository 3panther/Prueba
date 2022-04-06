/**Esta interfaz hace referencia a la clase empresa */
export interface Empresa {
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
