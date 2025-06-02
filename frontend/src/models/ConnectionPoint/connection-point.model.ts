export interface IMinimalClient {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  houseNumber: string;
  positionM: number;
}

export interface IConnectionPoint {
  id: number;
  name: string;
  address: string;
  type: string;
  positionM: number;
  totalCost: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateConnectionPointDto {
  name: string;
  address: string;
  type: string;
  positionM: number;
  totalCost: number;
}

export interface IUpdateConnectionPointDto {
  point: Partial<IConnectionPoint>;
} 