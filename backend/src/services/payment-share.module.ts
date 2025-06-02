/**
 * Модуль расчета долей оплаты
 * 
 * Этот модуль предоставляет сервис PaymentShareService для использования
 * в других модулях системы. Он не имеет зависимостей от других модулей,
 * так как выполняет только расчеты на основе предоставленных данных.
 * 
 * Использование:
 * ```typescript
 * @Module({
 *   imports: [PaymentShareModule],
 *   ...
 * })
 * export class YourModule {}
 * ```
 */
import { Module } from '@nestjs/common';
import { PaymentShareService } from './payment-share.service';

@Module({
  providers: [PaymentShareService],
  exports: [PaymentShareService],
})
export class PaymentShareModule {} 