/**
 * Esta interfaz hace referencia a la clase de Oferta pero con id
 */
export interface Oferta2 {
  id: number;
  empresaId: number;
  nombreOferta: string;
  descripcion: string;
  horarios: string;
  remuneracion: number;
  fechaInicio: Date;
  fechaFinal: Date;
  ciclos: string;
 
}
