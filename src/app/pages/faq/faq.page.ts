import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FAQ_DATA } from '../../constants/faq.data';
import { Faq } from '../../models/faq.interface';
import { DeliveryType } from '../../models/delivery-type.enum';

/**
 * Página de preguntas frecuentes (FAQ)
 */
@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss']
})
export class FaqPage implements OnInit, OnDestroy {
  faq: Faq[] = [];
  deliveryType: DeliveryType = DeliveryType.UNKNOWN;

  ngOnInit(): void {
    // Obtener el tipo de entrega desde sessionStorage
    const deliveryTypeStr = sessionStorage.getItem('deliveryType') as DeliveryType;
    this.deliveryType = deliveryTypeStr || DeliveryType.UNKNOWN;
    
    // Cargar FAQ según el tipo de entrega
    this.faq = FAQ_DATA[this.deliveryType] || FAQ_DATA[DeliveryType.UNKNOWN];
  }

  ngOnDestroy(): void {
    // Resetear el estado de las preguntas al salir
    this.resetFaqStatus();
  }

  /**
   * Alterna el estado de una pregunta (abrir/cerrar)
   */
  toggleQuestion(faqItem: Faq): void {
    if (faqItem.status !== undefined) {
      faqItem.status = !faqItem.status;
    }
  }

  /**
   * Resetea el estado de todas las preguntas
   */
  private resetFaqStatus(): void {
    this.faq.forEach(item => {
      if (item.status !== undefined) {
        item.status = false;
      }
    });
  }
}
