import type { IConnectionPoint } from '../../models/ConnectionPoint/connection-point.model';

export interface IClient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  houseNumber: string;
  positionM: number;
  connectionPoints?: IConnectionPoint[];
  segmentPayments?: {
    segmentId: number;
    share: number;
    amount: number;
  }[];
}

export interface IClientConnectionPoint {
  clientId: number;
  connectionPointId: number;
  paymentShare: number;
  isInitial: boolean;
  joinedAt: string;
}

export interface ICreateClientDto {
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  positionM?: number;
  connectionPointId?: number;
}

export interface IUpdateClientDto {
  client: Partial<IClient>;
  connectionPoints: IClientConnectionPoint[];
} 