import { DeliveryType } from './delivery-type.enum';

/**
 * Estado de un paso en el stepper
 */
export type StepperStatus = 'PENDING' | 'IN_PROGRESS' | 'SUCCESS' | 'CANCEL';

/**
 * Interfaz que representa un paso en el stepper de tracking
 */
export interface Stepper {
  idTrakingStatusCode: number;
  title: string;
  status: StepperStatus;
  icon: string;
  deliveryDate?: string;
  branchName?: string;
  description?: string;
  deliveryType?: DeliveryType;
  reasonCode: number[];
}
