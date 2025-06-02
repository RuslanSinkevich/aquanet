import { Injectable } from '@nestjs/common';
import { Client } from '../models/client.model';
import { UtilitySegment } from '../models/utility-segment.model';
import { ConnectionPoint } from '../models/connection-point.model';

/**
 * Интерфейс результата расчета долей оплаты
 * @property {number} clientId - ID клиента
 * @property {number} share - Доля оплаты (от 0 до 1)
 * @property {number} amount - Сумма к оплате в рублях
 */
export interface ShareCalculationResult {
  clientId: number;
  share: number;
  amount: number;
}

/**
 * Сервис для расчета долей оплаты
 * 
 * Этот сервис предоставляет различные алгоритмы для расчета долей оплаты
 * между клиентами. Он используется как для точек подключения (колодцев),
 * так и для сегментов сети водоснабжения.
 * 
 * ВАЖНО: Все расчеты производятся с учетом следующих правил:
 * 1. Сумма всех долей всегда равна 1 (100%)
 * 2. Сумма всех платежей равна общей стоимости
 * 3. При отсутствии клиентов возвращается пустой массив
 */
@Injectable()
export class PaymentShareService {
  /**
   * Базовый алгоритм расчета долей - равное распределение между всеми клиентами
   * 
   * Пример:
   * - 4 клиента, общая сумма 1000 руб.
   * - Каждый получит долю 0.25 (25%)
   * - Каждый заплатит по 250 руб.
   * 
   * @param clients - Массив клиентов для расчета
   * @param totalAmount - Общая сумма для распределения (в рублях)
   * @returns Массив с результатами расчета для каждого клиента
   */
  calculateEqualShares(
    clients: Client[],
    totalAmount: number,
  ): ShareCalculationResult[] {
    if (!clients.length) return [];
    
    const baseShare = 1 / clients.length;
    const baseAmount = totalAmount * baseShare;

    return clients.map(client => ({
      clientId: client.id,
      share: baseShare,
      amount: baseAmount,
    }));
  }

  /**
   * Расчет долей с учетом индивидуального потребления каждого клиента
   * 
   * Пример:
   * - Клиент A: потребление 100 м³
   * - Клиент B: потребление 300 м³
   * - Общая сумма: 1000 руб.
   * - Клиент A получит долю 0.25 (25%) и заплатит 250 руб.
   * - Клиент B получит долю 0.75 (75%) и заплатит 750 руб.
   * 
   * @param clients - Массив клиентов с данными о потреблении
   * @param totalAmount - Общая сумма для распределения (в рублях)
   * @returns Массив с результатами расчета для каждого клиента
   */
  calculateConsumptionBasedShares(
    clients: Array<Client & { consumption: number }>,
    totalAmount: number,
  ): ShareCalculationResult[] {
    if (!clients.length) return [];

    const totalConsumption = clients.reduce((sum, client) => sum + client.consumption, 0);
    
    return clients.map(client => {
      const share = client.consumption / totalConsumption;
      return {
        clientId: client.id,
        share,
        amount: totalAmount * share,
      };
    });
  }

  /**
   * Расчет долей для точки подключения (колодца)
   * 
   * По умолчанию использует равное распределение между всеми
   * клиентами, подключенными к данной точке.
   * 
   * ВАЖНО: Метод асинхронный, так как в будущем может быть добавлена
   * логика загрузки дополнительных данных для расчета
   * 
   * @param point - Точка подключения с массивом подключенных клиентов
   * @returns Promise с результатами расчета
   */
  async calculateConnectionPointShares(
    point: ConnectionPoint & { clients: Client[] },
  ): Promise<ShareCalculationResult[]> {
    if (!point.clients?.length) return [];
    
    // По умолчанию используем равное распределение
    return this.calculateEqualShares(point.clients, point.totalCost || 0);
  }

  /**
   * Расчет долей для сегмента сети водоснабжения
   * 
   * По умолчанию использует равное распределение между всеми
   * клиентами, которые используют данный сегмент сети.
   * 
   * ВАЖНО: Метод асинхронный, так как в будущем может быть добавлена
   * логика определения зависимых клиентов или другие сложные расчеты
   * 
   * @param segment - Сегмент сети
   * @param affectedClients - Массив клиентов, использующих этот сегмент
   * @returns Promise с результатами расчета
   */
  async calculateSegmentShares(
    segment: UtilitySegment,
    affectedClients: Client[],
  ): Promise<ShareCalculationResult[]> {
    if (!affectedClients?.length) return [];
    
    // По умолчанию используем равное распределение
    return this.calculateEqualShares(affectedClients, segment.cost || 0);
  }
} 