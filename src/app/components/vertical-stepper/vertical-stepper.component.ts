import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { Stepper } from '../../models/stepper.interface';
import { DateFormatter } from '../../utils/date-formatter.util';

/**
 * Componente de stepper vertical para mostrar el progreso de entrega
 * Utiliza metodología BEM para los estilos
 */
@Component({
  selector: 'app-vertical-stepper',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss']
})
export class VerticalStepperComponent implements OnInit {
  @Input() steps: Stepper[] = [];
  
  stepperEnding = false;

  ngOnInit(): void {
    // Determinar si el stepper ha terminado
    if (this.steps.length > 0) {
      const lastStep = this.steps[this.steps.length - 1];
      this.stepperEnding = lastStep.status === 'SUCCESS' || lastStep.status === 'CANCEL';
    }
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatDate(dateString?: string): string {
    if (!dateString) {
      return '';
    }
    return DateFormatter.formatDate(dateString);
  }

  /**
   * Obtiene la clase CSS para el icono según el estado
   */
  getIconClass(status: string): string {
    return `vertical-stepper__icon--${status.toLowerCase().replace('_', '-')}`;
  }

  /**
   * Obtiene la clase CSS para el contenido según el estado
   */
  getContentClass(status: string): string {
    return `vertical-stepper__content--${status.toLowerCase().replace('_', '-')}`;
  }
}
