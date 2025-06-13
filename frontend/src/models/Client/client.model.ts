export interface IClient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: number;
  isConfirmed: boolean;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  connectionPoints?: IClientConnectionPoint[];
}

export interface IClientConnectionPoint {
  id: number;
  clientId: number;
  connectionPointId: number;
  paymentShare: number;
}

export interface ICreateClientDto {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface IUpdateClientDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isConfirmed?: boolean;
  banned?: boolean;
} 