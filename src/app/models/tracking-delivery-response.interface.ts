import { CardDeliveryStatus } from './card-delivery-status.interface';
import { BranchDeliveryInfo } from './branch-delivery-info.interface';

/**
 * Respuesta completa del servicio de tracking
 */
export interface TrackingDeliveryResponse {
  fiData?: BranchDeliveryInfo;
  env: boolean;
  fullName: string;
  cardNumLastDig: string;
  cardOrderStatus: CardDeliveryStatus[];
}
