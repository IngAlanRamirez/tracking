/**
 * Utilidades para formatear fechas
 */
export class DateFormatter {
  /**
   * Formatea una fecha ISO a formato DD/MMM/YY
   * @param dateString Fecha en formato ISO string
   * @returns Fecha formateada (ej: "15/Ene/24")
   */
  static formatDate(dateString: string): string {
    if (!dateString) {
      return '';
    }

    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const monthNames = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear().toString().slice(-2);

      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error formateando fecha:', error);
      return '';
    }
  }

  /**
   * Genera una fecha aleatoria en los últimos N días
   * @param daysAgo Número de días hacia atrás
   * @returns Fecha en formato ISO string
   */
  static generateRandomDate(daysAgo: number = 30): string {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * daysAgo);
    const date = new Date(now);
    date.setDate(date.getDate() - randomDays);
    return date.toISOString();
  }

  /**
   * Genera una fecha futura aleatoria en los próximos N días
   * @param daysAhead Número de días hacia adelante
   * @returns Fecha en formato ISO string
   */
  static generateFutureDate(daysAhead: number = 10): string {
    const now = new Date();
    const randomDays = Math.floor(Math.random() * daysAhead) + 1;
    const date = new Date(now);
    date.setDate(date.getDate() + randomDays);
    return date.toISOString();
  }
}
