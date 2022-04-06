/**
 * Esta interfaz hace referencia a la clase de Oferta
 */
export interface Oferta {
  
  empresaId: number;
  nombreOferta: string;
  descripcion: string;
  horarios: string;
  remuneracion: number;
  fechaInicio: Date;
  fechaFinal: Date;
}
