export interface IPayment {
  id: number;
  userId: number;
  amount: number;
  paymentDate: string;
  docLink?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IPaymentCreateDto {
  userId: number;
  amount: number;
  paymentDate: string;
  docLink?: string;
  comment?: string;
}

export interface IPaymentUpdateDto {
  userId?: number;
  amount?: number;
  paymentDate?: string;
  docLink?: string;
  comment?: string;
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  BANK_TRANSFER = 'BANK_TRANSFER'
} 