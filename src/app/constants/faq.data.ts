import { Faq } from '../models/faq.interface';
import { DeliveryType } from '../models/delivery-type.enum';

/**
 * Catálogo de preguntas frecuentes por tipo de entrega
 */
export const FAQ_DATA: Record<DeliveryType, Faq[]> = {
  [DeliveryType.HOME_DELIVERY]: [
    {
      id: 1,
      question: '¿En dónde entregarán mi tarjeta?',
      answer: `<p>En el domicilio registrado en tu expediente cuando creaste tu cuenta. Puedes cambiar de domicilio comunicándote a Línea RockStar.</p>`,
      status: false
    },
    {
      id: 2,
      question: '¿Qué pasa si no estoy en mi domicilio cuando entreguen mi tarjeta?',
      answer: `<p>No te preocupes, podremos entregarla a una persona mayor de edad con identificación oficial vigente, en el buzón o debajo de la puerta. Si no es posible, intentaremos de nuevo en unos días. Recuerda que después del segundo intento, la tarjeta será destruida y deberás solicitar una reposición.</p>`,
      status: false
    },
    {
      id: 3,
      question: '¿Qué pasa si cambié de domicilio?',
      answer: `<p>Puedes bloquear tu tarjeta y solicitar una reposición a la sucursal de tu preferencia, no olvides llevar tu identificación oficial vigente. También puedes comunicarte a Línea RockStar para cambiar la entrega a una sucursal.</p>`,
      status: false
    }
  ],
  [DeliveryType.BRANCH_DELIVERY]: [
    {
      id: 1,
      question: '¿Qué necesito para recoger mi tarjeta en sucursal?',
      answer: `<p>Solo necesitas tu identificación oficial vigente.</p>`,
      status: false
    },
    {
      id: 2,
      question: '¿Cómo puedo cambiar la sucursal para recoger mi tarjeta?',
      answer: `<p>Bloquea la tarjeta, solicita una reposición a la sucursal deseada y ¡recógela en la fecha indicada!</p>`,
      status: false
    },
    {
      id: 3,
      question: '¿Cuánto tiempo tengo para recoger mi tarjeta en sucursal?',
      answer: `<p>Tienes hasta 120 días para recogerla.</p>`,
      status: false
    },
    {
      id: 4,
      question: 'Horarios de sucursal',
      answer: `<p>El horario de sucursal es de 9 am a 4 pm de lunes a viernes.</p>`,
      status: false
    }
  ],
  [DeliveryType.RESCUE_DELIVERY]: [
    {
      id: 1,
      question: '¿Qué necesito para recoger mi tarjeta en sucursal?',
      answer: `<p>Solo necesitas tu identificación oficial vigente.</p>`,
      status: false
    },
    {
      id: 2,
      question: '¿Cómo puedo cambiar la sucursal para recoger mi tarjeta?',
      answer: `<p>Bloquea la tarjeta, solicita una reposición a la sucursal deseada y ¡recógela en la fecha indicada!</p>`,
      status: false
    },
    {
      id: 3,
      question: '¿Cuánto tiempo tengo para recoger mi tarjeta en sucursal?',
      answer: `<p>Tienes hasta 120 días para recogerla.</p>`,
      status: false
    },
    {
      id: 4,
      question: 'Horarios de sucursal',
      answer: `<p>El horario de sucursal es de 9 am a 4 pm de lunes a viernes.</p>`,
      status: false
    }
  ],
  [DeliveryType.UNKNOWN]: []
};
