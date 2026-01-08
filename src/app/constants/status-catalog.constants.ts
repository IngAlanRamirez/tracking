import { Stepper } from '../models/stepper.interface';

/**
 * Catálogo completo de estados del sistema de tracking
 */
export const STATUS_CATALOG: Stepper[] = [
  {
    idTrakingStatusCode: 2,
    deliveryDate: '',
    icon: 'card-outline',
    status: 'PENDING',
    title: 'Estamos preparando tu tarjeta',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 6,
    deliveryDate: '',
    icon: 'send-outline',
    status: 'PENDING',
    title: 'Enviamos la tarjeta a tu domicilio',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 16,
    deliveryDate: '',
    icon: 'close-circle-outline',
    status: 'PENDING',
    title: 'Intento de entrega sin éxito',
    description: 'Se realizará otro intento de entrega en los siguientes días',
    reasonCode: [10, 11, 12, 13]
  },
  {
    idTrakingStatusCode: 9,
    deliveryDate: '',
    icon: 'send-outline',
    status: 'PENDING',
    title: 'Enviamos tu tarjeta a la sucursal',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 10,
    deliveryDate: '',
    icon: 'location-outline',
    status: 'PENDING',
    title: 'Entregamos tu tarjeta en la sucursal',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 8,
    deliveryDate: '',
    icon: 'home-outline',
    status: 'PENDING',
    title: 'Entregamos la tarjeta en tu domicilio',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 22,
    deliveryDate: '',
    icon: 'close-circle-outline',
    status: 'PENDING',
    title: 'No se recogió la tarjeta en la sucursal',
    reasonCode: [1]
  },
  {
    idTrakingStatusCode: 26,
    deliveryDate: '',
    icon: 'close-circle-outline',
    status: 'PENDING',
    title: 'No se recogió la tarjeta en la sucursal',
    reasonCode: [1]
  }
];

/**
 * Códigos de razón válidos
 */
export const REASON_CODES = [0, 1];

/**
 * Pasos válidos para entrega a domicilio
 */
export const HOME_DELIVERY_STEPS = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 6, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];

/**
 * Pasos válidos para entrega en sucursal
 */
export const BRANCH_DELIVERY_STEPS = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 9, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 10, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];

/**
 * Pasos válidos para entrega de rescate
 */
export const RESCUE_DELIVERY_STEPS = [
  { trakingStatusCode: 2, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 6, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 9, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 0, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 10, reasonCode: [...REASON_CODES] },
  { trakingStatusCode: 8, reasonCode: [...REASON_CODES] }
];
