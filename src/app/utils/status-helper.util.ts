import { StepperStatus } from '../models/stepper.interface';
import { DeliveryType } from '../models/delivery-type.enum';

/**
 * Utilidades para trabajar con estados del stepper
 */
export class StatusHelper {
  /**
   * Obtiene la etiqueta legible de un estado
   */
  static getStatusLabel(status: StepperStatus): string {
    const labels: Record<StepperStatus, string> = {
      PENDING: 'Pendiente',
      IN_PROGRESS: 'En Progreso',
      SUCCESS: 'Completado',
      CANCEL: 'Cancelado'
    };
    return labels[status] || status;
  }

  /**
   * Obtiene el color asociado a un estado
   */
  static getStatusColor(status: StepperStatus): string {
    const colors: Record<StepperStatus, string> = {
      PENDING: '#D3D3D3',      // Gris
      IN_PROGRESS: '#000000',   // Negro
      SUCCESS: '#00A859',       // Verde (éxito)
      CANCEL: '#EC0000'         // Rojo (cancelación)
    };
    return colors[status] || '#000000';
  }

  /**
   * Obtiene la etiqueta legible de un tipo de entrega
   */
  static getDeliveryTypeLabel(type: DeliveryType): string {
    const labels: Record<DeliveryType, string> = {
      HOME_DELIVERY: 'Entrega a Domicilio',
      BRANCH_DELIVERY: 'Entrega en Sucursal',
      RESCUE_DELIVERY: 'Entrega de Rescate',
      UNKNOWN: 'Tipo Desconocido'
    };
    return labels[type] || type;
  }
}
