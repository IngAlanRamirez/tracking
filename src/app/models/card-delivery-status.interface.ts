/**
 * Estado de entrega de una tarjeta individual
 */
export interface CardDeliveryStatus {
  trakingStatusCode: number;
  reasonCode: number;
  effDt: string; // Fecha efectiva en formato ISO
}
