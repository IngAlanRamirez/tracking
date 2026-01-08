import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TrackingService } from './tracking.service';
import { TrackingDeliveryResponse } from '../models/tracking-delivery-response.interface';
import { DeliveryType } from '../models/delivery-type.enum';
import { CardDeliveryStatus } from '../models/card-delivery-status.interface';
import { Stepper, StepperStatus } from '../models/stepper.interface';
import {
  STATUS_CATALOG,
  HOME_DELIVERY_STEPS,
  BRANCH_DELIVERY_STEPS,
  RESCUE_DELIVERY_STEPS
} from '../constants/status-catalog.constants';
import { BranchDeliveryInfo } from '../models/branch-delivery-info.interface';

/**
 * Servicio facade que contiene la lógica de negocio
 * para procesar y transformar los datos de tracking
 */
@Injectable({
  providedIn: 'root'
})
export class TrackingFacadeService {
  constructor(private trackingService: TrackingService) {}

  /**
   * Obtiene la respuesta de tracking y la procesa
   */
  getTrackingResponse(): Observable<Stepper[]> {
    return this.trackingService.getTrackingInfo().pipe(
      map(response => this.getDeliveryType(response))
    );
  }

  /**
   * Determina si es entrega a domicilio
   */
  isHomeDelivery(response: TrackingDeliveryResponse): boolean {
    return (
      [undefined, null, ''].includes(response.fiData?.branchIdent) &&
      response.cardOrderStatus.length > 0
    );
  }

  /**
   * Determina si es entrega en sucursal
   */
  isBranchDelivery(response: TrackingDeliveryResponse): boolean {
    return (
      ![undefined, null, ''].includes(response.fiData?.branchIdent) &&
      ![undefined, null, ''].includes(response.fiData?.branchName)
    );
  }

  /**
   * Determina si es entrega de rescate
   */
  isRescueDelivery(response: TrackingDeliveryResponse): boolean {
    return response.cardOrderStatus.some(
      status => Number(status.trakingStatusCode) === 0
    );
  }

  /**
   * Determina el tipo de entrega y procesa los pasos
   */
  getDeliveryType(response: TrackingDeliveryResponse): Stepper[] {
    let validSteps: { trakingStatusCode: number; reasonCode: number[] }[];
    let deliveryType: DeliveryType;

    if (!this.isBranchDelivery(response)) {
      validSteps = [...HOME_DELIVERY_STEPS];
      deliveryType = this.isHomeDelivery(response)
        ? DeliveryType.HOME_DELIVERY
        : DeliveryType.UNKNOWN;
      sessionStorage.setItem('deliveryType', deliveryType);
    } else if (this.isBranchDelivery(response)) {
      validSteps =
        response.cardOrderStatus.length === 0 || !this.isRescueDelivery(response)
          ? [...BRANCH_DELIVERY_STEPS]
          : [...RESCUE_DELIVERY_STEPS];
      deliveryType =
        response.cardOrderStatus.length === 0 || !this.isRescueDelivery(response)
          ? DeliveryType.BRANCH_DELIVERY
          : DeliveryType.RESCUE_DELIVERY;
      sessionStorage.setItem('deliveryType', deliveryType);
    } else {
      validSteps = [];
      deliveryType = DeliveryType.UNKNOWN;
      sessionStorage.setItem('deliveryType', deliveryType);
    }

    return this.processSteps(validSteps, response, deliveryType);
  }

  /**
   * Procesa los pasos del stepper según las reglas de negocio
   */
  processSteps(
    validSteps: { trakingStatusCode: number; reasonCode: number[] }[],
    response: TrackingDeliveryResponse,
    deliveryType: DeliveryType
  ): Stepper[] {
    let cardDeliveryStatus: CardDeliveryStatus[] = [...response.cardOrderStatus];

    // Regla especial: Insertar estado 9 antes del 10 si no existe
    if (
      cardDeliveryStatus.find(s => s.trakingStatusCode === 10) &&
      !cardDeliveryStatus.find(s => s.trakingStatusCode === 9)
    ) {
      const index = cardDeliveryStatus.findIndex(s => s.trakingStatusCode === 10);
      cardDeliveryStatus.splice(index, 0, {
        trakingStatusCode: 9,
        reasonCode: 0,
        effDt: cardDeliveryStatus[index].effDt
      });
    }

    // Agregar estado 16 si hay intentos fallidos
    if (this.hasDeliveryAttempts(cardDeliveryStatus)) {
      validSteps.push({ trakingStatusCode: 16, reasonCode: [10, 11, 12, 13] });
    }

    // Manejo de cancelaciones
    if (this.hasCancelStatus(cardDeliveryStatus)) {
      if (cardDeliveryStatus.find(c => c.trakingStatusCode === 22)) {
        validSteps.push({ trakingStatusCode: 22, reasonCode: [0, 1] });
      }
      if (cardDeliveryStatus.find(c => c.trakingStatusCode === 26)) {
        validSteps.push({ trakingStatusCode: 26, reasonCode: [0, 1] });
      }
      // Eliminar estado 8 si hay cancelación
      validSteps = validSteps.filter(c => Number(c.trakingStatusCode) !== 8);
    }

    let steps: Stepper[] = [];

    // Procesar estados existentes
    cardDeliveryStatus.forEach((c: CardDeliveryStatus) => {
      const step = validSteps.find(
        code =>
          Number(code.trakingStatusCode) === Number(c.trakingStatusCode) &&
          code.reasonCode.includes(Number(c.reasonCode))
      );

      if (step) {
        const statusCatalogItem = STATUS_CATALOG.find(
          x => Number(x.idTrakingStatusCode) === Number(step?.trakingStatusCode)
        );

        if (statusCatalogItem) {
          const stepData = { ...statusCatalogItem };

          // Configurar dirección/sucursal
          if ([6, 9, 8, 10, 16].includes(Number(stepData.idTrakingStatusCode))) {
            stepData.branchName = this.setAddress(response?.fiData);
          }

          // Actualizar títulos según tipo de entrega
          if (
            Number(stepData.idTrakingStatusCode) === 8 &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            stepData.title = 'Recogiste tu tarjeta en la sucursal';
          }

          if (
            Number(stepData.idTrakingStatusCode) === 22 &&
            deliveryType === DeliveryType.HOME_DELIVERY
          ) {
            stepData.title = 'No fué posible entregar tu tarjeta';
          }

          if ([22, 26].includes(Number(stepData.idTrakingStatusCode))) {
            stepData.branchName = this.setAddress(response?.fiData);
          }

          // Determinar estado y icono
          const isCancel =
            [22, 26].includes(Number(stepData.idTrakingStatusCode)) ||
            (stepData.idTrakingStatusCode === 16 &&
              [10, 11, 12, 13].includes(c.reasonCode));

          stepData.status = isCancel ? 'CANCEL' : 'SUCCESS';
          stepData.icon = isCancel ? 'close-circle-outline' : stepData.icon;
          stepData.deliveryDate = c.effDt;
          stepData.deliveryType = deliveryType;

          steps.push(stepData);
        }
      }
    });

    // Si no hay estados, mostrar todos como pendientes
    if (cardDeliveryStatus.length === 0) {
      STATUS_CATALOG.forEach(sc => {
        if (
          validSteps
            .map(c => Number(c.trakingStatusCode))
            .includes(Number(sc.idTrakingStatusCode))
        ) {
          const stepData = { ...sc };
          stepData.status = 'PENDING';
          stepData.branchName = [6, 9, 8, 10].includes(Number(stepData.idTrakingStatusCode))
            ? response.fiData?.branchName
            : undefined;

          if (Number(stepData.idTrakingStatusCode) === 8) {
            stepData.title = 'Entregamos tu tarjeta';
          }
          if (Number(stepData.idTrakingStatusCode) === 6) {
            stepData.title = 'Enviamos tu tarjeta';
          }

          stepData.deliveryType = deliveryType;
          steps.push(stepData);
        }
      });
      // Marcar el primer paso como en progreso
      if (steps.length > 0) {
        steps[0].status = 'IN_PROGRESS';
      }
    } else {
      // Agregar pasos pendientes
      const completedCodes = steps.map(s => Number(s.idTrakingStatusCode));
      const validCodes = validSteps.map(c => Number(c.trakingStatusCode));

      // Filtrar códigos que faltan
      const missingCodes = validCodes.filter(
        code => !completedCodes.includes(code)
      );

      // Si es HOME_DELIVERY y hay estado 16, eliminar el 8
      if (deliveryType === DeliveryType.HOME_DELIVERY && completedCodes.includes(16)) {
        const index = missingCodes.indexOf(8);
        if (index > -1) {
          missingCodes.splice(index, 1);
        }
      }

      missingCodes.forEach(code => {
        const statusCatalogItem = STATUS_CATALOG.find(
          sc => Number(sc.idTrakingStatusCode) === code
        );

        if (statusCatalogItem) {
          const stepData = { ...statusCatalogItem };
          stepData.status = 'PENDING';

          if ([6, 9, 8, 10].includes(Number(stepData.idTrakingStatusCode))) {
            stepData.branchName = this.setAddress(response?.fiData);
          }

          if (
            Number(stepData.idTrakingStatusCode) === 8 &&
            deliveryType !== DeliveryType.HOME_DELIVERY
          ) {
            stepData.title = 'Recogiste tu tarjeta en la sucursal';
          }

          stepData.deliveryType = deliveryType;
          steps.push(stepData);
        }
      });

      // Actualizar estados secuenciales
      steps = this.updateStatusSteps(steps);
    }

    // Ordenar pasos por código de estado
    return steps.sort((a, b) => {
      const order = [2, 6, 16, 9, 10, 8, 22, 26];
      return order.indexOf(a.idTrakingStatusCode) - order.indexOf(b.idTrakingStatusCode);
    });
  }

  /**
   * Actualiza los estados secuenciales (PENDING → IN_PROGRESS)
   */
  updateStatusSteps(stepsValidate: Stepper[]): Stepper[] {
    stepsValidate.forEach((step: Stepper, index) => {
      if (
        stepsValidate[index - 1] &&
        stepsValidate[index - 1].status === 'SUCCESS' &&
        step.status === 'PENDING'
      ) {
        step.status = 'IN_PROGRESS';
      }
    });
    return stepsValidate;
  }

  /**
   * Verifica si hay intentos de entrega fallidos
   */
  hasDeliveryAttempts(cardStatus: CardDeliveryStatus[]): boolean {
    return !!cardStatus.find(
      c =>
        Number(c.trakingStatusCode) === 16 &&
        [10, 11, 12, 13].includes(c.reasonCode)
    );
  }

  /**
   * Verifica si hay estados de cancelación
   */
  hasCancelStatus(cardStatus: CardDeliveryStatus[]): boolean {
    return !!cardStatus.find(
      c => c.trakingStatusCode === 22 || c.trakingStatusCode === 26
    );
  }

  /**
   * Formatea la dirección según el tipo de entrega
   */
  setAddress(address?: BranchDeliveryInfo): string | undefined {
    if (!address) {
      return undefined;
    }

    // Envío a Sucursal
    if (address.branchIdent && address.branchName) {
      return `${address.branchIdent} - ${address.branchName}`;
    }

    // Envío a Domicilio
    return address.branchName;
  }
}
