import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSpinner
} from '@ionic/angular/standalone';
import { TrackingFacadeService } from '../../services/tracking-facade.service';
import { Stepper } from '../../models/stepper.interface';
import { VerticalStepperComponent } from '../../components/vertical-stepper/vertical-stepper.component';
import { DeliveryType } from '../../models/delivery-type.enum';

/**
 * Página principal de tracking de tarjetas
 */
@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonSpinner,
    VerticalStepperComponent
  ],
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss']
})
export class TrackingPage implements OnInit {
  isLoading = true;
  steps: Stepper[] = [];
  error: string | null = null;

  constructor(private trackingFacadeService: TrackingFacadeService) {}

  ngOnInit(): void {
    this.loadTrackingData();
  }

  /**
   * Carga los datos de tracking
   */
  loadTrackingData(): void {
    this.isLoading = true;
    this.error = null;

    this.trackingFacadeService.getTrackingResponse().subscribe({
      next: (steps) => {
        this.steps = steps;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando tracking:', err);
        this.error = 'No se pudo cargar la información de tracking';
        this.isLoading = false;
      }
    });
  }

  /**
   * Recarga los datos (útil para generar un nuevo escenario aleatorio)
   */
  reload(): void {
    this.loadTrackingData();
  }

  /**
   * Verifica si solo existe el estado inicial en progreso
   * En este caso, el FAQ no debe estar disponible
   * El estado inicial es cuando:
   * - El primer paso es el estado 2 (preparación) y está en IN_PROGRESS
   * - Todos los demás pasos están en PENDING
   * - No hay ningún paso en SUCCESS o CANCEL
   */
  isOnlyInitialStateInProgress(): boolean {
    if (this.steps.length === 0) {
      return false;
    }
    
    // Verificar que el primer paso sea el estado 2 (preparación) y esté en IN_PROGRESS
    const firstStep = this.steps[0];
    if (firstStep.idTrakingStatusCode !== 2 || firstStep.status !== 'IN_PROGRESS') {
      return false;
    }
    
    // Verificar que no haya ningún paso completado (SUCCESS o CANCEL)
    const hasCompletedSteps = this.steps.some(
      step => step.status === 'SUCCESS' || step.status === 'CANCEL'
    );
    
    if (hasCompletedSteps) {
      return false;
    }
    
    // Verificar que todos los demás pasos estén en PENDING
    const allOtherStepsPending = this.steps
      .slice(1)
      .every(step => step.status === 'PENDING');
    
    return allOtherStepsPending;
  }
}
