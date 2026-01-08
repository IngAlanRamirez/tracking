/**
 * Interfaz para las preguntas frecuentes
 */
export interface Faq {
  id: number;
  question: string;
  answer: string;
  status?: boolean;
}
