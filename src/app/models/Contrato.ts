/**
 * Esta interfaz hace referencia a la clase de contrato
 */
 export interface Contrato {
  id: number;
  empresaId: number;
  fechaAlta:Date|null;
  fechaBaja:Date|null;
  contratoEstadoId:number;
  striped:string|null;
}