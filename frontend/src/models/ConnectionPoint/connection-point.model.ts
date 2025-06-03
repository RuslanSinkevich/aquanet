export interface IConnectionPointMinimalClient {
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
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface IConnectionPointCreateDto {
  name: string;
  address: string;
  type: string;
  positionM: number;
  totalCost: number;
}

export interface IConnectionPointUpdateDto extends Partial<IConnectionPointCreateDto> {} 