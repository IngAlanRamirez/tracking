import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { TrackingDeliveryResponse } from '../models/tracking-delivery-response.interface';
import { CardDeliveryStatus } from '../models/card-delivery-status.interface';
import { BranchDeliveryInfo } from '../models/branch-delivery-info.interface';
import { DateFormatter } from '../utils/date-formatter.util';

/**
 * Servicio que simula el consumo de la API de tracking
 * Genera respuestas aleatorias para diferentes escenarios
 */
@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private readonly DELAY_MS = 800; // Simula latencia de red

  // Datos de ejemplo para generar respuestas realistas
  private readonly SUCURSALES: BranchDeliveryInfo[] = [
    { branchIdent: '001', branchName: 'Sucursal Centro Histórico' },
    { branchIdent: '002', branchName: 'Sucursal Polanco' },
    { branchIdent: '003', branchName: 'Sucursal Santa Fe' },
    { branchIdent: '004', branchName: 'Sucursal Insurgentes' },
    { branchIdent: '005', branchName: 'Sucursal Roma' }
  ];

  private readonly DIRECCIONES: string[] = [
    'Av. Reforma 123, Col. Juárez, CDMX',
    'Calle Insurgentes Sur 456, Col. Del Valle, CDMX',
    'Av. Revolución 789, Col. San Ángel, CDMX',
    'Calle Roma 321, Col. Roma Norte, CDMX',
    'Av. Paseo de la Reforma 654, Col. Polanco, CDMX'
  ];

  private readonly NOMBRES: string[] = [
    'Juan Pérez García',
    'María González López',
    'Carlos Rodríguez Martínez',
    'Ana Hernández Sánchez',
    'Luis Fernández Torres'
  ];

  /**
   * Obtiene la información de tracking simulada
   * Genera un escenario aleatorio cada vez que se llama
   */
  getTrackingInfo(): Observable<TrackingDeliveryResponse> {
    const scenario = this.getRandomScenario();
    const response = this.generateResponse(scenario);

    return of(response).pipe(delay(this.DELAY_MS));
  }

  /**
   * Selecciona un escenario aleatorio para generar la respuesta
   */
  private getRandomScenario(): 'home-success' | 'home-failed' | 'branch-in-progress' | 'branch-cancelled' | 'rescue' | 'initial' {
    const scenarios: Array<'home-success' | 'home-failed' | 'branch-in-progress' | 'branch-cancelled' | 'rescue' | 'initial'> = [
      'home-success',
      'home-failed',
      'branch-in-progress',
      'branch-cancelled',
      'rescue',
      'initial'
    ];
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  /**
   * Genera una respuesta según el escenario seleccionado
   */
  private generateResponse(scenario: string): TrackingDeliveryResponse {
    const fullName = this.getRandomItem(this.NOMBRES);
    const cardNumLastDig = this.generateCardLastDigits();

    switch (scenario) {
      case 'home-success':
        return this.generateHomeDeliverySuccess(fullName, cardNumLastDig);
      case 'home-failed':
        return this.generateHomeDeliveryFailed(fullName, cardNumLastDig);
      case 'branch-in-progress':
        return this.generateBranchDeliveryInProgress(fullName, cardNumLastDig);
      case 'branch-cancelled':
        return this.generateBranchDeliveryCancelled(fullName, cardNumLastDig);
      case 'rescue':
        return this.generateRescueDelivery(fullName, cardNumLastDig);
      case 'initial':
        return this.generateInitialState(fullName, cardNumLastDig);
      default:
        return this.generateHomeDeliverySuccess(fullName, cardNumLastDig);
    }
  }

  /**
   * Escenario: Entrega a domicilio exitosa
   */
  private generateHomeDeliverySuccess(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const baseDate = new Date();
    const address = this.getRandomItem(this.DIRECCIONES);

    return {
      fiData: {
        branchName: address
      },
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: [
        {
          trakingStatusCode: 2,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 10).toISOString()
        },
        {
          trakingStatusCode: 6,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 7).toISOString()
        },
        {
          trakingStatusCode: 8,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 3).toISOString()
        }
      ]
    };
  }

  /**
   * Escenario: Intento de entrega a domicilio fallido
   */
  private generateHomeDeliveryFailed(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const baseDate = new Date();
    const address = this.getRandomItem(this.DIRECCIONES);

    return {
      fiData: {
        branchName: address
      },
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: [
        {
          trakingStatusCode: 2,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 10).toISOString()
        },
        {
          trakingStatusCode: 6,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 7).toISOString()
        },
        {
          trakingStatusCode: 16,
          reasonCode: 10 + Math.floor(Math.random() * 4), // 10, 11, 12 o 13
          effDt: this.subtractDays(baseDate, 2).toISOString()
        }
      ]
    };
  }

  /**
   * Escenario: Entrega en sucursal en progreso
   */
  private generateBranchDeliveryInProgress(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const baseDate = new Date();
    const sucursal = this.getRandomItem(this.SUCURSALES);

    return {
      fiData: sucursal,
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: [
        {
          trakingStatusCode: 2,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 10).toISOString()
        },
        {
          trakingStatusCode: 9,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 7).toISOString()
        },
        {
          trakingStatusCode: 10,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 3).toISOString()
        }
      ]
    };
  }

  /**
   * Escenario: Entrega en sucursal cancelada (no recogida)
   */
  private generateBranchDeliveryCancelled(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const baseDate = new Date();
    const sucursal = this.getRandomItem(this.SUCURSALES);

    return {
      fiData: sucursal,
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: [
        {
          trakingStatusCode: 2,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 15).toISOString()
        },
        {
          trakingStatusCode: 9,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 12).toISOString()
        },
        {
          trakingStatusCode: 10,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 8).toISOString()
        },
        {
          trakingStatusCode: 22,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 1).toISOString()
        }
      ]
    };
  }

  /**
   * Escenario: Rescate (domicilio → sucursal)
   */
  private generateRescueDelivery(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const baseDate = new Date();
    const sucursal = this.getRandomItem(this.SUCURSALES);
    const address = this.getRandomItem(this.DIRECCIONES);

    return {
      fiData: sucursal,
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: [
        {
          trakingStatusCode: 2,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 12).toISOString()
        },
        {
          trakingStatusCode: 6,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 9).toISOString()
        },
        {
          trakingStatusCode: 9,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 6).toISOString()
        },
        {
          trakingStatusCode: 0,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 5).toISOString()
        },
        {
          trakingStatusCode: 10,
          reasonCode: 1,
          effDt: this.subtractDays(baseDate, 2).toISOString()
        }
      ]
    };
  }

  /**
   * Escenario: Estado inicial (sin estados completados)
   */
  private generateInitialState(fullName: string, cardNumLastDig: string): TrackingDeliveryResponse {
    const address = this.getRandomItem(this.DIRECCIONES);

    return {
      fiData: {
        branchName: address
      },
      env: true,
      fullName,
      cardNumLastDig,
      cardOrderStatus: []
    };
  }

  /**
   * Utilidades privadas
   */
  private getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private generateCardLastDigits(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private subtractDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }
}
